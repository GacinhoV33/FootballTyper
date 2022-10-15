import React from 'react';
import { Route, Router } from 'react-router-dom';

// Components 
import Logo  from '../Logo/Logo';
import CountryFlags from '../CountryFlags/CountryFlags';
import Layout from '../Layout/Layout';

const Homepage = () => {
  
  return (
    <div className='dev-class'>
        <Logo/>
        <CountryFlags/>
        ---This is Homepage component---
        <Layout/>
        
    </div>
  )
}

export default Homepage;