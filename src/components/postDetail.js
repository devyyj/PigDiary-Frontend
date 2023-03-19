import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PostDetail = ({ postNumber }) => {
  console.log(postNumber)
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      const response = await axios.get(`http://localhost:8080/freeboard/${postNumber}`);
      console.log(response.data)
      setPost(response.data);
    };
    fetchPost();
  }, [postNumber]);

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{post.title}</h2>
      <p>{post.content}</p>
      <p>작성자: {post.user}</p>
      <p>작성일: {post.regDate}</p>
      <p>수정일: {post.modDate}</p>
    </div>
  );
};

export default PostDetail;
