import React from 'react'
import TopNav from '../components/topNav'
import { Container, Nav, Navbar } from 'react-bootstrap'
import { Outlet } from 'react-router-dom'

export default function Main () {
  return (
        <>
            <TopNav/>

            <Container>
                <Outlet/>
            </Container>

            <Navbar className="pig-bg-color justify-content-center mt-3" variant="light">
                <Nav.Link target={'_blank'} href="https://github.com/devyyj">개발자 깃허브</Nav.Link>
            </Navbar>
        </>
  )
}
