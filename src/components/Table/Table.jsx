import React, { useState, useEffect } from "react";
import "./Table.css";

export const Table = ({ dataInit }) => {
  const [data, setData] = useState([]);
  const handleInitData = async () => {
    let res = await dataInit();
    setData(res);
  };

  useEffect(() => {
    handleInitData();
  }, []);

  const handleDelete = (id) => {
    let nItem = data.filter((m) => m.id !== id);
    setData(nItem);
  };

  const handleLike = (id) => {
    let item = data.find((m) => m.id === id);
    item.isLike = !item.isLike;
    setData([...data]);
  };

  return (
    <table className="table">
      <thead className="thead-dark">
        <tr>
          <th scope="col">Title</th>
          <th scope="col">Genre</th>
          <th scope="col">Stock</th>
          <th scope="col">Rate</th>
          <th scope="col">Image</th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        {data &&
          Array.isArray(data) &&
          data.map((m) => {
            return (
              <tr key={m.id}>
                <td>{m.title}</td>
                <td>{m.genre}</td>
                <td>{m.stock}</td>
                <td>{m.rate}</td>
                <td>
                  <button
                    className="like-btn"
                    onClick={() => {
                      handleLike(m.id);
                    }}
                  >
                    {m.isLike ? (
                      <i className="bi bi-heart-fill" />
                    ) : (
                      <i className="bi bi-heart" />
                    )}
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(m.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
      </tbody>
    </table>
  );
};
