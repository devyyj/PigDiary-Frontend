import React, { useState, useEffect } from 'react'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import { Button } from 'react-bootstrap'
import { api } from '../common/common'
import { useNavigate } from 'react-router-dom'

export default function MyInfo () {
  const navigate = useNavigate()
  const [nickName, setNickName] = useState('')

  useEffect(() => {
    // 서버에서 닉네임 가져오기
    const fetchUserData = async () => {
      try {
        const response = await api.get('/user') // axios로 변경
        if (response.status === 200 || response.data.nickName) {
          setNickName(response.data.nickName)
        } else {
          console.error('사용자 정보를 가져오지 못했습니다.')
        }
      } catch (error) {
        console.error('사용자 정보를 가져오는 중 오류 발생:', error)
      }
    }

    fetchUserData()
  }, [])

  const handleNicknameChange = (e) => {
    setNickName(e.target.value)
  }

  const handleSaveNickname = async () => {
    try {
      // 변경된 닉네임 서버에 저장
      const response = await api.put('/user', { nickName })
      if (response.status === 200) {
        alert('내 정보가 저장됐어요! 🐽')
        console.log('닉네임이 변경되었습니다.')
      } else {
        console.error('닉네임 변경에 실패했습니다.')
      }
    } catch (error) {
      console.error('닉네임 변경 중 오류 발생:', error)
    }
  }

  const handleDeleteAccount = async () => {
    try {
      if (confirm('정말 탈퇴하시나요? 😥')) {
        // 회원 탈퇴 요청 서버에 보내기
        const response = await api.delete('/user')
        if (response.status === 200) {
          confirm('탈퇴가 완료됐어요. 다음에 다시 만나요. 🐖')
          navigate('/')
        } else {
          console.error('회원 탈퇴에 실패했습니다.')
        }
      }
    } catch (error) {
      console.error('회원 탈퇴 중 오류 발생:', error)
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
                <a href={'#'} onClick={handleDeleteAccount}>
                    회원 탈퇴
                </a>
            </div>
        </>
  )
}
