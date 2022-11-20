import React, { useContext } from 'react'
import "./NavbarComp.scss";
import ReactGA from 'react-ga';
//Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import TimeToStartTwo from '../Statistics/TimeToStart';
import { BiFootball } from 'react-icons/bi';
import logo_player from '../LoadingLayout/logo_player_alpha.png';
import { UserContext } from '../../App';
import { CgProfile } from 'react-icons/cg';
import { isMobile } from 'react-device-detect';

export interface NavbarCompProps {

}
const NavbarComp: React.FC<NavbarCompProps> = () => {

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
            <Nav.Link href='/' onClick={() => ReactGA.event({category: 'Homepage', action: 'Visit'})}>

              <img className='png-image' src={logo_player} alt='logogogo' />
            </Nav.Link>
            <Nav.Link href={isUserLogged ? "/groupstage" : './Login'} className='nav-hover-item' onClick={() => ReactGA.event({category: 'User', action: 'Visit HomePage'})}>
              <Nav.Item className='navbar-text'>Group</Nav.Item>
            </Nav.Link>
            { !isMobile ?
              <Nav.Link href={isUserLogged ? "/knockout" : './Login'} className='nav-hover-item' onClick={() => ReactGA.event({category: 'User', action: 'Visit Knockout'})}>
                <Nav.Item className='navbar-text'>Knockout</Nav.Item>
              </Nav.Link> : null
            }

            <Nav.Link href={isUserLogged ? "/yourbets" : './Login'} className='nav-hover-item' onClick={() => ReactGA.event({category: 'User', action: 'Visit My Bets'})}>
              <Nav.Item className='navbar-text'>Bets</Nav.Item>
            </Nav.Link>  {/* Think about changing yourbets to mybets*/}
            <Nav.Link href={isUserLogged ? "/ranking" : '/Login'} className='nav-hover-item' onClick={() => ReactGA.event({category: 'User', action: 'Visit Ranking'})}>
              <Nav.Item className='navbar-text'>Ranking</Nav.Item>
            </Nav.Link>
            {process.env.REACT_APP_IS_IT_PRODUCTION_VERSION !== 'true' &&
              <Nav.Link href={isUserLogged ? "/statistics" : '/Login'} className='nav-hover-item' onClick={() => ReactGA.event({category: 'User', action: 'Visit Statistics'})}>
                <Nav.Item className='navbar-text'>Statistics</Nav.Item>
              </Nav.Link>
            }
            <Nav.Link href="/rules" className='nav-hover-item' onClick={() => ReactGA.event({category: 'User', action: 'Visit Rules'})}>
              <Nav.Item className='navbar-text'>Rules</Nav.Item>
            </Nav.Link>
            {process.env.REACT_APP_IS_IT_PRODUCTION_VERSION !== 'true' &&
              <Nav.Link href="/adminpanel" className='nav-hover-item' >
                <Nav.Item className='navbar-text'>Admin Panel</Nav.Item>
              </Nav.Link>
            }
            <Nav.Link href='/Login' className='nav-hover-item' onClick={() => ReactGA.event({category: 'User', action: 'Visit Profile'})}>
              <Nav.Item className='navbar-text'>{isUserLogged ? profile() : 'Login'}</Nav.Item>
            </Nav.Link>
          </Nav>
        </div>
        {new Date('2022-11-20T17:00:00') > new Date() ?
          <div className='time-to-start-navbar'>
            <h1 style={{ color: '#888', fontSize: '2vw' }}>W{worldBall}rld Cup starts in </h1>
            <TimeToStartTwo />

          </div> :
          <div className='time-to-start-navbar day-of-mundial-text'>
            Day {currentDay().toString()}
          </div>
        }

      </div>
    </Navbar>
  )
}

export default NavbarComp;

function currentDay() {
  const currentDate = new Date();
  const month = currentDate.getMonth();
  const day = currentDate.getDate();
  let currentDay = -1
  if (month === 11) {
    currentDay = day - 20;
  }
  else if (month === 12) {
    currentDay = day + 11
  }
  return currentDay;
}