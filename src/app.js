import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Container, Nav, Navbar } from 'react-bootstrap'
import './styles/global.css'
import List from './pages/freeBoard/list'
import ErrorPage from './pages/error'
import Read from './pages/freeBoard/read'
import Create from './pages/freeBoard/create'
import Update from './pages/freeBoard/update'
import Main from './pages/main'
import Login from './pages/login'
import TopNav from './components/topNav'
import MyInfo from './pages/myInfo'

const router = createBrowserRouter([
  {
    // 메인 페이지
    path: '/', element: <Main/>, errorElement: <ErrorPage/>
  }, {
    // 로그인 페이지
    path: '/login', element: <Login/>, errorElement: <ErrorPage/>
  }, {
    // 전체 조회
    path: '/freeboard', element: <List/>, errorElement: <ErrorPage/>
  }, {
    // 게시글 조회
    path: '/freeboard/:postNumber', element: <Read/>
  }, {
    // 게시글 생성
    path: '/freeboard/create', element: <Create/>
  }, {
    // 게시글 수정
    path: '/freeboard/update/:postNumber', element: <Update/>
  }, {
    path: '/myinfo', element: <MyInfo/>
  }
])

export default function App () {
  // React.StrictMode 사용하면 render가 두번씩 됨
  return (<>
        {/* <React.StrictMode> */}
        <TopNav/>

        <Container>
            <RouterProvider router={router}/>
        </Container>

        <Navbar className="pig-bg-color justify-content-center mt-3" variant="light">
            <Nav.Link target={'_blank'} href="https://github.com/devyyj">개발자 깃허브</Nav.Link>
        </Navbar>
        {/* </React.StrictMode> */}
    </>)
}
