import React from 'react'

//UI elements
import SideBar from '../components/SideBar'

//Bootstrap imports
import { Container, Row,  Col } from 'react-bootstrap'
const StoreManagerDashboard = () => {
    return (
        <Row>
            <SideBar activeTab="dashboard" />
            <Col>
                <main>
                    
                </main>
            </Col>       
        </Row>
    )
}

export default StoreManagerDashboard
