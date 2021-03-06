import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Container,Row, Col, Breadcrumb, Image, ListGroup, Button, ListGroupItem } from 'react-bootstrap'

//Custom components
import Quantity from '../components/Quantity'
import AddToCart from '../components/AddToCart'
import Rating from '../components/Rating'
import Loader from '../components/Loader'
import Message from '../components/Message'
import AR from '../components/AR'
import ModelViewer from '../components/ModelViewer'
// import products from '../products'


//import redux components
import { useDispatch, useSelector } from 'react-redux'

//import actions
import { listProductDetails } from '../actions/productActions'
import { addToCart } from '../actions/cartActions'
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants'
import { LinkContainer } from 'react-router-bootstrap'


//Product screen function
const ProductScreen = ({ match, history }) => {

    /*-------- logged in user info ----------*/

    //userLogin state
    const userLogin = useSelector(state => state.userLogin)
    //destructure state
    const { userInfo } = userLogin



    /*-------retrieve product data--------- */
    //product ID
    const productID = match.params.id

    const dispatch = useDispatch()

    //useSelector allows us to fire off certain parts of states
    const productDetails = useSelector(state => state.productDetails)

    //destructure the state
    const { error, loading, product } = productDetails

    //retrieve productCreateReview state
    const productCreateReview = useSelector(state => state.productCreateReview)
    // //destructure state
    const { success: successProductReview } = productCreateReview

    //useEffect is triggered when component loads
    useEffect(() => {
        dispatch({ type: PRODUCT_CREATE_REVIEW_RESET })
        //fire off listProductDetails() action        
        dispatch(listProductDetails(productID))
    }, [dispatch, match, productID, successProductReview])

    /*------quantity update ---------- */
    //React Hook for product quantity


    const [qty, setQuantity] = useState(0)

    /*------Add To Cart ---------- */
    //message
    const [show, setShow] = useState(false)

    const [status, setStatus] = useState(false)

    const [qtyError, setQtyError] = useState(false)
    const [buyNowError, setBuyNowError] = useState(false)

    const updateQty = (qtyInput) => {
        setQuantity(qtyInput.qty)
    }

    const updateMsg = ({ show, error }) => {
        setShow(show)
        setQtyError(error)
    }

    const buyNowHandler = () => {
        if (qty > 0) {
            dispatch(addToCart(productID, qty))
            setStatus(true)
            setQtyError(false)
        }
        else {
            setBuyNowError(true)
        }
    }

    useEffect(()=>{
        if (status) {
            history.push("/cart")
            setStatus(false)
            setQtyError(false)
            setBuyNowError(false)
        }

        if(show){
            setQtyError(false)
            setBuyNowError(false)            
        }

    },[status, history, show])

    




    // const product = products.find((p) => p._id === match.params.id)
    return (
        <Container className="py-5" style={{ position: "relative" }}>
            {show &&
                <Message variant="success" >
                    Product has been added to your shopping cart
                </Message>
            }

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
                    : <>
                        <section>

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
                            <Row className="position-relative">
                                {/* Product image */}
                                <Col sm={12} md={6} xl={5} className="md-sticky-top">
                                    <Image src={product.image} alt={product.name} fluid />
                                </Col>
                                {/* Product Information */}
                                <Col sm={12} md={6} xl={4}>
                                    <ListGroup variant="flush">
                                        <ListGroup.Item>
                                            {/* Name */}
                                            <h3 className="">{product.name}</h3>
                                            {/* Rating */}
                                            <Rating value={product.rating} color='text-primary' text={`${product.numReviews} reviews`} />
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
                                        {/* AR and Model Viewer Buttons */}
                                        <ListGroupItem>
                                                <div className="d-flex flex-wrap">
                                                    <ModelViewer model3D={product.model3D} product={product} max={product.countInStock} /> 
                                                    <AR model3D={product.model3D} productID={productID} max={product.countInStock} />
                                                </div>
                                            
                                        </ListGroupItem>
                                    </ListGroup>
                                </Col>
                                <Col >
                                    <ListGroup className="position-sticky" style={{ top: "80px" }}>
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
                                                    {product.countInStock > 0
                                                        ? <span className="text-success">In Stock</span>
                                                        : <span className="text-danger">Out of Stock</span>
                                                    }
                                                </Col>
                                            </Row>
                                        </ListGroupItem>
                                        <ListGroupItem>
                                            {/* If product is in stock */}
                                            {product.countInStock > 0
                                                && <Row>
                                                        <Col xs={12}>
                                                            {(qtyError || buyNowError) &&
                                                                <Message variant="danger">Error: Select Quantity</Message>}
                                                            {/* Quantity selector */}</Col>
                                                        <Col md={4}>
                                                            <label for="quantity" class="form-label">Quantity:</label>
                                                        </Col>
                                                        <Col md={8}>
                                                            {/* If user is logged in and user is staff member */}
                                                            {userInfo && (userInfo.isSystemAdmin || userInfo.isStoreManager) ?
                                                                (<span className={`${product.countInStock > 5 ? "text-success" : "text-danger" }`  }>{product.countInStock}</span>)
                                                                :
                                                                (<>
                                                                    <Quantity prodQuantity={updateQty} initQty={0} max={product.countInStock} productID={productID} />
                                                                    {/*Number of items available */}
                                                                    {product.countInStock <= 5
                                                                    // if less than 5 items available
                                                                    ? <small className="text-danger">Hurry! Only {product.countInStock} items left</small>
                                                                    // else
                                                                    : <small className="text-secondary">{product.countInStock} Available</small>}

                                                                </>)
                                                            }                                   
                                                        </Col>
                                                    </Row>
                                                }

                                                {/*Buttons */}

                                                <Row>
                                                    <Col md={12} className="mt-3 mb-2">
                                                          {/* if not logged in OR logged in and user is not system admin  */}
                                                        {(!userInfo || ( userInfo && !userInfo.isSystemAdmin)) && (
                                                            /* If user is logged in and user is staff member */
                                                            (userInfo && userInfo.isStoreManager) ?
                                                                (<LinkContainer to={`/store-manager/product/${productID}/edit`}>
                                                                    <div className="d-grid">
                                                                    <Button className=" btn-primary" type='button'>Update Product</Button>
                                                                    </div>
                                                                </LinkContainer>)
                                                            /* If not logged in or if user is customer */
                                                            :  (product.countInStock > 0 ?
                                                                (<div className="d-grid"> 
                                                                    <AddToCart productID={productID} qty={qty} msgShow={updateMsg}/>
                                                                    <Button className="mt-2 btn-primary" type='button' onClick={buyNowHandler}>Buy Now</Button>
                                                                
                                                                </div>)
                                                                :
                                                                <div className="d-grid">
                                                                    <Button variant="outline-secondary" type='button' disabled>Out Of Stock</Button>
                                                                </div>)

                                                        )}                                                       
                                                    </Col>

                                                </Row>
                                            
                                        </ListGroupItem>
                                    </ListGroup>
                                </Col>
                            </Row>
                        </section>
                        {/* Review section */}
                        <section>
                            <hr class="bg-secondary border-1 border-top border-secondary" />
                            <Row className="py-2">
                                <Col sm={12} xl={5}>
                                    <h4 className="text-uppercase my-3">Product Reviews</h4>
                                    {/* If no reviews are present, display message */}
                                    {product.reviews.length === 0 &&
                                        <Message variant="secondary">
                                            This product does not have any reviews
                                        </Message>}
                                    <ListGroup variant="flush">
                                        <ListGroup.Item className="px-0 ">
                                            {!userInfo  &&
                                                <Message variant="secondary">
                                                    Please <Link to="/login">Login</Link> to leave a review
                                                </Message>
                                            }
                                        </ListGroup.Item>
                                        {product.reviews.map((review) => (

                                            <ListGroup.Item key={review._id} className="px-0">
                                                <Row>
                                                    <Col>
                                                        <Rating value={review.rating} color="text-primary" />
                                                        <small>{review.first_name + " " + review.last_name}</small>
                                                    </Col>
                                                    <Col sm={4} className="text-right"><small >{(review.reviewDate).substring(0, 10) + " " + (review.reviewDate).substring(11, 16)}</small></Col>
                                                </Row>
                                                <Row>
                                                    <Col className="my-1">
                                                        <strong >{review.title}</strong> <br />
                                                        <p className="my-1">{review.comment}</p>
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>
                                        ))}
                                    </ListGroup>

                                </Col>
                            </Row>

                        </section>
                    </>
            }
        </Container>
    )
}

export default ProductScreen
