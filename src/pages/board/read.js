import React from "react";
import PostDetail from "../../components/postDetail";
import {useNavigate, useParams} from "react-router-dom";
import {api} from "../../common/common";

function Read() {

    const params = useParams()
    console.log(params);

    const navigate = useNavigate();

    function deletePost(e) {
        e.preventDefault()

        if (window.confirm("정말 삭제하시겠습니까?") === false) {
            return;
        }

        api.delete(`/freeboard/${params.postNumber}`)
            .then(res => {
                console.log(res);
                console.log(res.data);
                navigate("/freeboard")
            })
    }

    return (
        <>
            <PostDetail postNumber={params.postNumber}></PostDetail>
            <div className="d-grid gap-2">
                <a className="btn btn-outline-warning" href={`/freeboard/update/${params.postNumber}`}>
                    수정
                </a>
                <a className="btn btn-outline-danger" href={'https://'}>
                    삭제
                </a>
                <a className="btn btn-outline-primary" href={`/freeboard`}>
                    목록
                </a>
            </div>
        </>
    )
}

export default Read