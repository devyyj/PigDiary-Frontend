import React, { useState, useEffect } from 'react'
import { api } from '../common/common'

const PostDetail = ({ postId }) => {
  const [post, setPost] = useState(null)

  useEffect(() => {
    const fetchPost = async () => {
      const response = await api.get(`/freeboard/${postId}`)
      setPost(response.data)
    }
    fetchPost()
  }, [postId])

  const processContent = (content) => {
    // URL을 링크로 변환
    const contentWithLinks = content.replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" target="_blank" rel="noopener noreferrer">$1</a>')

    // 줄바꿈 문자(\n)을 HTML 줄바꿈 태그(<br>)로 변환
    const contentWithLineBreaks = contentWithLinks.replace(/\n/g, '<br>')

    return { __html: contentWithLineBreaks }
  }

  if (!post) {
    return <div>Loading...</div>
  }

  return (
        <div>
            <h1 style={{ wordWrap: 'break-word' }}>{post.title}</h1>
            <h6>작성자: {post.nickName}</h6>
            <h6>작성일: {new Date(post.createdAt).toLocaleString()}</h6>
            <h6>수정일: {new Date(post.updatedAt).toLocaleString()}</h6>
            <p className="my-5" dangerouslySetInnerHTML={processContent(post.content)} />
        </div>
  )
}

export default PostDetail
