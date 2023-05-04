import React, { useState, useEffect } from "react";
import {api} from "../../common/common";
import Board from "../../components/board";
import { Link } from "react-router-dom";
import {Button} from "react-bootstrap";

const List = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const result = await api.get("/freeboard");
      setData(result.data);
    };

    fetchData();
  }, []);

  return (
    <>
      <Board data={data}></Board>
      {/*<Link to="/freeboard/create"></Link>*/}
      <div className="d-grid gap-2">
        <a className={"btn btn-outline-primary"} href={"/freeboard/create"}>
          글쓰기
        </a>
      </div>
    </>
  );
};

export default List;
