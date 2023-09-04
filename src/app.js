import React, { useEffect } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './styles/global.css'
import List from './routes/freeBoard/list'
import ErrorPage from './routes/error'
import Read from './routes/freeBoard/read'
import Create from './routes/freeBoard/create'
import Update from './routes/freeBoard/update'
import Main from './routes/main'
import Login from './routes/login'
import MyInfo from './routes/myInfo'
import Layout from './routes/layout'

const router = createBrowserRouter([
  {
    // layout
    path: '/',
    element: <Layout/>,
    errorElement: <ErrorPage/>,
    children: [
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
        path: '/freeboard/:postId', element: <Read/>
      }, {
        // 게시글 생성
        path: '/freeboard/create', element: <Create/>
      }, {
        // 게시글 수정
        path: '/freeboard/update/:postId', element: <Update/>
      }, {
        path: '/myinfo', element: <MyInfo/>
      }
    ]
  }
])

export default function App () {
  useEffect(() => {
    // 페이지가 로드될 때와 새로 고침될 때 실행되는 코드
    console.warn('refresh check!')
  }, [])
  // React.StrictMode 사용하면 render가 두번씩 됨
  return (<>
        {/* <React.StrictMode> */}
        <RouterProvider router={router}/>
        {/* </React.StrictMode> */}
    </>)
}
