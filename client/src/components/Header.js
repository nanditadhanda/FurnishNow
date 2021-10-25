import React, {useEffect} from 'react'
import {useDispatch , useSelector} from 'react-redux'
//header component 
import { LinkContainer } from 'react-router-bootstrap'
import {Container, Navbar, Nav, NavDropdown, Badge} from 'react-bootstrap'
import Search from './Search'
import { useHistory } from 'react-router-dom'


//icons
import {MdPerson} from 'react-icons/md'
import {TiShoppingCart} from 'react-icons/ti'
import {RiShoppingBasketLine, RiMoneyDollarBoxLine} from 'react-icons/ri'
import {BiLogOutCircle, BiPackage} from 'react-icons/bi'
import {GoGraph} from 'react-icons/go'
import {FiUsers} from 'react-icons/fi'

//logout action
import {logout} from '../actions/userActions'

//category action
import {listCategories} from '../actions/categoryActions'

//header function
const Header = () => {

    const history = useHistory();

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
        history.push("/login");
    }    

    //----cart----
    const cart = useSelector(state => state.cart)
    const {cartItems} = cart 

    //categories
    const categoryList = useSelector(state => state.categoryList)
    const {loading, error, categories} = categoryList

    useEffect(()=> {
        dispatch(listCategories())
    }, [dispatch])

    

    return (

        <header className="sticky-top">
            

           
            <Navbar variant="dark" bg="dark" className="p-l-4 p-1" collapseOnSelect  expand="lg">
                <Container fluid>
                    <div className="d-flex">
                        <LinkContainer to="/">
                            <Navbar.Brand><img alt="Furnish Now" src="/logo.svg" width="150px"/></Navbar.Brand> 
                        </LinkContainer>
                       
                            
                        <LinkContainer to="/Products">
                            <NavDropdown title="Shop By Category" id="basic-nav-dropdown">
                                <LinkContainer to="/products/all">
                                    <NavDropdown.Item>All Categories</NavDropdown.Item>
                                </LinkContainer>
                                <NavDropdown.Divider />
                                {(!loading && !error) && (
                                    categories.map(category => (
                                    <LinkContainer key={category._id} to={`/products/${category.slug}`}>
                                        <NavDropdown.Item>{category.name}</NavDropdown.Item>
                                    </LinkContainer>            
                                ))
                                ) }
                                
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
                        {/*  Cart  */}
                        <LinkContainer to="/cart">
                            <Nav.Link className="cart" ><TiShoppingCart className="fs-2 pe-1 mb-1" /><Badge pill bg="primary" className={cartItems.length === 0 ? "invisible" : "visible"}>{cartItems.length}</Badge>Cart</Nav.Link>                  
                        </LinkContainer>


                        {/* if user is logged in, display user dropdown */}   
                        {userInfo ? (    
                             <NavDropdown 
                            //  if user is system admin
                                title={userInfo.isSystemAdmin ? 
                                            ("Admin: " + (userInfo.first_name + " " + userInfo.last_name)) 
                                            //  if user is store manager
                                            : userInfo.isStoreManager ? ("Store Manager: " + (userInfo.first_name + " " + userInfo.last_name)) 
                                            //if normal user
                                               : (userInfo.first_name + " " + userInfo.last_name)}  align={{ lg: 'end' }}>

                                {/* dropdown options for system admin or store manager */}
                                {(userInfo.isSystemAdmin || userInfo.isStoreManager) && (
                                    <>
                                        {userInfo.isSystemAdmin && (
                                            <LinkContainer to="/admin/userlist">
                                                <NavDropdown.Item ><FiUsers className="fs-3 pe-2 ms-1 mb-1 "/>Users</NavDropdown.Item>
                                            </LinkContainer>
                                        )}
                                        <LinkContainer to="/admin/productlist">
                                            <NavDropdown.Item ><BiPackage className="fs-2 pe-2 mb-1 "/>Products</NavDropdown.Item>
                                        </LinkContainer>
                                        <LinkContainer to="/admin/orderlist">
                                            <NavDropdown.Item ><RiMoneyDollarBoxLine className=" fs-2 pe-2 mb-1 "/>Orders</NavDropdown.Item>
                                        </LinkContainer>
                                        <LinkContainer to="/admin/reports">
                                            <NavDropdown.Item ><GoGraph className=" fs-3 pe-2 ms-1 mb-1 "/>Reports</NavDropdown.Item>
                                        </LinkContainer>
                                        <NavDropdown.Divider />
                                    </>
                                    
                                )}
                                <LinkContainer to="/profile">
                                    <NavDropdown.Item ><MdPerson className="fs-2 pe-2 mb-1 "/>My Profile</NavDropdown.Item>
                                </LinkContainer>
                                <LinkContainer to="/my-orders">
                                    <NavDropdown.Item ><RiShoppingBasketLine className="fs-2 pe-2 mb-1 "/>My Orders</NavDropdown.Item>
                                </LinkContainer>
                                <NavDropdown.Divider />
                                <NavDropdown.Item onClick={logoutHandler}><BiLogOutCircle className="fs-2 pe-2 mb-1 "/>Logout</NavDropdown.Item>
                             </NavDropdown>
                        )
                        : 
                        (<LinkContainer to="/login">
                            <Nav.Link ><MdPerson className="fs-2 pe-1 mb-1"/>Account</Nav.Link>
                        </LinkContainer>)
                    }

                     
                    </Nav>
                    </Navbar.Collapse>
                </div>
                
                </Container>
            </Navbar>
            
        </header>
    )
}

export default Header
