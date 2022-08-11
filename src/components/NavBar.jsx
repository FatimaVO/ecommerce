import React, { useEffect } from 'react';
import { Navbar, Container, Nav, Button, Offcanvas } from "react-bootstrap";
import logo from "../assets/images/smileShop.png"
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Cart from './Cart';
import { getCartThunk } from '../store/slices/cart.slice';
import { useDispatch, useSelector } from 'react-redux';


const NavBar = () => {
    const cart = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCartThunk())
    }, [])


    const navigate = useNavigate();

    const [show, setShow] = useState(false);

    const token = localStorage.getItem("token");

    const handleClose = () => setShow(false);
    const handleShow = () => {
        if (token) {
            setShow(true);
        } else {
            navigate("/login");
        }
    };

    const logout = () => {
        localStorage.setItem("token", "");
        navigate("/login");
    };

    const counterMap = cart.map((product) => Number((product.productsInCart.quantity)));

    const totalCounter = () => {
        let sumCounter = counterMap.reduce(function (a, b) { return a + b }, 0);
        return sumCounter
    }

    return (
        <>
            <Navbar bg="dark" expand="lg">
                <Container>
                    <Navbar.Brand href="/#/"><img className="logo" src={logo} alt="" /></Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav className="me-auto" >
                        </Nav>
                        <Nav className="navMenu">
                            <Nav.Link className="purchasesTextNav" href="/#/purchases"><i className="fa-solid fa-store"></i>Purchases</Nav.Link>
                            {token ? (
                                <Nav.Link as={Button} onClick={logout} className="logoutButton">
                                    <i className="fa-solid fa-user"></i> Log Out
                                </Nav.Link>
                            ) : (
                                <Nav.Link className="loginTextNav" href="/#/login"> <i className="fa-solid fa-user"></i>Login</Nav.Link>
                            )}
                            <button className="cartNavButton" onClick={handleShow}><i className="fa-solid fa-cart-shopping"></i> CART <p className='counterCart'>{totalCounter()}</p></button>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Cart show={show} handleClose={handleClose} />
        </>
    );
};

export default NavBar;