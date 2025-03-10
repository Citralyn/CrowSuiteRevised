import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import { Outlet } from "react-router";

function MainLayout() {
  return (
    <>
    <Navbar expand='false' className='bg-dark nav_bar'>
      <Container>
        <Navbar.Brand className='text-light' href="/">CrowSuite</Navbar.Brand>
        <Navbar.Toggle className='bg-light' aria-controls="collapser"/>
        <Navbar.Collapse id="collapser">
          <Nav style={{float: "right"}}>
            <Nav.Link className='text-light ' href="/proto">Play</Nav.Link>
            <Nav.Link className='text-light' href="/">How 2 Play</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    <Outlet />
    </>
  );
}

export default MainLayout;