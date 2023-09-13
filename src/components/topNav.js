import { Container, Nav, Navbar } from 'react-bootstrap'
import React from 'react'
import { useCookies } from 'react-cookie'
import { api } from '../common/common'
import { Link, useNavigate } from 'react-router-dom'

export default function topNav () {
  const [cookies] = useCookies(['isLogged'])
  const navigate = useNavigate()

  async function logout () {
    if (confirm('로그아웃 하시겠어요? 🐗')) {
      const response = await api.get('/logout')
      if (response.status === 200) navigate('/')
    }
  }

  return (
        <>

            <Navbar className={'mb-3 pig-bg-color'} collapseOnSelect expand="md" variant="light">
                <Container>
                    <Link to="/" className="navbar-brand">돼지일기</Link>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <Link to="/diary" className="nav-link">일기 쓰기</Link>
                            <Link to="/freeboard" className="nav-link">자유게시판</Link>
                        </Nav>
                        <Nav>
                            {
                                cookies.isLogged
                                  ? <>
                                        <Link to="/myinfo" className="nav-link">내 정보</Link>
                                        <Link to="#" className="nav-link" onClick={logout}>로그아웃</Link>
                                    </>
                                  : <Link to="/login" className="nav-link">로그인</Link>
                            }
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
  )
}
