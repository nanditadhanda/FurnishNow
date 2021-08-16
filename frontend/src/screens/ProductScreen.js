import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import {Container, Row, Col,Breadcrumb, Image, ListGroup, Button, ListGroupItem} from 'react-bootstrap'
import Rating from '../components/Rating'
// import products from '../products'

import axios from 'axios'

const ProductScreen = ({match}) => {
   //products state - [set the state, method]
    const [product, setProduct] = useState([])

    //useEffect is triggered when component loads
    useEffect(() => {
        //get product from backend API
        async function fetchProduct(){
            const { data } = await axios.get(`/api/products/${match.params.id}`)
            setProduct(data)
        }

        fetchProduct()
        
    }, [])


    // const product = products.find((p) => p._id === match.params.id)
    return (
        <Container className="py-5">
            <Row>
                <Col>
                    <Breadcrumb>
                    <Breadcrumb.Item> <Link to="/">Home</Link></Breadcrumb.Item>
                        <Breadcrumb.Item><Link to={`/products/${product.category}`}>{product.category}</Link></Breadcrumb.Item>
                        <Breadcrumb.Item active>{product.name}</Breadcrumb.Item>
                    </Breadcrumb>
                </Col>
                
            </Row>
            <Row>
                <Col sm={12} md={6} xl={5} className="md-sticky-top">
                    <Image src={product.image} alt={product.name} fluid/>
                </Col>
                <Col sm={12} md={6} xl={4}>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h3 className="">{product.name}</h3>
                            <Rating value={product.rating} color='text-primary' text={`${product.numReviews} reviews`}/>
                        </ListGroup.Item>
                        <ListGroupItem>
                            <h2 className="fw-bold my-3 ">${product.salePrice}</h2>
                        </ListGroupItem>
                        <ListGroupItem>
                            <h6 className="pt-3 pb-2">Product Details:</h6>
                            <Row className='pb-2'>
                                <Col sm={6} md={4} >Brand:</Col>
                                <Col>{product.brand}</Col>
                            </Row>
                            <Row>
                                <Col sm={6} md={4} >Description:</Col>
                                <Col className="lh-base">{product.description}</Col>
                            </Row>
                        
                        </ListGroupItem>
                    </ListGroup>
                </Col>
                <Col >
                    <ListGroup >
                        <ListGroupItem>
                            <Row>
                                <Col sm={6} md={4}>Status:</Col>
                                <Col >
                                    {product.countInStock>0 
                                        ? <span className="text-success">In Stock</span> 
                                        : <span className="text-danger">Out of Stock</span>
                                    }
                                </Col>     
                            </Row>
                        </ListGroupItem>
                        <ListGroupItem>
                            <Row>
                                <Col md={4}>
                                    <label for="quantity" class="form-label">Quantity:</label>      
                                </Col>
                                <Col>
                                    <input type="number" class="form-control" id="quantity"
                                    disabled={product.countInStock === 0} 
                                    readOnly={product.countInStock === 0} 
                                    min="0" max={product.countInStock}/> 

                                    {product.countInStock <= 5 && product.countInStock !== 0 ? <cite className="text-danger">Hurry! Only {product.countInStock} items left</cite>
                                    :<cite className="danger"></cite>}
                                </Col> 
                                <Col md={12} className="mt-3 mb-2">
                                    <div className="d-grid">
                                        <Button variant={product.countInStock === 0 ? "outline-secondary" : "outline-primary"} type='button' disabled={product.countInStock === 0}>Add To Cart</Button>
                                        
                                        <Button className={`mt-2 ${product.countInStock === 0 ? "btn-secondary" : "btn-primary"}`} type='button' disabled={product.countInStock === 0}>Buy Now</Button>          
                                    </div>
                                </Col>    
                            </Row>
                        </ListGroupItem>
                    </ListGroup>
                </Col>   
            </Row>
        </Container>
    )
}

export default ProductScreen
