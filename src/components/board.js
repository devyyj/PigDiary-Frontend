import Table from 'react-bootstrap/Table';
import React, {useEffect, useLayoutEffect, useState} from 'react';
import {Link} from "react-router-dom";
import {api} from "../common/common";
import {Pagination} from "react-bootstrap";

const Board = () => {

    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);

    useLayoutEffect(() => {
        const fetchData = async () => {
            const response = await api.get(`/freeboard?page=${page}`);
            setData(response.data.dtoList);
            setTotalPage(response.data.totalPage);
        };

        console.log("board layout")
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
            <Table hover>
                <thead>
                <tr>
                    <th>#</th>
                    <th>제목</th>
                    <th>작성자</th>
                    <th>등록 시간</th>
                </tr>
                </thead>
                <tbody>
                {data.map((item) => (
                    <tr key={item.number}>
                        <td>{item.number}</td>
                        <td><Link to={`/freeboard/${item.number}`}>{item.title}</Link></td>
                        <td>{item.user}</td>
                        <td>{(new Date(item.regDate)).toLocaleTimeString()}</td>
                    </tr>
                ))}
                </tbody>
            </Table>
            <div className="d-flex justify-content-center">
                <Pagination>
                    <Pagination.First/>
                    <Pagination.Prev/>
                    <Pagination.Item>{1}</Pagination.Item>
                    <Pagination.Item>{2}</Pagination.Item>
                    <Pagination.Item>{3}</Pagination.Item>
                    <Pagination.Item>{4}</Pagination.Item>
                    <Pagination.Item>{5}</Pagination.Item>
                    <Pagination.Next/>
                    <Pagination.Last/>
                </Pagination>
            </div>
        </div>
    );
};

export default Board;
