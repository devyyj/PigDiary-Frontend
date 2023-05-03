import React from 'react';
import {createBrowserRouter, RouterProvider,} from "react-router-dom";
import {Container, Navbar, Nav} from "react-bootstrap";

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
    path: "/:postNumber", element: <Read/>,
}, {
    // 게시글 생성
    path: "/create", element: <Create/>,
}, {
    // 게시글 수정
    path: "/update/:postNumber", element: <Update/>,
},]);

function App() {
    // React.StrictMode 사용하면 render가 두번씩 됨
    return (<>
        <React.StrictMode>
            <Container >
                <Navbar className="mb-5" bg="light" variant="light">
                    <Container>
                        <Navbar.Brand href="#home">돼지일기</Navbar.Brand>
                        <Navbar.Toggle/>
                        <Navbar.Collapse className="justify-content-end">
                            <Navbar.Text>
                                로그인 : <a href="#login">피그 마스터</a>
                            </Navbar.Text>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>

                <RouterProvider router={router}/>

                <Navbar className="justify-content-center mt-5" bg="light" variant="light" >
                    <Nav.Link href="https://github.com/devyyj">개발자 깃허브</Nav.Link>
                </Navbar>
            </Container>
        </React.StrictMode>
    </>)
}

export default App;