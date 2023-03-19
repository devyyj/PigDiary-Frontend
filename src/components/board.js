import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Link} from "react-router-dom";

const Board = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  const fetchData = async () => {
    const response = await axios.get(`http://localhost:8080/freeboard?page=${page}`);
    setData(response.data.dtoList);
    setTotalPage(response.data.totalPage);
  };

  useEffect(() => {
    fetchData();
  }, [page]);

  const handlePrevClick = () => {
    setPage((prevPage) => prevPage - 1);
  };

  const handleNextClick = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <div>
      <table>
        <thead>
        <tr>
          <th>Number</th>
          <th>Title</th>
          <th>User</th>
          <th>Reg Date</th>
          <th>Mod Date</th>
        </tr>
        </thead>
        <tbody>
        {data.map((item) => (
          <tr key={item.number}>
            <td>{item.number}</td>
            <td><Link to={`/freeboard/${item.number}`}>{item.title}</Link></td>
            <td>{item.user}</td>
            <td>{item.regDate}</td>
            <td>{item.modDate}</td>
          </tr>
        ))}
        </tbody>
      </table>
      <div>
        <button onClick={handlePrevClick} disabled={page <= 1}>Prev</button>
        <button onClick={handleNextClick} disabled={page >= totalPage}>Next</button>
      </div>
    </div>
  );
};

export default Board;
