import React from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
//add this dropdown if we need it
import NavDropdown from 'react-bootstrap/NavDropdown';

//importing link so we can connect site with react router
//make sure to add or define all routes in the app.js
import { Link } from "react-router-dom";

const Navibar = () => {

  //get a isLoggedIn variable using firebase backend to check if they are logged in or not
  let isLoggedIn = true;
  //get the id of the user if they are logged in
  let sampleUserId = 0;
  if (isLoggedIn) {
    //get the userId from firebase
    sampleUserId = 1;
  }
  return (
    <Navbar expand="xl" className="bg-body-tertiary">
      <Container>
      <Link to="/home"><Navbar.Brand>TradeM</Navbar.Brand></Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
          <Link to="/home"><Nav.Link >Home</Nav.Link></Link>
          <Link to="/map"><Nav.Link >Map</Nav.Link></Link>
          <Nav.Link href="#about">About</Nav.Link>
            {
              //if isLoggedIn is true show my products and user
              //else show login
              isLoggedIn ? (
                <>
                 <Link to={`/myproducts/${sampleUserId}`}><Nav.Link >My Products</Nav.Link></Link> 
                 <Link to={`/user/${sampleUserId}`}><Nav.Link >User</Nav.Link></Link>
                </>
              ) :
              (
                <Link to="/login"><Nav.Link >Login</Nav.Link></Link>
              )
            }
            
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navibar;
