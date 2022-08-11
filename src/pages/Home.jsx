import React, { useEffect, useState } from "react";
import { getProductsThunk, filterProductThunk, filterCategoryThunk } from "../store/slices/products.slice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
    Row,
    Card,
    Col,
    ListGroup,
    Container
} from "react-bootstrap";
import axios from "axios";
import { addProductThunk } from "../store/slices/cart.slice";


const Home = () => {
    const dispatch = useDispatch();

    const products = useSelector((state) => state.products)
    const navigate = useNavigate();
    const [searchValue, setSearchValue] = useState("");
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        dispatch(getProductsThunk());

        axios
            .get("https://ecommerce-api-react.herokuapp.com/api/v1/products/categories")
            .then((res) => setCategories(res.data.data.categories));
    }, []);

    const addProduct = (id) => {
        const product = {
            id: id,
            quantity: 1
        }
        dispatch(addProductThunk(product));
        console.log(product);
    }

    return (
        <Container>
            <Row>
                <Col sm={4}>
                    <ListGroup className="categoryList">
                        <h5 className="categoryTitle">Category</h5>
                        <ListGroup.Item onClick={() => dispatch(getProductsThunk())}>All Products</ListGroup.Item>
                        {categories.map((category) => (
                            <ListGroup.Item key={category.id} onClick={() => dispatch(filterCategoryThunk(category.id))}>{category.name}</ListGroup.Item>
                        ))}
                    </ListGroup>
                </Col>
                <Col sm={8} className="homeContainer">
                    <section className="searchProducts">
                        <div className="inputSearchContainer">
                            <form className="d-flex">
                                <input
                                    className="form-control me-sm-2"
                                    type="text"
                                    placeholder="Search"
                                    onChange={(e) => setSearchValue(e.target.value)}
                                    value={searchValue} />
                                <button
                                    className="btn btn-secondary my-2 my-sm-0"
                                    type="submit"
                                    onClick={() => dispatch(filterProductThunk(searchValue))}>
                                    Search
                                </button>
                            </form>
                        </div>
                        <Row xs={1} md={2} className="g-4">
                            {products.map((product) => (
                                <Col key={product.id}>
                                    <Card className="cardProduct" onClick={() => navigate(`/products/${product.id}`)}>
                                        <Card.Img className="cardImg" variant="top" src={product.productImgs[2]} />
                                        <Card.Body>
                                            <Card.Title>{product.title}</Card.Title>
                                            <Card.Text>
                                                ${product.price}
                                            </Card.Text>
                                            <button className="addCartHomeButton" onClick={() => addProduct(product.id)}><i className="fa-solid fa-cart-plus"></i></button>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    </section>
                </Col>
            </Row>
        </Container>
    );
};

export default Home;