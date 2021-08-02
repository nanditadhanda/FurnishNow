//header component 
import { LinkContainer } from 'react-router-bootstrap'
import {Container, Navbar, Nav, NavDropdown} from 'react-bootstrap'
import Search from './Search'
import products from '../products'

//icons
import {MdPerson} from 'react-icons/md'
import {TiShoppingCart} from 'react-icons/ti'



//header function
const Header = () => {
    const categories = [];
    products.map(product => {
        if (categories.indexOf(product.category) === -1){
            categories.push(product.category)
        }
    });

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
                                    {categories.map(category => {
                                        <LinkContainer to={`/products/${category}`}>
                                            <NavDropdown.Item >{category}</NavDropdown.Item>
                                        </LinkContainer>
                                    })}
                                        
                                        
                                   
                        
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
                        <LinkContainer to="/login">
                            <Nav.Link ><MdPerson className="fs-2 pe-1 mb-1"/>Account</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/cart">
                            <Nav.Link><TiShoppingCart className="fs-2 pe-1 mb-1" />Cart</Nav.Link>                   
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
