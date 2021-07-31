//header component 

import {Container, Navbar, Nav, NavDropdown} from 'react-bootstrap'
import Search from './Search'
import {MdPerson} from 'react-icons/md'
import {TiShoppingCart} from 'react-icons/ti'
//header function
const Header = () => {
    return (
        <header >
            <Navbar variant="dark" bg="dark" className="p-l-4" collapseOnSelect  expand="lg">
                <Container fluid>
                    <div className="d-flex">
                        <Navbar.Brand>FurnishNow</Navbar.Brand> 
                        <NavDropdown title="Products" id="basic-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                        </NavDropdown>         
                    </div>
                <Search />
                
                <div className="d-flex">
                    <Navbar.Collapse id="navbarScroll" >
                    <Nav
                    className="mr-auto my-2 mt-1 my-lg-0 right"
                    style={{ maxHeight: '100px' }}
                    navbarScroll
                    >
                    <Nav.Link href="/login"><MdPerson className="fs-2 pe-1 mb-1"/>Account</Nav.Link>
                    <Nav.Link href="/cart"><TiShoppingCart className="fs-2 pe-1 mb-1" />Cart</Nav.Link>
                
                    </Nav>
                    </Navbar.Collapse>
                </div>
                
                </Container>

            </Navbar>
        </header>
    )
}

export default Header
