import React, { useEffect, useState } from 'react'
import { api } from '../common/common.js'
import { useNavigate } from 'react-router-dom'
import { Button, FloatingLabel, Form } from 'react-bootstrap'

export default function PostEdit ({ postId }) {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [nickName, setNickName] = useState('')
  const [errors, setErrors] = useState({})

  const navigate = useNavigate()

  const titleMinLength = 1
  const contentMinLength = 1
  const titleMaxLength = 50 // 최대 길이 설정
  const contentMaxLength = 1500 // 최대 길이 설정

  useEffect(() => {
    const fetchPostData = async () => {
      const result = await api.get('/freeboard/' + postId)
      setTitle(result.data.title || '') // 초기값을 빈 문자열로 설정
      setContent(result.data.content || '') // 초기값을 빈 문자열로 설정
    }

    const fetchUserData = async () => {
      const result = await api.get('/user')
      setNickName(result.data.nickName || '') // 초기값을 빈 문자열로 설정
    }

    if (postId) {
      fetchUserData()
      fetchPostData()
    } else fetchUserData()
  }, [postId])

  const validateForm = () => {
    const newErrors = {}
    if (title.trim().length < titleMinLength) {
      newErrors.title = `제목은 최소 공백을 제외한 ${titleMinLength}자 이상이어야 합니다.`
    }
    if (title.length > titleMaxLength) { // 최대 길이 초과 검증 추가
      newErrors.title = `제목은 최대 ${titleMaxLength}자까지 가능합니다.`
    }
    if (content.length < contentMinLength) {
      newErrors.content = `내용은 최소 ${contentMinLength}자 이상이어야 합니다.`
    }
    if (content.length > contentMaxLength) { // 최대 길이 초과 검증 추가
      newErrors.content = `내용은 최대 ${contentMaxLength}자까지 가능합니다.`
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    const formData = new FormData()
    formData.append('title', title)
    formData.append('content', content)
    if (postId) {
      formData.append('postId', postId)
      await api.put('/freeboard/' + postId, formData)
    } else {
      await api.post('/freeboard', formData)
    }
    navigate('/freeboard')
  }

  return (
        <div>
            <form>
                <FloatingLabel label="작성자" className="mb-3">
                    <Form.Control
                        readOnly
                        type="text"
                        placeholder=" "
                        value={nickName}
                        onChange={(e) => setNickName(e.target.value)}
                    />
                </FloatingLabel>

                <FloatingLabel label="제목" className="mb-3">
                    <Form.Control
                        type="text"
                        placeholder=" "
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        isInvalid={!!errors.title}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.title}
                    </Form.Control.Feedback>
                </FloatingLabel>

                <FloatingLabel className="mb-3" controlId="floatingTextarea" label="내용">
                    <Form.Control
                        as="textarea"
                        placeholder=" "
                        style={{ height: '300px' }}
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        isInvalid={!!errors.content}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.content}
                    </Form.Control.Feedback>
                </FloatingLabel>

                <div className="d-flex justify-content-end">
                    <Button className={'mx-1'} variant="outline-danger" onClick={(event) => navigate(-1)}>
                        취소
                    </Button>
                    <Button variant="outline-primary" onClick={handleSubmit}>
                        게시글 작성
                    </Button>
                </div>
            </form>
        </div>
  )
}
