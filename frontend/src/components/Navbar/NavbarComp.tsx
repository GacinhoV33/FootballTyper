import React, { useContext } from 'react'
import "./NavbarComp.scss";

//Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import TimeToStartTwo from '../Statistics/TimeToStartTwo';
import {BiFootball} from 'react-icons/bi';
import logo_player from '../LoadingLayout/logo_player_alpha.png';
import { UserContext } from '../../App';
import {CgProfile} from 'react-icons/cg';

const NavbarComp = () => {
  const navlinkProps = {style: {
    fontSize:'1.5rem',
    marginRight: '2px'
  }}
  const isUserLogged = useContext(UserContext).isUserSigned;
  const worldBall = <BiFootball size={28} style={{color: '#807090'}}/>;
  const profile = () => {
    return (
      <div style={{display: 'flex', alignItems:'center'}}>
      <CgProfile size={30}/>
      Profile      
      </div>
    )
  }
  return (
    <Navbar bg='light' expand='lg' style={{height: '5rem', display: 'flex', flexDirection: 'row'}}>
        <div className='navbar-content'>
          <div className='navlinks-body'>
              <Nav className="me-auto">
              <img  className='png-image' src={logo_player} alt='logogogo' width='80' height='70' style={{marginBottom: '1rem'}}/>
              <Nav.Link href="/groupstage" {...navlinkProps} className='nav-hover-item'>
                <Nav.Item>GroupStage</Nav.Item>
              </Nav.Link>
              <Nav.Link href="/knockout"  {...navlinkProps} className='nav-hover-item'>
                <Nav.Item>Knockout</Nav.Item>
                </Nav.Link>
              <Nav.Link href="/yourbets"  {...navlinkProps} className='nav-hover-item'>
                <Nav.Item>Bets</Nav.Item>
              </Nav.Link>  {/* Think about changing yourbets to mybets*/}
              <Nav.Link href="/ranking"  {...navlinkProps} className='nav-hover-item'>
                <Nav.Item>Ranking</Nav.Item>
              </Nav.Link>
              <Nav.Link href="/statistics"  {...navlinkProps} className='nav-hover-item'>
                <Nav.Item>Statistics</Nav.Item>
              </Nav.Link>
              <Nav.Link href="/rules"  {...navlinkProps} className='nav-hover-item'>
                <Nav.Item>Rules</Nav.Item>
              </Nav.Link>
              <Nav.Link href="/adminpanel"  {...navlinkProps} className='nav-hover-item'>
                <Nav.Item>Admin Panel</Nav.Item>
              </Nav.Link>
              <Nav.Link href={isUserLogged ? "/" : '/login'} {...navlinkProps} className='nav-hover-item'>
                <Nav.Item>{isUserLogged ? profile() : 'Login'}</Nav.Item>
              </Nav.Link>
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