import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { api } from '../../common/common'
import { Button } from 'react-bootstrap'
import { useCookies } from 'react-cookie'

export default function Read () {
  const [cookies] = useCookies(['isLogged'])

  const [postData, setPostData] = useState(null)
  const [userId, setUserId] = useState(null)

  const params = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const response = await api.get(`/freeboard/${params.postId}`)
        setPostData(response.data)
      } catch (error) {
        console.error(error)
      }
    }

    const fetchUserData = async () => {
      try {
        const response = await api.get('/user')
        setUserId(response.data.id)
      } catch (error) {
        console.error(error)
      }
    }

    // postData가 null일 경우에만 API 요청을 보냅니다.
    if (postData === null) {
      fetchPostData()
      if (cookies.isLogged) fetchUserData()
    }
  }, [postData, params.postId])

  async function deletePost (e) {
    e.preventDefault()

    if (window.confirm('정말 삭제하시겠습니까?')) {
      try {
        await api.delete(`/freeboard/${params.postId}`)
        navigate('/freeboard')
      } catch (error) {
        console.error(error)
      }
    }
  }

  const processContent = (content) => {
    // URL을 링크로 변환
    const contentWithLinks = content.replace(
      /(https?:\/\/[^\s]+)/g,
      '<a href="$1" target="_blank" rel="noopener noreferrer">$1</a>'
    )

    // 줄바꿈 문자(\n)을 HTML 줄바꿈 태그(<br>)로 변환
    const contentWithLineBreaks = contentWithLinks.replace(/\n/g, '<br>')

    return { __html: contentWithLineBreaks }
  }

  // postData가 null인 경우 렌더링하지 않음
  if (postData === null) {
    return null
  }

  // userId와 postData.userId가 다를 경우 수정 및 삭제 버튼을 숨깁니다.
  const isAuthor = userId === postData.userId

  return (
        <>
            <div>
                <h1 style={{ wordWrap: 'break-word' }}>{postData.title}</h1>
                <h6>작성자: {postData.nickName}<span className="fst-italic">{'@' + postData.userId}</span></h6>
                <h6>작성일: {new Date(postData.createdAt).toLocaleString()}</h6>
                <h6>수정일: {new Date(postData.updatedAt).toLocaleString()}</h6>
                <p className="my-5" dangerouslySetInnerHTML={processContent(postData.content)}/>
            </div>
            <div className="d-flex justify-content-end">
                 {isAuthor && (
                    <>
                <Link className="btn btn-outline-warning mx-1" to={`/freeboard/update/${params.postId}`}>
                    수정
                </Link>
                <Button className={'mx-1'} variant="outline-danger" onClick={deletePost}>
                    삭제
                </Button>
                 </>
                 )}
                <Link className="btn btn-outline-primary mx-1" to={'/freeboard'}>
                    목록
                </Link>
            </div>
        </>
  )
}
