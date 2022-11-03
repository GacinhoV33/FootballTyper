import React from 'react'
import "./NavbarComp.scss";
import {Link} from 'react-router-dom';

//Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import TimeToStart from '../Statistics/TimeToStart';
import TimeToStartTwo from '../Statistics/TimeToStartTwo';

const NavbarComp = () => {
  const navlinkProps = {style: {
    fontSize:'1.50rem',
    marginRight: '2px'
  }}
  return (
    <Navbar bg='light' expand='lg' style={{height: '5rem', display: 'flex', flexDirection: 'row'}}>
        <div className='navbar-content'>
          <div className='navlinks-body'>
              {/* <Navbar.Brand href="/">Cool Logo</Navbar.Brand> */}
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Nav className="me-auto">
              <Nav.Link href="/groupstage" {...navlinkProps} >GroupStage</Nav.Link>
              <Nav.Link href="/knockout"  {...navlinkProps}>Knockout</Nav.Link>
              <Nav.Link href="/yourbets"  {...navlinkProps}>My Bets</Nav.Link>  {/* Think about changing yourbets to mybets*/}
              <Nav.Link href="/ranking"  {...navlinkProps}>Ranking</Nav.Link>
              <Nav.Link href="/statistics"  {...navlinkProps}>Statistics</Nav.Link>
              <Nav.Link href="/rules"  {...navlinkProps}>Rules</Nav.Link>
              <Nav.Link href="/login" {...navlinkProps}>Login</Nav.Link>
          </Nav>
          </div>
          <div style={{paddingRight: '1rem'}}>    
              <TimeToStartTwo/>
          </div>

        </div>
    </Navbar>
  )
}

export default NavbarComp;