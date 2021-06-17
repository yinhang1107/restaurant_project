import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import { useSelector } from "react-redux";

import "./styles.css";

const NavBar = () => {
  const user = useSelector((state) => state.user);
  return (
    <Navbar bg="transparent" expand="lg" className="navigation-bar">
      <Container className=''>
        <Navbar.Brand href="/home">ABC restaurant</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse
          id="basic-navbar-nav"
          className="navbar-transition justify-content-lg-end"
        >
          <Nav className="mr-auto ">
            <Nav.Link href="/home">Home</Nav.Link>
            <Nav.Link href="/menu">Menu</Nav.Link>
            <Nav.Link href="/reservations">Reservations</Nav.Link>
            <Nav.Link href="/news">News</Nav.Link>
            <Nav.Link href="/location">Location</Nav.Link>
            {!user && <>
            <Nav.Link href="/register">Register</Nav.Link>
            <Nav.Link href="/login">Login</Nav.Link>
            </>}
            {user && (
                <Nav.Link href="/logout">Logout</Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
