import React, { useState, useEffect } from "react";
import axios from "axios";
import Board from "../../components/board";
import { Link } from "react-router-dom";

const List = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get("http://localhost:8080/freeboard");
      setData(result.data);
    };

    fetchData();
  }, []);

  return (
    <>
      <Board data={data}></Board>
      <Link to="/freeboard/create">글쓰기</Link>
    </>
  );
};

export default List;
