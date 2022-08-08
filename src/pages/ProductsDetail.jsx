import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux/es/exports';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProductsThunk } from '../store/slices/products.slice';
import { Card, Carousel, Col, Container, Row } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";


const ProductsDetail = () => {

  const allProducts = useSelector((state) => state.products);
  const [products, setProducts] = useState({})
  const { id } = useParams();
  const[sugestedProducts, setSugestedProducts]= useState([])
  const navigate = useNavigate();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProductsThunk())
  }, [])

  useEffect(() => {
    const productsFind = allProducts.find((product) => product.id === Number(id));
    setProducts(productsFind);

    const filteredProducts= allProducts.filter(product => product.category.id=== productsFind.category.id)
    setSugestedProducts(filteredProducts);
  }, [allProducts, id])

  console.log(products);

  const images = products?.productImgs

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
                  <button className='buttonDecrement'>-</button>
                  <span className='count'>1</span>
                  <button className='buttonIncrement'>+</button>
                </div>
              </div>
            </div>
            <button className='addButton'>Add to chart</button>
          </aside>
        </Col>
      </Row>
    </Container>
    <div>
    <h4 className="productsSugestedTitle" >Discover similar items</h4>
    <div className='productsSugested'>
      
      {
        sugestedProducts.map(products=>(
          <Card className="cardProductSugested" onClick={() => navigate(`/products/${products.id}`)} key={products.id}>
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

/* <Carousel fade>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={products?.productImgs[0]}
          alt="First slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={products?.productImgs[1]}
          alt="Second slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={products?.productImgs[2]}
          alt="Third slide"
        />
      </Carousel.Item>
    </Carousel>
    */