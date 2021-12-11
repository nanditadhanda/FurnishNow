import React from 'react'

import { Col, Nav, Button, Card } from 'react-bootstrap'

const SideBar = () => {
    return (
        <Col md={3} xl={2} className="px-0 bg-light">             
                <h5 className="px-5 pt-5">Categories</h5>
                <Nav className="flex-column py-2 nav-side" variant="pills">
                    <Nav.Link href="/products/all" 
                        className="px-5 ">
                        All Categories
                    </Nav.Link>
                    
                        
                </Nav>     
        </Col>
    )
}

export default SideBar
