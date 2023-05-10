import React from 'react';
import {createBrowserRouter, RouterProvider,} from "react-router-dom";
import {Container, Nav, Navbar} from "react-bootstrap";

import List from "./pages/board/list";
import ErrorPage from "./pages/error";
import Read from "./pages/board/read";
import Create from "./pages/board/create";
import Update from "./pages/board/update";
import Main from "./pages/main";

import './styles/global.css'

const router = createBrowserRouter([{
    // 메인 페이지
    path: "/", element: <Main/>, errorElement: <ErrorPage/>
}, {
    // 전체 조회
    path: "/freeboard", element: <List/>, errorElement: <ErrorPage/>,
}, {
    // 게시글 조회
    path: "/freeboard/:postNumber", element: <Read/>,
}, {
    // 게시글 생성
    path: "/freeboard/create", element: <Create/>,
}, {
    // 게시글 수정
    path: "/freeboard/update/:postNumber", element: <Update/>,
},]);

function App() {
    // React.StrictMode 사용하면 render가 두번씩 됨
    return (<>
        <React.StrictMode>
            <Navbar className={"mb-3 pig-bg-color"} collapseOnSelect expand="md" variant="light">
                <Container>
                    <Navbar.Brand href="/">돼지일기</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="/freeboard">자유게시판</Nav.Link>
                        </Nav>
                        <Nav>
                            <Nav.Link href="#">피그 마스터</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <Container>
                <RouterProvider router={router}/>
            </Container>

            <Navbar className="pig-bg-color justify-content-center mt-5" variant="light">
                <Nav.Link target={"_blank"} href="https://github.com/devyyj">개발자 깃허브</Nav.Link>
            </Navbar>
        </React.StrictMode>
    </>)
}

export default App;