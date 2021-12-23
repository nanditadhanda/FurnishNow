import React, {useState, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'

import SideBar from '../components/SideBar'
import DateNow from '../components/DateNow'

import {Row, Col, Container, Card} from 'react-bootstrap'

//icons
import { RiMoneyDollarBoxLine, RiStore3Fill} from 'react-icons/ri'
import {GoGraph} from 'react-icons/go'
import {FiUsers} from 'react-icons/fi'

const DashboardScreen = ({history}) => {
    const dispatch = useDispatch()
    const [path, setPath] = useState('')


     // 1. select userLogin state to check if user is logged in
    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    //2. access control effect function
    useEffect(() => {    
        if(userInfo && (userInfo.isSystemAdmin || userInfo.isStoreManager)){           
            if(userInfo.isSystemAdmin){
                setPath('/admin')
            }
            else{
                setPath('/store-manager')
            }
        }
        else{
            history.push("/accessdenied")
        }  
    },[dispatch, history, userInfo])

   
    return (
        
        <Row className="w-100">
            <SideBar activeTab="dashboard" />
            <Col>
                <main>
                    <Container className="py-5">
                        <Row className="mb-3 d-flex">
                            <Col sm={6}>
                                <h4>
                                    Hi {userInfo && <>{userInfo.first_name}&nbsp;{userInfo.last_name} </>}!
                                </h4>
                                <p>Role: {userInfo && userInfo.isSystemAdmin ? "System Admin" : "Store Manager"}</p>
                            </Col>
                            <Col sm={6} className='d-flex justify-content-sm-end'>
                                <h6><DateNow/></h6>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={6} className="my-3 d-flex">
                                <LinkContainer to={`${path}${userInfo.isSystemAdmin ? "/userlist" : "/customers"}`}>
                                    <Card className="hover w-100">
                                        <Card.Body className="text-center bg-light p-4">
                                            <FiUsers className="display-2 mb-2 text-success"/>
                                            <h4>{userInfo.isSystemAdmin ? "Manage Users" : "View Customers"}</h4>
                                        </Card.Body>
                                    </Card>
                                </LinkContainer>                                
                            </Col>
                            <Col sm={6} className="my-3 d-flex">
                                <LinkContainer to={`${path}/manageCatalog`}>
                                    <Card className="hover w-100">
                                        <Card.Body className="text-center bg-light p-4">
                                            <RiStore3Fill className="display-2 mb-2 text-primary"/>
                                            <h4>Manage Catalog</h4>
                                        </Card.Body>
                                    </Card>
                                </LinkContainer>                                
                            </Col>
                            <Col sm={6} className="my-3 d-flex">
                                <LinkContainer to={`${path}/orderlist`}>
                                    <Card className="hover w-100">
                                        <Card.Body className="text-center bg-light p-4 ">
                                            <RiMoneyDollarBoxLine className="display-2 mb-2 text-danger"/>
                                            <h4>Manage Orders</h4>
                                        </Card.Body>
                                    </Card>
                                </LinkContainer>                                
                            </Col>
                            <Col sm={6} className="my-3 d-flex">
                                <LinkContainer to={`${path}/report`}>
                                    <Card className="hover w-100 d-flex align-items-center bg-light"> 
                                        <Card.Body className="text-center  p-4 ">
                                            <GoGraph className="display-2 mb-2 text-info"/>
                                            <h4>Reports</h4>
                                        </Card.Body>
                                    </Card>
                                </LinkContainer>                                
                            </Col>
                        </Row>
                    </Container>
                </main>
            </Col> 
        </Row>                          
    )
}

export default DashboardScreen
