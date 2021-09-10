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
import {RiShoppingBasketLine} from 'react-icons/ri'
import {BiLogOutCircle} from 'react-icons/bi'

//axios
import axios from 'axios'

//logout action
import {logout} from '../actions/userActions'

//header function
const Header = () => {

//----logged in user----
    //select state
    const userLogin = useSelector(state => state.userLogin)
    //destructure state
    const { userInfo } = userLogin

//-----logout user -----
    //create dispatch
    const dispatch = useDispatch()

    //logout handler function
    const logoutHandler = () => {
        dispatch(logout())
    }
    

    //----cart----
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

    

    return (

        <header className="sticky-top">
            

           
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
                       

                        {userInfo ? (
                            
                             <NavDropdown title={userInfo.first_name + " " + userInfo.last_name}  align={{ lg: 'end' }}>
                                <LinkContainer to="/profile">
                                    <NavDropdown.Item ><MdPerson className="fs-2 pe-2 mb-1 "/>Profile</NavDropdown.Item>
                                </LinkContainer>
                                <LinkContainer to="/orders">
                                    <NavDropdown.Item ><RiShoppingBasketLine className="fs-2 pe-2 mb-1 "/>My Orders</NavDropdown.Item>
                                </LinkContainer>
                                <NavDropdown.Item onClick={logoutHandler}><BiLogOutCircle className="fs-2 pe-2 mb-1 "/>Logout</NavDropdown.Item>
                             </NavDropdown>
                        )
                        : 
                        (<LinkContainer to="/login">
                            <Nav.Link ><MdPerson className="fs-2 pe-1 mb-1"/>Account</Nav.Link>
                        </LinkContainer>)
                    }
                     {/*  Cart  */}
                        <LinkContainer to="/cart">
                            <Nav.Link className="cart" ><TiShoppingCart className="fs-2 pe-1 mb-1" /><Badge pill bg="primary" className={cartItems.length === 0 ? "invisible" : "visible"}>{cartItems.length}</Badge>Cart</Nav.Link>  
                            
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
