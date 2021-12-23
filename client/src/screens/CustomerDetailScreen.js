import React, {useEffect, useState} from 'react'

import { Link } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'

//import actions
import {getUserDetails, updateUser } from '../actions/userActions'
import { listOrders  } from '../actions/orderActions'

//UI components
import SideBar from '../components/SideBar'
import Message from '../components/Message'
import Loader from '../components/Loader'
import OrderCard from '../components/OrderCard'
import Paginate from '../components/Paginate'

import { Row, Col, Container, Card, Breadcrumb, Button} from 'react-bootstrap'

//icons
import { IoArrowBack } from 'react-icons/io5'

const CustomerDetailScreen = ({history,match}) => {
    const [path, setPath] = useState('')
    const [pageLoad, setPageLoad] = useState(true)

    //define necessary hooks
    const dispatch = useDispatch()

    //get customer ID
    const id = match.params.id

    //---------access control check--------------//

    // 1. select userLogin state to check if user is logged in
    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    //to check when user account is updated
    const userUpdateAccount = useSelector(state => state.userUpdateAccount)
    const {error: updateError, success:updateSuccess} = userUpdateAccount

    //2. access control effect function
    useEffect(() => {    
        if(userInfo && (userInfo.isSystemAdmin || userInfo.isStoreManager)){ 
            //get customer details
            dispatch(getUserDetails(id))
            setPageLoad(false)
            
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

    },[dispatch, history, userInfo,  id, updateSuccess])

    const userDetails = useSelector(state => state.userDetails)
    const {user, loading: userLoading, error: userError} = userDetails

    //---- get order list ----//

    const orderList = useSelector(state => state.orderList)
    const {orders, loading: orderLoading, error: orderError, page, pages} = orderList

    let paginate = history.location.search
    let ordering = '-_id'
    let results = 5
    useEffect(() => {
        if(user && user._id){
            dispatch(listOrders(paginate, ordering, results, id))
        }
    },[dispatch, user, id, paginate, ordering, results])


    //---Toggle User Active Status--//
    
    const [is_active, setIsActive] = useState('')

    useEffect(() => {
        if(user && user._id){
            setIsActive(user.is_active)
        }
    }, [user, dispatch, is_active])
  
    const toggleStatus = () => {     
        if(window.confirm(`Are you sure you would like to ${is_active ? "DISABLE" : "ENABLE"} this customer account?`)){
            dispatch(updateUser({
                _id:user._id, 
                is_active : !is_active
            }))
        }
    }

    return (
        <Row className='w-100'>
            <SideBar activeTab="user" />
            <Col>
                <main>
                    <Container className='py-5'>
                        {pageLoad || userLoading ? <Loader />
                            : (userError || ( user.isStoreManager || user.isSystemAdmin)) ? 
                                <>
                                    <Link to={userInfo.isStoreManager ? "/store-manager/customers" 
                                            : userInfo.isSystemAdmin ? "/admin/userlist"
                                            :  "/"}>
                                        <Button variant="outline-secondary" className='mb-4'><IoArrowBack /> Back</Button>
                                    </Link>
                                    <Message variant="danger">
                                        {userError ? userError : "No active customer account found with given user ID"}
                                    </Message>   
                                </>
                            : 
                            <>
                                {/* Navigation breadcrumb   */}
                                <Row>
                                    <Col>
                                        <Breadcrumb>
                                            <Breadcrumb.Item>
                                                <Link to={`${path}/dashbaord`}>Dashboard</Link>
                                            </Breadcrumb.Item>
                                            <Breadcrumb.Item>
                                                {userInfo.isSystemAdmin ?
                                                    <Link to={`/admin/userlist`}>Users</Link>
                                                :   <Link to={`/store-manager/customers`}>Customers</Link>
                                                }       
                                            </Breadcrumb.Item>
                                            <Breadcrumb.Item active>
                                                {user.first_name} {user.last_name}
                                            </Breadcrumb.Item>
                                        </Breadcrumb>
                                    </Col>
                                </Row>
                                {/* Toggle Active Status */}
                                {updateSuccess && 
                                    <Message variant="success">
                                      Customer account has been successfully {user.is_active ? "Enabled" : "Disabled"}  
                                    </Message>   
                                }
                                {updateError && <Message variant="danger"> Error: {updateError} </Message>}
                                <Row>
                                    <Col md='4' xs="12" >
                                        {/* customer information */}
                                        <Card className="bg-light border-0 p-4 position-sticky"  style={{ top: "80px" }}>
                                            <Row>
                                                <Col xs="4" className='my-1'><h6>User ID: </h6></Col>
                                                <Col>{user._id}</Col>
                                            </Row>
                                            <Row>
                                                <Col xs="4" className='my-1'><h6>Name: </h6></Col>
                                                <Col>{user.first_name} {user.last_name}</Col>
                                            </Row>
                                            <Row>
                                                <Col xs="4" className='my-1'><h6>Email: </h6></Col>
                                                <Col>{user.email}</Col>
                                            </Row>
                                            <Row>
                                                <Col xs="4" className='my-1'><h6>Phone: </h6></Col>
                                                <Col>{user.phone_number !== '' ? user.phone_number :  <span className="text-center">&#8212;</span>}</Col>
                                            </Row>
                                            <Row >
                                                <Col xs="4" className='my-1'><h6>Status: </h6></Col>
                                                <Col className={is_active ? "text-success" : "text-danger"}>{user.is_active? "Active" : "Disabled"}</Col>
                                            </Row>
                                            {userInfo && userInfo.isSystemAdmin && (
                                                <Row>
                                                    <Col>
                                                        <div className='d-flex'>
                                                            <Button onClick={toggleStatus} variant={is_active ? 'danger' : 'success'}
                                                            className="w-100 my-2">
                                                                {is_active ? "Disable Account" : "Enable Account"}
                                                            </Button>                                                      
                                                        </div>
                                                    </Col>
                                                </Row>
                                            )} 
                                        </Card>
                                    </Col>
                                    <Col xs='12' md='8'>
                                        <Card className="p-4">
                                             <h4 className="pb-2">Customer Orders</h4>
                                                {orderLoading? (
                                                    <Loader />
                                                ) : orderError ? (
                                                    <Message variant="danger">Error: {orderError}</Message>
                                                ) : orders.length < 1 ? (
                                                    <Message variant="warning">This customer has not placed any orders</Message>
                                                ) : (                                                
                                                    orders.map(order => (
                                                        <OrderCard order={order}  key={order._id}/>                 
                                                    ))
                                                )}

                                                <Paginate path={`${path}/customer/${user._id}`} page={page} pages={pages} />
                                        </Card>
                                    </Col>
                                </Row>
                            
                            </>
                        }


                    </Container>
                </main>
            </Col>
            
        </Row>
    )
}

export default CustomerDetailScreen
