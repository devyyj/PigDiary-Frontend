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

  useEffect(() => {
    // 서버에서 닉네임 가져오기
    const fetchUserData = async () => {
      const response = await api.get('/user') // axios로 변경
      setNickName(response.data.nickName)
    }

    fetchUserData()
  }, [])

  const handleNicknameChange = (e) => {
    setNickName(e.target.value)
  }

  const handleSaveNickname = async () => {
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
                        닉네임
                    </Form.Label>
                    <Col>
                        <Form.Control
                            type="text"
                            value={nickName}
                            onChange={handleNicknameChange}
                        />
                    </Col>
                </Form.Group>
            </Form>

            <Col className="d-flex justify-content-end">
                <Button variant="primary" onClick={handleSaveNickname}>
                    저장
                </Button>
            </Col>
            <hr/>
            <div className="d-flex justify-content-end">
                <Link to={'#'} onClick={handleDeleteAccount}>
                    회원 탈퇴
                </Link>
            </div>
        </>
  )
}
