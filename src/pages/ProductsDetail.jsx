import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux/es/exports';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProductsThunk } from '../store/slices/products.slice';
import { Card, Carousel, Col, Container, Row } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import { addProductThunk } from '../store/slices/cart.slice';


const ProductsDetail = () => {

  const allProducts = useSelector((state) => state.products);
  const [products, setProducts] = useState({})
  const { id } = useParams();
  const [sugestedProducts, setSugestedProducts] = useState([])
  const navigate = useNavigate();
  const [counter, setCounter] = useState(1);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProductsThunk())
  }, [])

  useEffect(() => {
    const productsFind = allProducts.find((product) => product.id === Number(id));
    setProducts(productsFind);

    const filteredProducts = allProducts.filter(product => product.category.id === productsFind.category.id)
    setSugestedProducts(filteredProducts);
  }, [allProducts, id])

  const images = products?.productImgs

  const increment = () => {
    setCounter(counter + 1);
  };

  const decrement = () => {
    setCounter(counter - 1);
  };

  const addProduct = () => {
    const product = {
      id: products.id,
      quantity: counter
    }
    dispatch(addProductThunk(product));
    console.log(product);
  }


  return (
    <div>
      <Container className="productsDetailContainer">
        <Row>
          <Col sm>
            <Carousel fade variant="dark">
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src={products?.productImgs?.[0]}
                  alt="First slide"
                />
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src={products?.productImgs?.[1]}
                  alt="Second slide"
                />
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src={products?.productImgs?.[2]}
                  alt="Third slide"
                />
              </Carousel.Item>
            </Carousel>
          </Col>
          <Col sm>
            <aside className='productDetailText'>
              <h3>{products?.title}</h3>
              <p className="productDescription">{products?.description}</p>
              <div className='productDetailPrice'>
                <div>
                  <h5>Price</h5>
                  <h4>${products?.price}</h4>
                </div>
                <div>
                  <h5>Quantity</h5>
                  <div className='counter'>
                    <button className='buttonDecrement' onClick={decrement} disabled={counter === 1}>-</button>
                    <span className='count'>{counter}</span>
                    <button className='buttonIncrement' onClick={increment}>+</button>
                  </div>
                </div>
              </div>
              <button className='addButton' onClick={addProduct}>Add to cart <i className="fa-solid fa-cart-shopping iconCartDetail"></i></button>
            </aside>
          </Col>
        </Row>
      </Container>
      <div>
        <h4 className="productsSugestedTitle" >Discover similar items</h4>
        <div className='productsSugested'>

          {
            sugestedProducts.map(products => (
              <Card className="cardProductSugested" onClick={() => {
                navigate(`/products/${products.id}`);
                scroll(0, 0);
              }} 
              key={products.id}>
                <Card.Img className="cardImg" variant="top" src={products.productImgs[2]} />
                <Card.Body>
                  <Card.Title>{products.title}</Card.Title>
                  <Card.Text>
                    ${products.price}
                  </Card.Text>
                </Card.Body>
              </Card>
            ))
          }
        </div>
      </div>
    </div>
  );
};

export default ProductsDetail;