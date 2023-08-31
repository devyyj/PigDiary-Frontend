import React, { useState } from 'react'
import { Container, Row, Col, Button, Form } from 'react-bootstrap'

function MyInfo () {
  // 닉네임 상태 변수
  const [nickname, setNickname] = useState('사용자 닉네임')

  // 닉네임 변경 관련 상태 변수
  const [newNickname, setNewNickname] = useState('')
  const [isEditing, setIsEditing] = useState(false)

  // 닉네임 변경 함수
  const handleNicknameChange = () => {
    setNickname(newNickname)
    setNewNickname('')
    setIsEditing(false)
  }

  // 회원 탈퇴 함수
  const handleDeleteAccount = () => {
    // 여기에서 회원 탈퇴 로직을 추가하세요.
    // 예: API 호출 또는 로컬 스토리지에서 사용자 정보 삭제 등
    alert('회원 탈퇴를 완료했습니다.')
  }

  return (
        <Container>
            <h1>내 정보</h1>
            <Row>
                <Col>
                    <h3>닉네임</h3>
                    {isEditing
                      ? (
                        <Form>
                            <Form.Group controlId="newNickname">
                                <Form.Control
                                    type="text"
                                    placeholder="새 닉네임 입력"
                                    value={newNickname}
                                    onChange={(e) => setNewNickname(e.target.value)}
                                />
                            </Form.Group>
                            <Button variant="primary" onClick={handleNicknameChange}>
                                변경
                            </Button>
                        </Form>
                        )
                      : (
                        <div>
                            <p>{nickname}</p>
                            <Button variant="link" onClick={() => setIsEditing(true)}>
                                닉네임 변경
                            </Button>
                        </div>
                        )}
                    <Button variant="danger" onClick={handleDeleteAccount}>
                        회원 탈퇴
                    </Button>
                </Col>
            </Row>
        </Container>
  )
}

export default MyInfo
