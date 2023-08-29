import React from 'react';
import {createBrowserRouter, RouterProvider,} from "react-router-dom";
import {Container, Nav, Navbar} from "react-bootstrap";

import './styles/global.css'
import List from "./pages/freeBoard/list";
import ErrorPage from "./pages/error";
import Read from "./pages/freeBoard/read";
import Create from "./pages/freeBoard/create";
import Update from "./pages/freeBoard/update";
import Main from "./pages/main";
import Login from "./pages/login";

const router = createBrowserRouter([{
    // 메인 페이지
    path: "/", element: <Main/>, errorElement: <ErrorPage/>
}, {
    // 로그인 페이지
    path: "/login", element: <Login/>, errorElement: <ErrorPage/>
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
}]);

function App() {
    // const userInfo = useSelector(state => state.userInfo);

    // React.StrictMode 사용하면 render가 두번씩 됨
    return (<>
        {/*<React.StrictMode>*/}
        <Navbar className={"mb-3 pig-bg-color"} collapseOnSelect expand="md" variant="light">
            <Container>
                <Navbar.Brand href="/">돼지일기</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/freeboard">자유게시판</Nav.Link>
                    </Nav>
                    <Nav>
                        <Nav.Link href="/login">로그인</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>

        <Container>
            <RouterProvider router={router}/>
        </Container>

        <Navbar className="pig-bg-color justify-content-center mt-3" variant="light">
            <Nav.Link target={"_blank"} href="https://github.com/devyyj">개발자 깃허브</Nav.Link>
        </Navbar>
        {/*</React.StrictMode>*/}
    </>)
}

export default App;