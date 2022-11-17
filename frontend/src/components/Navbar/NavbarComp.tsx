import React, { useContext } from 'react'
import "./NavbarComp.scss";

//Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import TimeToStartTwo from '../Statistics/TimeToStart';
import { BiFootball } from 'react-icons/bi';
import logo_player from '../LoadingLayout/logo_player_alpha.png';
import { UserContext } from '../../App';
import { CgProfile } from 'react-icons/cg';

const NavbarComp = () => {

  const isUserLogged = useContext(UserContext).isUserSigned;
  const worldBall = <BiFootball size={28} style={{ color: 'rgb(138, 21, 56)' }} />;
  const profile = () => {
    return (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <CgProfile className='profile-icon-navbar' />
        Profile
      </div>
    )
  }

  return (
    <Navbar bg='light' className='navbar-main' fixed='top'>
      <div className='navbar-content'>
        <div className='navlinks-body'>
          <Nav className="me-auto">
            <Nav.Link href='/'>

              <img className='png-image' src={logo_player} alt='logogogo' />
            </Nav.Link>
            <Nav.Link href={isUserLogged ? "/groupstage" : './Login'} className='nav-hover-item'>
              <Nav.Item className='navbar-text'>GroupStage</Nav.Item>
            </Nav.Link>
            <Nav.Link href={isUserLogged ? "/knockout" : './Login'} className='nav-hover-item'>
              <Nav.Item className='navbar-text'>Knockout</Nav.Item>
            </Nav.Link>
            <Nav.Link href={isUserLogged ? "/yourbets" : './Login'} className='nav-hover-item'>
              <Nav.Item className='navbar-text'>Bets</Nav.Item>
            </Nav.Link>  {/* Think about changing yourbets to mybets*/}
            <Nav.Link href={isUserLogged ? "/ranking" : '/Login'} className='nav-hover-item'>
              <Nav.Item className='navbar-text'>Ranking</Nav.Item>
            </Nav.Link>
            {Boolean(process.env.REACT_APP_IS_IT_PRODUCTION_VERSION) === true &&
              <Nav.Link href={isUserLogged ? "/statistics" : '/Login'} className='nav-hover-item'>
                <Nav.Item className='navbar-text'>Statistics</Nav.Item>
              </Nav.Link>
            }
            <Nav.Link href="/rules" className='nav-hover-item'>
              <Nav.Item className='navbar-text'>Rules</Nav.Item>
            </Nav.Link>
            {Boolean(process.env.REACT_APP_IS_IT_PRODUCTION_VERSION) === true &&
              <Nav.Link href="/adminpanel" className='nav-hover-item'>
                <Nav.Item className='navbar-text'>Admin Panel</Nav.Item>
              </Nav.Link>
            }
            <Nav.Link href='/Login' className='nav-hover-item'>
              <Nav.Item className='navbar-text'>{isUserLogged ? profile() : 'Login'}</Nav.Item>
            </Nav.Link>
          </Nav>
        </div>
        <div className='time-to-start-navbar'>
          <h1 style={{ color: '#888', fontSize: '2vw' }}>W{worldBall}rld Cup starts in </h1>
          <TimeToStartTwo />
        </div>
      </div>
    </Navbar>
  )
}

export default NavbarComp;