import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Offcanvas } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { buyCartThunk, deleteProductThunk } from '../store/slices/cart.slice';


const Cart = ({ show, handleClose }) => {

    const cart = useSelector((state) => state.cart);
    const navigate = useNavigate();

    const dispatch = useDispatch();

    const pricesMap = cart.map((product) => Number((product.price)) * (product.productsInCart.quantity));

    const total = () => {
        let sum = pricesMap.reduce(function (a, b) { return a + b }, 0);
        return sum
    }


    const deleteProduct = (id) => {
        const product = {
            id: id,
        }
        dispatch(deleteProductThunk(id));
        console.log(product);
    }




    return (
        <Offcanvas show={show} onHide={handleClose} placement="end" responsive="lg" className="cartProducts">
            <Offcanvas.Header closeButton className="titleCart">
                <Offcanvas.Title>Cart</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                {cart.map((product) => (
                    <div key={product.id} onClick={() => navigate(`/products/${product.id}`)} className="cart">
                        <div className='brandAndDeleteCart'>
                            <p>{product.brand}</p>
                            <button className='buttonDeleteCart' onClick={() => deleteProduct(product.id)}><i className="fa-solid fa-trash-can"></i></button>
                        </div>
                        <p className='titleProductCart'>{product.title}</p>
                        <p className='quantityProductCart'>{product.productsInCart.quantity}</p>
                        <div className='productPriceCart'>
                            <p className='productTotalCart'>Total:</p>
                            <p className='productPriceText'>${Number((product.price)) * (product.productsInCart.quantity)}</p>
                        </div>
                    </div>

                ))}
            </Offcanvas.Body>
            <Offcanvas.Header >
                <div className='totalCartDiv'>
                    <div className='totalCart'>
                        <p>Total:</p>
                        <p className='productPriceText'>${total()}.00</p>
                    </div>
                    <button className='checkout' onClick={() => dispatch(buyCartThunk())}>checkout</button>
                </div>
            </Offcanvas.Header>
        </Offcanvas>
    );
};

export default Cart;