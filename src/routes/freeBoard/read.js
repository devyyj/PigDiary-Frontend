import React from 'react'
import PostDetail from '../../components/postDetail'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { api } from '../../common/common'
import { Button } from 'react-bootstrap'

function Read () {
  const params = useParams()

  const navigate = useNavigate()

  async function deletePost (e) {
    e.preventDefault()

    if (window.confirm('정말 삭제하시겠습니까?')) {
      await api.delete(`/freeboard/${params.postId}`)
      navigate('/freeboard')
    }
  }

  return (
        <>
            <PostDetail postId={params.postId}></PostDetail>
            <div className="d-flex justify-content-end">
                <Link className="btn btn-outline-warning mx-1" to={`/freeboard/update/${params.postId}`}>
                    수정
                </Link>
                <Button className={'mx-1'} variant="outline-danger" onClick={deletePost}>
                    삭제
                </Button>
                <Link className="btn btn-outline-primary mx-1" to={'/freeboard'}>
                    목록
                </Link>
            </div>
        </>
  )
}

export default Read
