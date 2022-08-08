import React from 'react'
import "./Navbar.scss";
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


const Navbar = () => {
  
  return (

    <div className='dev-class'>
      <div className='dev-nav-class'>
        <Link to='/'>
          Home
        </Link>
      </div>
      <div className='dev-nav-class'>
        <Link to='/groupstage'>
          GroupStage
        </Link>
      </div>
      <div className='dev-nav-class'>
        <Link to='/knockout'>
          Knockout Stage
        </Link>
      </div>
      <div className='dev-nav-class'>
        <Link to='/schedule'>
          Schedule
        </Link>
      </div>
      <div className='dev-nav-class'>
        <Link to='/yourbets'>
          YourBets
        </Link>
      </div>
      <div className='dev-nav-class'>
        <Link to='/ranking'>
          Ranking
        </Link>
      </div>
      <div className='dev-nav-class'>
        <Link to='/statistics'>
          Statistics
        </Link>
      </div>
      <div className='dev-nav-class'>
        <Link to='/rules'>
          Rules
        </Link>
      </div>
      <div className='dev-nav-class'>
        <Link to='/login'>
          Login
        </Link>
      </div>
      --This is Navbar ---
    </div>
  )
}

export default Navbar