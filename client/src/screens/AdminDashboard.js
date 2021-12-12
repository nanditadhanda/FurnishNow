import React from 'react'

import SideBar from '../components/SideBar'

import {Row, Col, Container} from 'react-bootstrap'

const AdminDashboard = () => {
    return (
        
        <Row >
            <SideBar activeTab="dashboard" />
            <Col>
                <main>

                </main>
            </Col> 
        </Row>                   
        
    )
}

export default AdminDashboard
