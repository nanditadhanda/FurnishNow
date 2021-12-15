import React, {useState, useEffect} from 'react'

//Routing
import { Link } from 'react-router-dom'

//Redux imports
import { useDispatch, useSelector } from 'react-redux'
//Import user register action
import { registerStaff } from '../actions/userActions'

//Import reset constant
import { USER_STAFF_REGISTER_RESET } from '../constants/userConstants'

//UI components
import {Form, Row, Col, Button, Breadcrumb} from 'react-bootstrap'
import SideBar from '../components/SideBar'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'


const AddUserScreen = ({history}) => {

    //set default local states
    const [first_name, setFirstName] = useState('')
    const [last_name, setLastName] = useState('')
    const [email, setEmail] = useState('')    
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [phone_number, setPhone] = useState('')
    const [isSystemAdmin, setAdmin] = useState('false')
    const [isStoreManager, setStoreManager] = useState('false')
    const [role, setRole] = useState('')

    const [message, setMessage] = useState('')


    //define dispatch
    const dispatch = useDispatch()

    //select userLogin state to check if user is logged in
    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    //get userDetails state
    const userStaffRegister = useSelector(state => state.userStaffRegister)
    //destructure state
    const { error, loading, success} = userStaffRegister

    //use effect react hook
    useEffect(() => {
        //authenticate and check if user is logged in and whether they are System Admin
        if(userInfo && userInfo.isSystemAdmin){
            //if information updated, reset userUpdateAccount state and redirect to user list page
            if(success){
                dispatch({type: USER_STAFF_REGISTER_RESET})
                history.push("/admin/userlist")
            }       
        }
        //if not authorized user , redirect to login page
        else{
             history.push("/accessdenied")
        }
     
    }, [dispatch, userInfo, history, success])

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

        //validations
        if(first_name === "" || last_name === "" || email === "" || phone_number === "" || password === "" || confirmPassword === "" || role === ""){
            setMessage("Please fill out all fields")
        }
        else if (password !== confirmPassword){
            setMessage("Passwords entered do not match")
        }
        else {
            //reset error message
            setMessage("")  

            //dispatch registeration info to register action
            dispatch(
                registerStaff(
                    first_name, 
                    last_name,  
                    email, 
                    phone_number,
                    password, 
                    isSystemAdmin,
                    isStoreManager,                 
                )
            )

                      
        } 
        
    }
    // displayed to user
    return (

        <Row className="w-100">
            <SideBar activeTab="dashboard" />
            <Col>
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
                                Register Staff
                            </Breadcrumb.Item>
                        </Breadcrumb>
                    </Col>
                </Row>
                
                <FormContainer title="Register Staff User" lg="7"  shadow="shadow-sm">

                    {/* Error */}
                    {message && <Message variant="danger" dismissable="true" show={message ? true : false}>Error: {message}</Message>}

                    {error && <Message variant="danger" dismissable="true" show={error ? true : false}>Error: {error}</Message>}

                    {/* if loading*/}
                    {loading ? <Loader />
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
                                                type="text" 
                                                value={first_name} onChange={(e) => setFirstName(e.target.value)}/>
                                        </Form.Group>
                                    </Col>
                                    <Col md="6" xs="12">
                                        {/* Last Name Field */}
                                        <Form.Group controlId="last_name" className="pb-2">
                                            <Form.Label>Last Name</Form.Label>
                                            <Form.Control 
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
                                                type="text" 
                                                value={phone_number} onChange={(e) => setPhone(e.target.value)}/>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs="12" md="6">
                                        {/* Password Field */}
                                        <Form.Group controlId="password" className="py-3">
                                            <Form.Label>Password</Form.Label>
                                            <Form.Control                                 
                                                type="password" 
                                                value={password} onChange={(e) => setPassword(e.target.value)}/>
                                        </Form.Group>
                                    </Col>
                                    <Col xs="12" md="6">
                                        {/* Password Field */}
                                        <Form.Group controlId="confirmPassword" className="py-3">
                                            <Form.Label>Confirm Password</Form.Label>
                                            <Form.Control                                
                                                type="password" 
                                                value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                
                                <Row> 
                                    <Col>
                                        {/* Is Admin Checkbox Field */}
                                        <Form.Group controlId="role" className="py-3" >
                                            <Form.Label>Staff Role</Form.Label>
                                            <div className="d-flex">
                                                <Form.Check
                                                    label="System Admin" 
                                                    type="radio" 
                                                    name="role"
                                                    id="systemAdmin"
                                                    defaultChecked
                                                    checked={role==="systemAdmin"}
                                                    onChange={(e) => setRole(e.target.id)}
                                                    className="me-5"
                                                />
                                        
                                                <Form.Check
                                                    label="Store Manager" 
                                                    type="radio" 
                                                    name="role"
                                                    id="storeManager"
                                                    checked={role==="storeManager"}
                                                    onChange={(e) => setRole(e.target.id)}
                                                />
                                            </div>                                                
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <cite className="text-success py-2"><span className="fw-bold">Reminder:</span> Please take a note of password set for staff user. It is advisable for staff user to reset password upon gaining access to account</cite>
                                
                                {/* Submit Button */}
                                <div className="d-grid">
                                    <Button type="submit" variant="primary" className="my-3">Register User</Button>
                                </div>  
                            </Form>
                        )}
                </FormContainer>
            </Col>
            
        </Row>
    )
}

export default AddUserScreen
