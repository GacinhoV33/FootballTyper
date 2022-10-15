import React from 'react';
import './Footer.scss';

// boostrap
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import 'bootstrap/dist/css/bootstrap.min.css';

const Footer = () => {
  return (

    <Navbar style={{position: 'fixed', bottom: 0}}>
      <Nav>
        <Nav.Link href='/'>
          Contact
        </Nav.Link>
        <Nav.Link href='/'>
          About
        </Nav.Link>
        <Nav.Link href='/'>
          Others
        </Nav.Link>
        </Nav>
    </Navbar>
  )
}

export default Footer;