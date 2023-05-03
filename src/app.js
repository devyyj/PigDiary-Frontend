import React from 'react';
import {createBrowserRouter, RouterProvider,} from "react-router-dom";
import {Container, Navbar, Nav} from "react-bootstrap";

import List from "./pages/board/list";
import ErrorPage from "./pages/error";
import Read from "./pages/board/read";
import Create from "./pages/board/create";
import Update from "./pages/board/update";
import Main from "./pages/main";

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

const navbarStyle = {
    backgroundColor: 'pink'
};

class App extends React.Component {
    render() {
        // React.StrictMode 사용하면 render가 두번씩 됨
        return (<>
            <React.StrictMode>
                <Container>
                    <Navbar style={navbarStyle}>
                        <Navbar.Brand href="#home">Navbar with text</Navbar.Brand>
                        <Navbar.Toggle/>
                        <Navbar.Collapse className="justify-content-end">
                            <Navbar.Text>
                                Signed in as: <a href="#login">Mark Otto</a>
                            </Navbar.Text>
                        </Navbar.Collapse>
                    </Navbar>

                    <RouterProvider router={router}/>



                    <Navbar fixed="bottom" bg="light" expand="lg" className="justify-content-center">
                        <Navbar.Brand href="#home">My Website</Navbar.Brand>
                    </Navbar>
                </Container>
            </React.StrictMode>
        </>)
    }
}

export default App;