import React from "react";
import PostEdit from "../../components/postEdit";
import {useParams} from "react-router-dom";

function ReadPost() {

  const params = useParams();
  return (
    <>
      <PostEdit postNumber={params.postNumber}></PostEdit>
    </>
  )
}

export default ReadPost