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

  function checkLogin () {
    if (cookies.isLogged) navigate('/diary')
    else {
      if (confirm('로그인이 필요해요. 🐷 로그인 하시겠어요?')) {
        navigate('/login') // 로그인 페이지로 이동
        console.log('1')
      }
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
                            <Nav.Link className="nav-link" onClick={checkLogin}>다이어리 쓰기</Nav.Link>
                            <Link to="/freeboard" className="nav-link">자유게시판</Link>
                        </Nav>
                        <Nav>
                            {
                                cookies.isLogged
                                  ? <>
                                        <Link to="/myinfo" className="nav-link">내 정보</Link>
                                        <Nav.Link className="nav-link" onClick={logout}>로그아웃</Nav.Link>
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
