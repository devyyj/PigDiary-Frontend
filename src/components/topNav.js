import { Container, Nav, Navbar } from 'react-bootstrap'
import React from 'react'
import { useCookies } from 'react-cookie'
import { api } from '../common/common'
import { useNavigate } from 'react-router-dom'

export default function topNav () {
  const [cookies] = useCookies(['isLogged'])
  const navigate = useNavigate()
  async function logout () {
    if (confirm('로그아웃 하시겠어요? 🐗')) {
      const response = await api.get('/logout')
      if (response.status === 200) navigate('/')
    }
  }

  return <Navbar className={'mb-3 pig-bg-color'} collapseOnSelect expand="md" variant="light">
        <Container>
            <Navbar.Brand href="/">돼지일기</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link href="/freeboard">자유게시판</Nav.Link>
                </Nav>
                <Nav>
                    {
                        cookies.isLogged
                          ? <>
                                <Nav.Link href="/myinfo">내 정보</Nav.Link>
                                <Nav.Link href="#" onClick={logout}>로그아웃</Nav.Link>
                            </>
                          : <Nav.Link href="/login">로그인</Nav.Link>
                    }
                </Nav>
            </Navbar.Collapse>
        </Container>
    </Navbar>
}
