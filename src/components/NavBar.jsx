import React from 'react';
import { Navbar, Container, Nav, Button } from "react-bootstrap";
import logo from "../assets/images/smileShop.png"
import { useNavigate } from "react-router-dom";

const NavBar = () => {
    const navigate = useNavigate();

    const logout = () => {
        localStorage.setItem("token", "");
        navigate("/login");
    };

    const token = localStorage.getItem("token");

    return (
        <Navbar bg="dark" expand="lg">
            <Container>
                <Navbar.Brand href="/#/"><img className="logo" src={logo} alt="" /></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link className="homeTextNav" href="/#/">Home</Nav.Link>
                        <Nav.Link className="purchasesTextNav" href="/#/purchases">Purchases</Nav.Link>
                        {token ? (
                            <Nav.Link as={Button} onClick={logout} className="logoutButton">
                                Log Out
                                </Nav.Link>
                        ) : (
                        <Nav.Link className="loginTextNav" href="/#/login">Login</Nav.Link>
                        )}
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