import React, {useEffect, useState} from 'react'
import {useDispatch , useSelector} from 'react-redux'
//header component 
import { LinkContainer } from 'react-router-bootstrap'
import {Container, Navbar, Nav, NavDropdown, Badge, Button, Offcanvas , ListGroup, Image, Row, Col} from 'react-bootstrap'
import Search from './Search'
import { Link } from 'react-router-dom'

//icons
import {MdPerson} from 'react-icons/md'
import {TiShoppingCart} from 'react-icons/ti'

import axios from 'axios'

//header function
const Header = () => {

    //cart
    const cart = useSelector(state => state.cart)
    const {cartItems} = cart 

    //categories
    const [categories, setCategories] = useState([])

    useEffect(()=> {
        async function fetchCategories(){
            const {data} = await axios.get('/api/categories/')
            setCategories(data)
        }   
        fetchCategories()
    }, [])

    //cart overlay
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


    return (

        <header className="sticky-top">
            

            <Offcanvas show={show} placement="start" backdrop={false} scroll={true} name="Disable backdrop" onHide={handleClose} >
                <Offcanvas.Header closeButton>
                
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <ListGroup variant="flush">
                        {cartItems.map(item=> (
                            <ListGroup.Item key={item.id}>
                                <Row>
                                    <Col md={3}><Image src={item.image} fluid rounded/></Col>
                                    <Col> {item.name}</Col>
                                    <Col md={3} className="text-success">RM{item.price}</Col>

                                </Row>
                                
                                
                               </ListGroup.Item>
                        ))}
                        
                    </ListGroup >
                    <div className="offcanvas-footer">
                        <Link to="/cart" closeButton>
                            <Button >Go To Cart</Button>
                        </Link>
                    </div>

                </Offcanvas.Body>
                
            </Offcanvas>
            
            <Navbar variant="dark" bg="dark" className="p-l-4 p-1" collapseOnSelect  expand="lg">
                <Container fluid>
                    <div className="d-flex">
                        <LinkContainer to="/">
                            <Navbar.Brand><img alt="Furnish Now" src="/logo.svg" width="150px"/></Navbar.Brand> 
                        </LinkContainer>
                        <LinkContainer to="/Products">
                            <NavDropdown title="Products" id="basic-nav-dropdown">
                                <LinkContainer to="/products">
                                    <NavDropdown.Item>All Products</NavDropdown.Item>
                                </LinkContainer>
                                <NavDropdown.Divider />
                                {categories.map(category => (
                                    <LinkContainer key={category._id} to={`/products/${category.slug}`}>
                                        <NavDropdown.Item>{category.name}</NavDropdown.Item>
                                    </LinkContainer>
                                    
                                ))}
                                </NavDropdown>      

                        </LinkContainer>
                            
                    </div>
                <Search />
                
                <div className="d-flex">
                    <Navbar.Collapse id="navbarScroll" >
                    <Nav
                    className="mr-auto my-2 mt-1 my-lg-0 right"
                    style={{ maxHeight: '100px' }}
                    navbarScroll
                    >
                        <LinkContainer to="/cart">
                            <Nav.Link className="cart" onMouseOver={handleShow} ><TiShoppingCart className="fs-2 pe-1 mb-1" /><Badge pill bg="primary" className={cartItems.length === 0 ? "invisible" : "visible"}>{cartItems.length}</Badge>Cart</Nav.Link>  
                            {/*                 */}
                        </LinkContainer>
                        <LinkContainer to="/login">
                            <Nav.Link ><MdPerson className="fs-2 pe-1 mb-1"/>Account</Nav.Link>
                        </LinkContainer>
                                   
                    </Nav>
                    </Navbar.Collapse>
                </div>
                
                </Container>
            </Navbar>
            
        </header>
    )
}

export default Header
