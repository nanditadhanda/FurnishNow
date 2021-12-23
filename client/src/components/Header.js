import React, {useEffect, useState} from 'react'
import {useDispatch , useSelector} from 'react-redux'
import { useHistory } from 'react-router-dom'
//header component 
import { LinkContainer } from 'react-router-bootstrap'
import {Container, Navbar, Nav, NavDropdown, Badge} from 'react-bootstrap'
import Search from './Search'
    
//icons
import {MdPerson, MdMenuBook} from 'react-icons/md'
import {TiShoppingCart} from 'react-icons/ti'
import {RiShoppingBasketLine, RiMoneyDollarBoxLine, RiDashboardFill, RiStore3Fill} from 'react-icons/ri'
import {BiLogOutCircle, BiLogInCircle} from 'react-icons/bi'
import {GoGraph} from 'react-icons/go'
import {FiUsers} from 'react-icons/fi'
import {FaSearch} from 'react-icons/fa'

//logout action
import {logout} from '../actions/userActions'

//category action
import {listCategories} from '../actions/categoryActions'

//header function
const Header = () => {

    const [userType, setUserType] = useState('')

    //define hooks
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

    useEffect(() => {
        if(userInfo){
            if(userInfo.isStoreManager){
               setUserType("/store-manager")
            }
            if(userInfo.isSystemAdmin){
                setUserType("/admin")
            }
        }
    }, [userInfo])
    
    //toggle search bar- mobile and tablet users
    const [showSearch, setShowSearch] = useState(false)

    const toggleSearch = () => {
        setShowSearch(!showSearch)
    }

    return (<>
        <header className="sticky-top">
            <Navbar variant="dark" bg="dark" className="p-l-4 p-1" collapseOnSelect  expand="lg">
                <Container fluid>
                    <div className="d-flex align-items-center">            
                        <LinkContainer to={!userInfo || (userInfo && !userInfo.isSystemAdmin) ? "/" : "/admin/dashboard"}>
                            <Navbar.Brand>
                                <img alt="Furnish Now" src="/logo.svg" width="150px" className="d-none d-lg-block"/>
                                <img alt="Furnish Now" src="/logo-icon.svg" width="30px" className="d-block d-lg-none p-0"/>
                            </Navbar.Brand> 
                        </LinkContainer>

                         {/* search icon - medium browsers and below */}
                        {(!userInfo || (userInfo && !userInfo.isSystemAdmin)) &&
                            <div className="d-lg-none p-0" onClick={toggleSearch}>
                                <FaSearch className="fs-4 pe-1 mb-lg-1 text-success" />
                            </div>  
                        }

                        {/* category dropdown */}
                        {(!userInfo || (userInfo && !userInfo.isSystemAdmin)) &&   
                            <LinkContainer to="/products" className="d-none d-lg-block">
                                <NavDropdown title={userInfo && userInfo.isStoreManager ? "View Catalog" : "Shop By Category"} id="basic-nav-dropdown">
                                    <LinkContainer to="/products/all">
                                        <NavDropdown.Item>All Categories</NavDropdown.Item>
                                    </LinkContainer>
                                    <NavDropdown.Divider />
                                    {(!loading && !error) && (
                                        categories.map(category => (
                                        <LinkContainer key={category.id} to={`/products/${category.slug}`}>
                                            <NavDropdown.Item>{category.name}</NavDropdown.Item>
                                        </LinkContainer>            
                                    ))
                                    ) }        
                                </NavDropdown>  
                            </LinkContainer>
                        }
                    </div>
                
                {/* Search Bar - not available for system admin */}
                {(!userInfo || (userInfo && !userInfo.isSystemAdmin)) && <div className="d-none d-lg-block"><Search title="Search Catalog" /></div>}
                
                
                <div className="d-flex">
                    <Navbar id="navbarScroll" className="p-0" >
                    <Nav
                        className="mr-auto my-0 mt-lg-1 my-lg-0 right"
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                    >
                        {(!userInfo || (userInfo && !userInfo.isSystemAdmin)) &&
                            <LinkContainer  to="/products/all" className="d-lg-none">
                                <Nav.Link >
                                    <RiStore3Fill className='fs-5 mb-1 '/>
                                </Nav.Link>
                            </LinkContainer> 
                        }

                        {/*  Cart - appear only to customer  */}
                        {(!userInfo || (userInfo && !(userInfo.isStoreManager || userInfo.isSystemAdmin))) &&
                            <LinkContainer to="/cart">
                                <Nav.Link className="cart" >
                                    <TiShoppingCart className="fs-2 fs-sm-1 pe-1 mb-1" />
                                    <Badge pill bg="primary" className={cartItems.length === 0 ? "invisible" : "visible"}>
                                        {cartItems.length}
                                    </Badge>
                                    <span className="d-none d-lg-inline">Cart</span>
                                </Nav.Link>                  
                            </LinkContainer>
                        }


                        {/* if user is logged in, display user dropdown */}   
                        {userInfo ? ( 
                            <> 
                             <NavDropdown className="accountDropdown text-white "
                                        //  if user is system admin or store manager, add designation
                                title={(( userInfo.isSystemAdmin || userInfo.isStoreManager) ?
                                            (userInfo.isSystemAdmin ? "Admin: " : "Manager: ") : "")
                                        //every user
                                        + ( userInfo.first_name + " " + userInfo.last_name)}  
                                align={{ lg: 'end' }}
                             >

                                {/* dropdown options for system admin or store manager */}
                                {(userInfo.isSystemAdmin || userInfo.isStoreManager) && (
                                    <>
                                        <LinkContainer to={userType+"/dashboard"}>
                                            <NavDropdown.Item ><RiDashboardFill className="fs-2 pe-2 mb-1 "/>Dashboard</NavDropdown.Item>
                                        </LinkContainer>
                                        <NavDropdown.Divider />
                                       
                                        <LinkContainer to={userInfo.isSystemAdmin ? "/admin/userlist" : "/store-manager/customers"}>
                                            <NavDropdown.Item ><FiUsers className="fs-3 pe-2 ms-1 mb-1 "/>{userInfo.isSystemAdmin ? "Users" : "Customers"}</NavDropdown.Item>
                                        </LinkContainer>
                                        <LinkContainer to={userType+"/manageCatalog"}>
                                            <NavDropdown.Item ><MdMenuBook className="fs-2 pe-2 mb-1"/>Catalog</NavDropdown.Item>
                                        </LinkContainer>

                                        <LinkContainer to={userType+"/orderlist"}>
                                            <NavDropdown.Item ><RiMoneyDollarBoxLine className=" fs-2 pe-2 mb-1 "/>Orders</NavDropdown.Item>
                                        </LinkContainer>

                                        <LinkContainer to={userType+"/reports"}>
                                            <NavDropdown.Item ><GoGraph className=" fs-3 pe-2 ms-1 mb-1 "/>Reports</NavDropdown.Item>
                                        </LinkContainer>
                                        <NavDropdown.Divider />
                                    </>
                                    
                                )}
                                <LinkContainer to="/profile">
                                    <NavDropdown.Item ><MdPerson className="fs-2 pe-2 mb-1 "/>My Profile</NavDropdown.Item>
                                </LinkContainer>
                                {(userInfo && (!userInfo.isSystemAdmin && !userInfo.isStoreManager)) &&
                                    <LinkContainer to="/my-orders">
                                        <NavDropdown.Item ><RiShoppingBasketLine className="fs-2 pe-2 mb-1 "/>My Orders</NavDropdown.Item>
                                    </LinkContainer>
                                }
                                <NavDropdown.Divider />
                                <NavDropdown.Item onClick={logoutHandler}><BiLogOutCircle className="fs-2 pe-2 mb-1 "/>Logout</NavDropdown.Item>
                             </NavDropdown></>

                        )
                        : 
                        // else - user is not logged in
                        (<LinkContainer to="/login">
                            <Nav.Link >
                                <BiLogInCircle className="fs-3 pe-1 mb-1"/>
                                <span className="d-none d-lg-inline">Login</span>
                            </Nav.Link>
                        </LinkContainer>)
                    }
                     
                        </Nav>
                    </Navbar>
                </div>
                
                </Container>
            </Navbar>
             {(!userInfo || (userInfo && !userInfo.isSystemAdmin)) &&
            //  sub-header with dropdown search bar - not for system admin
            <section className={`${showSearch ? "visible" : "invisible"} search-header d-lg-none`}>
                <Container fluid className="bg-dark sub-header">
                    <Search />
                </Container>         
            </section>     
            }  
        </header>
    </>)
}

export default Header
