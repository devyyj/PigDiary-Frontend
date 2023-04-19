import React from "react";
import PostDetail from "../../components/postDetail";
import {Link, useNavigate, useParams} from "react-router-dom";
import axios from "axios";

function Read() {

  const params = useParams()
  console.log(params);

  const navigate = useNavigate();

  function deletePost(e) {
    e.preventDefault()

    if (window.confirm("정말 삭제하시겠습니까?") === false) {
      return;
    }

    axios.delete(`http://localhost:8080/freeboard/${params.postNumber}`)
    .then(res => {
      console.log(res);
      console.log(res.data);
      navigate("/freeboard")
    })
  }

  return (
    <>
      <PostDetail postNumber={params.postNumber}></PostDetail>
      <p><Link to={`/freeboard/update/${params.postNumber}`}>수정</Link></p>
      <p><a href="https://" onClick={deletePost}>삭제</a></p>
      <p><Link to={`/freeboard`}>목록</Link></p>
    </>
  )
}

export default Read