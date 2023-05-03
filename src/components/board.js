import Table from 'react-bootstrap/Table';
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Link} from "react-router-dom";
import {Pagination} from "react-bootstrap";

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
        fetchData().then(r => console.log(r));
    }, []);

    const handlePrevClick = () => {
        setPage((prevPage) => prevPage - 1);
    };

    const handleNextClick = () => {
        setPage((prevPage) => prevPage + 1);
    };

    return (
        <div>
            <Table striped>
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
            </Table>
            <div className="d-flex justify-content-center">
                <Pagination>
                    <Pagination.First />
                    <Pagination.Prev />
                    <Pagination.Item>{1}</Pagination.Item>
                    <Pagination.Item>{2}</Pagination.Item>
                    <Pagination.Item>{3}</Pagination.Item>
                    <Pagination.Item>{4}</Pagination.Item>
                    <Pagination.Item>{5}</Pagination.Item>
                    <Pagination.Next />
                    <Pagination.Last />
                </Pagination>
            </div>
        </div>
    );
};

export default Board;
