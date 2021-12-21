import React, {useState, useEffect} from 'react'

//Routing
import { Link } from 'react-router-dom'

//Redux imports
import { useDispatch, useSelector } from 'react-redux'
//Import user details action
import { getUserDetails, updateUser } from '../actions/userActions'

//import reset constants
import { USER_UPDATE_RESET } from '../constants/userConstants'

//UI components
import {Form, Row, Col, Button, Breadcrumb} from 'react-bootstrap'
import SideBar from '../components/SideBar'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'

const EditUserScreen = ({match, history}) => {
    //get id passed in URL
    const user_id = match.params.id

    //set default local states
    const [first_name, setFirstName] = useState('')
    const [last_name, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [phone_number, setPhone] = useState('')
    const [isSystemAdmin, setAdmin] = useState('false')
    const [isStoreManager, setStoreManager] = useState('false')
    const [role, setRole] = useState('')

    //define dispatch
    const dispatch = useDispatch()

    //select userLogin state to check if user is logged in
    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    //get userDetails state
    const userDetails = useSelector(state => state.userDetails)
    //destructure state
    const { error, loading, user} = userDetails

    //get userUpdateAccount state
    const userUpdateAccount = useSelector(state => state.userUpdateAccount)
    //destructure state
    const { error: updateError, loading:updateLoading, success:updateSuccess} = userUpdateAccount

    //use effect react hook
    useEffect(() => {
        //authenticate and check if user is logged in and whether they are System Admin
        if(userInfo && userInfo.isSystemAdmin){
            //if information updated, reset userUpdateAccount state and redirect to user list page
            if(updateSuccess){
                dispatch({type: USER_UPDATE_RESET})
                history.push("/admin/userlist")
            }
            //else - information not updated
            else{
                //if no user data found in state or if user id doesn't match the id passed in, retrieve user data
                if(!user || user._id !== Number(user_id)){
                    dispatch(getUserDetails(user_id))
                    
                }
                //if user data is present in state, set values of local states
                else{
                    //reset previous update attempt
                    dispatch({type: USER_UPDATE_RESET})

                    //set local states                    
                    setFirstName(user.first_name)
                    setLastName(user.last_name)
                    setEmail(user.email)
                    setPhone(user.phone_number)
                    setAdmin(user.isSystemAdmin)
                    setStoreManager(user.isStoreManager)

                    if(user.isSystemAdmin){
                        setRole('systemAdmin')
                    } else{
                        setRole('storeManager')
                    }
                }
            }        
        }
        //if not authorized user , redirect to login page
        else{
             history.push("/accessdenied")
        }
     
    }, [dispatch, userInfo, user, user_id, history, updateSuccess])

    useEffect(()=>{
        if(role === "systemAdmin"){
            setStoreManager(false)
            setAdmin(true)
        }else{
            setStoreManager(true)
            setAdmin(false)
        }
    },[role])

    const submitHandler = (e) => {
        //prevent refresh or redirect to another page
        e.preventDefault()
        dispatch(
            updateUser({
                _id:user._id, 
                first_name, 
                last_name,  
                email, 
                phone_number, 
                isStoreManager, 
                isSystemAdmin
            })
        )
    }

    // displayed to user
    return (

        <Row className="w-100">
            <SideBar activeTab="dashboard" />
            <Col>
                {/* <Link to="/admin/userlist">
                    <Button variant="outline-secondary" className="mx-4 mt-3"><IoArrowBack /> Back</Button>
                </Link> */}
                {/* Navigation breadcrumb   */}
                    <Row className="pt-4 ms-3">
                        <Col>
                            <Breadcrumb>
                                <Breadcrumb.Item>
                                    <Link to="/admin/dashboard">Dashboard</Link>
                                </Breadcrumb.Item>
                                <Breadcrumb.Item>
                                    <Link to="/admin/userlist">Users</Link>
                                </Breadcrumb.Item>
                                <Breadcrumb.Item active>
                                    Edit Staff
                                </Breadcrumb.Item>
                            </Breadcrumb>
                        </Col>
                    </Row>
                
                <FormContainer title="Edit User" lg="7"  shadow="shadow-sm">
                    {/* If loading when updated */}
                    {updateLoading && <Loader/>}

                    {/* if any error while updating */}
                    {updateError && <Message variant="danger" dismissable="true">Error:{updateError}</Message>}

                    {/* If data is still loading (not update instance), show loader */}
                    {loading ? <Loader />
                        //if error is encountered, show error message
                        : error ? <Message variant="danger">Error: {error}</Message>
                            //if error is encountered, show error message
                            : (
                            <Form onSubmit={submitHandler}>
                                {/* User Edit Form */}
                                <Row>
                                    <Col md="6" xs="12" >
                                        {/* First Name Field */}
                                        <Form.Group controlId="first_name" className="pb-2">
                                            <Form.Label>First Name</Form.Label>
                                            <Form.Control
                                                disabled
                                                type="text" 
                                                value={first_name} onChange={(e) => setFirstName(e.target.value)}/>
                                        </Form.Group>
                                    </Col>
                                    <Col md="6" xs="12">
                                        {/* Last Name Field */}
                                        <Form.Group controlId="last_name" className="pb-2">
                                            <Form.Label>Last Name</Form.Label>
                                            <Form.Control 
                                                disabled
                                                type="text" 
                                                value={last_name} onChange={(e) => setLastName(e.target.value)}/>
                                        </Form.Group>       
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs="12" md="6">
                                        {/* Email Field */}
                                        <Form.Group controlId="email" className="py-3">
                                            <Form.Label>Email Address</Form.Label>
                                            <Form.Control 
                                                type="email" 
                                                value={email} onChange={(e) => setEmail(e.target.value)}/>
                                        </Form.Group>
                                    </Col>
                                    <Col xs="12" md="6">
                                        {/* Phone Field */}
                                        <Form.Group controlId="phone_number" className="py-3">
                                            <Form.Label>Phone Number</Form.Label>
                                            <Form.Control 
                                                disabled
                                                type="text" 
                                                value={phone_number} onChange={(e) => setPhone(e.target.value)}/>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>                                    
                                    {/* Is Admin Checkbox Field */}
                                    <Form.Group controlId="isSystemAdmin" className="py-3" >
                                        <Form.Label>Staff Role</Form.Label>
                                        <Col xs="12" md="6">
                                            <Form.Check
                                                label="System Admin" 
                                                type="radio" 
                                                name="role"
                                                id="systemAdmin"
                                                checked={role==="systemAdmin"}
                                                onChange={(e) => setRole(e.target.id)}
                                            />
                                        </Col>
                                        <Col xs="12" md="6">
                                            <Form.Check
                                                label="Store Manager" 
                                                type="radio" 
                                                name="role"
                                                id="storeManager"
                                                checked={role==="storeManager"}
                                                onChange={(e) => setRole(e.target.id)}
                                            />
                                        </Col>
                                    </Form.Group>
                                </Row>
                                
                                {/* Submit Button */}
                                <div className="d-grid">
                                    <Button type="submit" variant="primary" className="my-3">Update</Button>
                                </div>  
                            </Form>
                        )}
                </FormContainer>
            </Col>
            
        </Row>
    )
}

export default EditUserScreen
