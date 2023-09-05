import React, { useState, useEffect } from 'react'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import { Button } from 'react-bootstrap'
import { api } from '../common/common'
import { Link, useNavigate } from 'react-router-dom'

export default function MyInfo () {
  const navigate = useNavigate()
  const [nickName, setNickName] = useState('')
  const [nickNameError, setNickNameError] = useState('')
  const [userId, setUserId] = useState('') // 추가: 회원번호 상태 변수

  // 최소 및 최대 길이 변수 생성
  const minNickNameLength = 2
  const maxNickNameLength = 20

  useEffect(() => {
    // 서버에서 닉네임 및 회원번호 가져오기
    const fetchUserData = async () => {
      const response = await api.get('/user')
      setNickName(response.data.nickName)
      setUserId(response.data.id) // 추가: 회원번호 설정
    }

    fetchUserData()
  }, [])

  const handleNicknameChange = (e) => {
    const newNickName = e.target.value
    setNickName(newNickName)

    // 유효성 검사
    if (newNickName.length < minNickNameLength || newNickName.length > maxNickNameLength) {
      setNickNameError(`닉네임은 ${minNickNameLength}자에서 ${maxNickNameLength}자 사이어야 합니다.`)
    } else {
      setNickNameError('')
    }
  }

  const handleSaveNickname = async () => {
    // 유효성 검사
    if (nickNameError) {
      alert('닉네임이 유효하지 않습니다.')
      return
    }

    // 변경된 닉네임 서버에 저장
    await api.put('/user', { nickName })
    alert('내 정보가 저장됐어요! 🐽')
  }

  const handleDeleteAccount = async () => {
    if (confirm('정말 탈퇴하시나요? 😥')) {
      // 회원 탈퇴 요청 서버에 보내기
      await api.delete('/user')
      confirm('탈퇴가 완료됐어요. 다음에 다시 만나요. 🐖')
      navigate('/')
    }
  }

  return (
        <>
            <Form>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="2">
                        회원번호 {/* 추가: 회원번호 레이블 */}
                    </Form.Label>
                    <Col>
                        <Form.Control
                            type="text"
                            value={`@${userId}`}
                            readOnly // 추가: 읽기 전용으로 설정
                        />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="2">
                        닉네임
                    </Form.Label>
                    <Col>
                        <Form.Control
                            type="text"
                            value={nickName}
                            onChange={handleNicknameChange}
                            isInvalid={!!nickNameError}
                        />
                        <Form.Control.Feedback type="invalid">
                            {nickNameError}
                        </Form.Control.Feedback>
                    </Col>
                </Form.Group>
            </Form>

            <Col className="d-flex justify-content-end">
                <Button variant="primary" onClick={handleSaveNickname}>
                    저장
                </Button>
            </Col>
            <hr />
            <div className="d-flex justify-content-end">
                <Link to={'#'} onClick={handleDeleteAccount}>
                    회원 탈퇴
                </Link>
            </div>
        </>
  )
}
