import React from "react";
import PostUpdate from "../../components/postUpdate";
import {useParams} from "react-router-dom";

function ReadPost() {

  const params = useParams();
  return (
    <>
      <PostUpdate postNumber={params.postNumber}></PostUpdate>
    </>
  )
}

export default ReadPost