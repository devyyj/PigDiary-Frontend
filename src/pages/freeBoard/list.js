import React from "react";
import Board from "../../components/board";

const List = () => {
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
