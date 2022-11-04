import React from 'react'
import "./NavbarComp.scss";
import {Link} from 'react-router-dom';

//Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import TimeToStart from '../Statistics/TimeToStart';
import TimeToStartTwo from '../Statistics/TimeToStartTwo';
import {BiFootball} from 'react-icons/bi';

const NavbarComp = () => {
  const navlinkProps = {style: {
    fontSize:'1.50rem',
    marginRight: '2px'
  }}

  const worldBall = <BiFootball size={28} style={{color: '#807090'}}/>;
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
              <Nav.Link href="/adminpanel"  {...navlinkProps}>Admin Panel</Nav.Link>
              <Nav.Link href="/login" {...navlinkProps}>Login</Nav.Link>
          </Nav>
          </div>
          <div style={{paddingRight: '1rem', display: 'flex', alignItems: 'center'}}>  
              <h1 style={{color: '#809070'}}>W{worldBall}rld Cup st{worldBall}rts in </h1>  
              <TimeToStartTwo/>
          </div>

        </div>
    </Navbar>
  )
}

export default NavbarComp;