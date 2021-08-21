import React, { useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import {Row, Col,Breadcrumb, Image, ListGroup, Button, ListGroupItem} from 'react-bootstrap'

//Custom components
import Quantity from '../components/Quantity'
import Rating from '../components/Rating'
import Loader from '../components/Loader'
import Message from '../components/Message'
// import products from '../products'


//import redux and reducers
import {useDispatch, useSelector} from 'react-redux'
import {listProductDetails} from '../actions/productActions'

//Product screen function
const ProductScreen = ({match, history}) => {
    /*-------retrieve product data--------- */
    //product ID
    const productID = match.params.id
 
    const dispatch = useDispatch()

    //useSelector allows us to fire off certain parts of states
    const productDetails = useSelector(state => state.productDetails)

    //destructure the state
    const {error, loading, product} = productDetails

    //useEffect is triggered when component loads
    useEffect(() => {
        //fire off listProductDetails() action
       dispatch(listProductDetails(productID))
    }, [dispatch, match])    

    /*------quantity update ---------- */
    //React Hook for product quantity
    const [productQty, setQuantity] = useState (0)

    //set quantity value when value in Quantity field is updated
    const updateQty = (qtyInput) => {    
       setQuantity(qtyInput.qty)   
    }

    /*------Add To Cart ---------- */
    //add to cart event
    const addToCartHandler = () => {
        productQty > 0
            ? history.push(`/cart/${productID}?qty=${productQty}`)
                
            : console.log("Update Quantity Value")
    }


    // const product = products.find((p) => p._id === match.params.id)
    return (
        <section>
            {/* loading condition */}
            {loading ? 
                //if loading - display spinner
                <Loader />

                //else if error - display error message
                : error
                ? <div>
                    <Link to="/"><Button>Back to Home</Button></Link>
                    <Message variant="danger">Error: {error}</Message>
                  </div>

                  //else if loaded - display product details
                    : <section>

                     {/* Navigation breadcrumb   */}
                
                    <Row>
                        <Col>
                            <Breadcrumb>
                                <Breadcrumb.Item> 
                                    <Link to="/">Home</Link>
                                </Breadcrumb.Item>
                                <Breadcrumb.Item>
                                    <Link to={`/products/${product.category_slug}`}>{product.category}</Link>
                                </Breadcrumb.Item>
                                <Breadcrumb.Item active>
                                    {product.name}
                                </Breadcrumb.Item>
                            </Breadcrumb>
                        </Col>                 
                    </Row>
                    {/* Product Details   */}
                    <Row>
                        {/* Product image */}
                        <Col sm={12} md={6} xl={5} className="md-sticky-top">
                            <Image src={product.image} alt={product.name} fluid/>
                        </Col>
                         {/* Product Information */}
                        <Col sm={12} md={6} xl={4}>
                            <ListGroup variant="flush">
                                <ListGroup.Item>
                                    {/* Name */}
                                    <h3 className="">{product.name}</h3>
                                     {/* Rating */}
                                    <Rating value={product.rating} color='text-primary' text={`${product.numReviews} reviews`}/>
                                </ListGroup.Item>
                                <ListGroupItem>
                                    {/* Price */}
                                    <h2 className="fw-bold my-3 ">RM {product.salePrice}</h2>
                                </ListGroupItem>
                                <ListGroupItem>
                                    <h6 className="pt-3 pb-2">Product Details:</h6>
                                    {/* Brand */}
                                    <Row className='pb-2'>
                                        <Col sm={6} md={4} >Brand:</Col>
                                        <Col>{product.brand}</Col>
                                    </Row>
                                     {/* Description */}
                                    <Row>
                                        <Col sm={6} md={4} >Description:</Col>
                                        <Col className="lh-base">{product.description}</Col>
                                    </Row>
                                </ListGroupItem>
                            </ListGroup>
                        </Col>
                        <Col >
                            <ListGroup >
                                {/*Price*/}
                                <ListGroupItem>
                                    <Row>
                                        <Col sm={6} md={4}>Price:</Col>
                                        <Col >RM {product.salePrice} </Col>     
                                    </Row>
                                </ListGroupItem>

                                {/*Availability Status*/}
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
                                        {/* If product is in stock */}
                                         {product.countInStock > 0 
                                            ? <Row>
                                                <Col md={4}>
                                                    <label for="quantity" class="form-label">Quantity:</label>      
                                                </Col>
                                                <Col>
                                                    {/* Quantity selector */}
                                                    <Quantity prodQuantity={updateQty} initQty={productQty}  max={product.countInStock}/>
                                                    {/*Number of items available */}
                                                    {product.countInStock <= 5 
                                                        // if less than 5 items available
                                                        ? <small className="text-danger">Hurry! Only {product.countInStock} items left</small>
                                                            // else
                                                            :<small className="text-secondary">{product.countInStock} Available</small>}       
                                                </Col>
                                            
                                                {/*Buttons */}
                                                <Col md={12} className="mt-3 mb-2">
                                                    <div className="d-grid">
                                                        <Button variant="outline-primary" type='button' onClick={addToCartHandler}>Add To Cart</Button>
                                                        
                                                        <Button className="mt-2 btn-primary" type='button'>Buy Now</Button>          
                                                    </div>
                                                </Col> 
                                            </Row>  
                                                :
                                                <Row>
                                                    <Col md={12} className="mt-3 mb-2">
                                                        <div className="d-grid">
                                                            <Button variant="outline-secondary" type='button' disabled>Out Of Stock</Button>
                                                                     
                                                        </div>
                                                    </Col>
                                                </Row>
                                        }   
                                    </ListGroupItem> 
                            </ListGroup>
                        </Col>   
                    </Row>
            </section>}
        </section>
    )
}

export default ProductScreen
