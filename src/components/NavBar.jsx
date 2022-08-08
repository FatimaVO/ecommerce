import React from 'react';
import { Navbar, Container, Nav } from "react-bootstrap";
import logo from "../assets/images/smileShop.png"

const NavBar = () => {
    return (
        <Navbar bg="dark" expand="lg">
            <Container>
                <Navbar.Brand href="/#/"><img className="logo" src={logo} alt="" /></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link className="homeTextNav" href="/#/">Home</Nav.Link>
                        <Nav.Link className="purchasesTextNav" href="/#/purchases">Purchases</Nav.Link>
                        <Nav.Link className="loginTextNav" href="/#/login">Login</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavBar;

/*<Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand href="/#/"><img className="logo" src={logo} alt="" /></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/#/"><i className="fa-solid fa-house"></i></Nav.Link>
                        <Nav.Link href="/#/purchases"><i className="fa-solid fa-box-archive"></i></Nav.Link>
                        <Nav.Link href="/#/login"><i className="fa-solid fa-user"></i></Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
*/