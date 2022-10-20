import React from 'react'
import "./NavbarComp.scss";
import {Link} from 'react-router-dom';
// components 
import GroupStage from '../GroupStage/GroupStage';
import CountryFlags from '../CountryFlags/CountryFlags';
import KnockoutStage from '../KnockoutStage/KnockoutStage';
import Login from '../Login/Login';
import Ranking from '../Ranking/Ranking';
import Rules from '../Rules/Rules';
import Statistics from '../Statistics/Statistics';
import YourBets from '../YourBets/YourBets'; 

//Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

const NavbarComp = () => {
  
  return (
    <Navbar bg='light' expand='lg'>
        <div style={{paddingLeft: '1.5rem', display: 'flex', flexDirection: 'row'}}>
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
            <Nav.Link href='/profil'>Profile</Nav.Link>
        </Nav>
        </div>
    </Navbar>
  )
}

export default NavbarComp;