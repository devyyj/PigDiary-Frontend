import React, { useState, useEffect } from 'react'
import { api } from '../common/common'

const PostDetail = ({ postNumber }) => {
  const [post, setPost] = useState(null)

  useEffect(() => {
    const fetchPost = async () => {
      const response = await api.get(`/freeboard/${postNumber}`)
      setPost(response.data)
    }
    fetchPost()
  }, [postNumber])

  if (!post) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <h1>{post.title}</h1>
      <p>작성자: {post.user}</p>
      <p>작성일: {new Date(post.regDate).toLocaleString()}</p>
      <p>수정일: {new Date(post.modDate).toLocaleString()}</p>
      <p className="my-5">{post.content}</p>
    </div>
  )
}

export default PostDetail
