import React from 'react'
import PostEdit from '../../components/postEdit'
import { useParams } from 'react-router-dom'

export default function ReadPost () {
  const params = useParams()
  return (
        <>
            <PostEdit postId={params.postId}></PostEdit>
        </>
  )
}
