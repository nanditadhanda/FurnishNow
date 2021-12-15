import React, {useEffect} from 'react'

//Redux imports
import { useDispatch, useSelector } from 'react-redux'
//Import userList action
import { listUsers } from '../actions/userActions'

//UI components
import {Container, Tabs, Tab, Row, Col, Button} from 'react-bootstrap'
import {IoMdPersonAdd} from 'react-icons/io'


import SideBar from '../components/SideBar'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Users from '../components/Users'

const UserListScreen = ({history}) => {
    //set dispatch
    const dispatch = useDispatch()

    //select usersList state
    const usersList = useSelector(state => state.usersList)
    //destructure state
    const {loading, error, users} = usersList


    //select userLogin state to check if user is logged in
    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    //select userDelete state to check if user is logged in
    const userDeleteAccount = useSelector(state => state.userDeleteAccount)
    const {success: deleteSuccess} = userDeleteAccount

    useEffect(() => {    
        if(userInfo && userInfo.isSystemAdmin){
            dispatch(listUsers())
        }
        else{
            history.push("/login")
        }     
    },[dispatch, history, userInfo, deleteSuccess])


    //create user
    // const createUserHandler = () => {
    //     console.log("create user")
    // }

    return (
        <Row className="w-100">
            <SideBar activeTab="user"/>
            <Col>
                <main>
                    <Container className="py-5">
                        <h1>Users</h1>
                        { /*show loader if loading */
                        loading ? <Loader />
                            /*else if an error occured, display error message */
                            : error ? <Message variant="danger">{error}</Message>
                            /*else show page content */
                            : ( 
                                <Tabs defaultActiveKey="staff"  className="my-4">
                                    <Tab eventKey="staff" title="Staff">
                                        
                                        <div className="d-flex justify-content-between my-5">   
                                            <h4 className=''>Staff Accounts</h4>
                                            <Button variant="outline-success">
                                                <IoMdPersonAdd className="me-2 mb-1 fs-5"/>Add Staff User 
                                            </Button>                              
                                        </div>
                                        
                                        <Users type="staff" users={users}/>
                                    </Tab>
                                    <Tab eventKey="customers" title="Customers">
                                        
                                        <h4 className='my-5 pb-3'>Customer Accounts</h4>
                                        <Users type="customers" users={users}/>
                                    </Tab>

                                </Tabs>
                                
                            )} 
                    </Container>

                </main>
                
            
            </Col>
        </Row>
    )
}

export default UserListScreen
