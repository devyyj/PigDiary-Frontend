import React, {useEffect, useLayoutEffect, useState} from "react";
import {api} from "../../common/common";
import Board from "../../components/board";
import {Pagination} from "react-bootstrap";

const List = () => {

    useEffect(()=>{
        console.log("useE")
    })

    useLayoutEffect(() => {
        console.log("layout")
    })

    return (
        <>
            <Board></Board>
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
