import React, { useState, useEffect } from "react";
import axios from "axios";
import Board from "../../components/board";
import { Link } from "react-router-dom";
import {Button} from "react-bootstrap";

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
      <Link to="/freeboard/create"></Link>
      <div className="d-grid gap-2">
        <Button variant="primary">
          글쓰기
        </Button>
      </div>
    </>
  );
};

export default List;
