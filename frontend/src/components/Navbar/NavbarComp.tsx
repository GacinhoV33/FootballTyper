import React from 'react'
import "./NavbarComp.scss";
import {Link} from 'react-router-dom';

//Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

const NavbarComp = () => {
  
  return (
    <Navbar bg='light' expand='lg'>
        <div className='navbar-content'>
        <Navbar.Brand href="/">Cool Logo</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Nav className="me-auto">
            <Nav.Link href="/groupstage">GroupStage</Nav.Link>
            <Nav.Link href="/knockout">Knockout</Nav.Link>
            <Nav.Link href="/yourbets">My Bets</Nav.Link>  {/* Think about changing yourbets to mybets*/}
            <Nav.Link href="/ranking">Ranking</Nav.Link>
            <Nav.Link href="/statistics">Statistics</Nav.Link>
            <Nav.Link href="/rules">Rules</Nav.Link>
            <Nav.Link href="/login">Login</Nav.Link>
        </Nav>
        </div>
    </Navbar>
  )
}

export default NavbarComp;