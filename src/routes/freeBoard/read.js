import React from 'react'
import PostDetail from '../../components/postDetail'
import { useNavigate, useParams } from 'react-router-dom'
import { api } from '../../common/common'
import { Button } from 'react-bootstrap'

function Read () {
  const params = useParams()

  const navigate = useNavigate()

  async function deletePost (e) {
    e.preventDefault()

    if (window.confirm('정말 삭제하시겠습니까?') === false) {
      return
    }

    await api.delete(`/freeboard/${params.postNumber}`)
    navigate('/freeboard')
  }

  return (
        <>
            <PostDetail postNumber={params.postNumber}></PostDetail>
            <div className="d-grid gap-2">
                <a className="btn btn-outline-warning" href={`/freeboard/update/${params.postNumber}`}>
                    수정
                </a>
                <Button variant="outline-danger" onClick={deletePost}>
                    삭제
                </Button>
                <a className="btn btn-outline-primary" href={'/freeboard'}>
                    목록
                </a>
            </div>
        </>
  )
}

export default Read
