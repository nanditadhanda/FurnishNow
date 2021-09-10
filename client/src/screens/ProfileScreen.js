import React, {useState, useEffect} from 'react'

//Routing
import { Link } from 'react-router-dom'

//Redux imports
import { useDispatch, useSelector } from 'react-redux'
//Import user details action
import { getUserDetails } from '../actions/userActions'

//UI components
import {Form, Row, Col, Button} from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'

const ProfileScreen = ({history}) => {

    //set default local states
    const [first_name, setFirstName] = useState('')
    const [last_name, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')

    //define dispatch
    const dispatch = useDispatch()

    //get userDetails state
    const userDetails = useSelector(state => state.userDetails)

    //destructure the state
    const {error, loading, user} = userDetails

    //get userLogin state to check if user is logged in
    const userLogin = useSelector(state => state.userLogin)

    //destructure the state
    const {userInfo} = userLogin

    //check if user is already logged in
    useEffect(() => {
        //if user is NOT logged in, redirect to login page
        if(!userInfo){
            history.push('/login')
        }
        else {
            if(!user || !user.first_name){
                dispatch(getUserDetails('profile'))
            }
            else{
                setFirstName(user.first_name)
                setLastName(user.last_name)
                setEmail(user.email)
            }
        }
    },
    //set dependencies
    [history, dispatch, userInfo, user])

    const submitHandler = (e) => {
        //prevent refresh or redirect to another page
        e.preventDefault()

        //validations
        if(first_name == "" || last_name == "" || email == "" || password == "" || confirmPassword == ""){
            setMessage("Please fill out all fields")
        }
        else if (password !== confirmPassword){
            setMessage("Passwords entered do not match")
        }
        else {
            //dispatch registeration info to register action
            console.log("updating")            
        }   
    }


    return (
        <FormContainer title="Profile" lg="7" >
            {loading && <Loader />}

            {/* Error */}
            {message && <Message variant="danger" dismissable="true" show={message ? true : false}>Error: {message}</Message>}

            {error && <Message variant="danger" dismissable="true" show={error ? true : false}>Error: {error}</Message>}

            {/* Registration Form */}
            <Form onSubmit={submitHandler}>
                <Row>
                    <Col md="6" xs="12" >
                        {/* First Name Field */}
                        <Form.Group controlId="first_name" className="pb-2">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control
                                required 
                                type="text" 
                                value={first_name} onChange={(e) => setFirstName(e.target.value)}/>
                        </Form.Group>
                    </Col>
                    <Col md="6" xs="12">
                        {/* Last Name Field */}
                        <Form.Group controlId="last_name" className="pb-2">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control 
                                required
                                type="text" 
                                value={last_name} onChange={(e) => setLastName(e.target.value)}/>
                        </Form.Group>       
                    </Col>
                </Row>
                <Row>
                    <Col>
                         {/* Email Field */}
                        <Form.Group controlId="email" className="py-3">
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control 
                                required
                                type="email" 
                                value={email} onChange={(e) => setEmail(e.target.value)}/>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col xs="12" md="6">
                         {/* Password Field */}
                        <Form.Group controlId="password" className="py-3">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                required 
                                type="password" 
                                value={password} onChange={(e) => setPassword(e.target.value)}/>
                        </Form.Group>
                    </Col>
                    <Col xs="12" md="6">
                         {/* Password Field */}
                        <Form.Group controlId="password" className="py-3">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control 
                                required
                                type="password" 
                                value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
                        </Form.Group>
                    </Col>
                </Row>
                
                {/* Submit Button */}
                <div className="d-grid">
                    <Button type="submit" variant="primary" className="my-3">Update</Button>
                </div>  
            </Form>
        </FormContainer>
    )
}

export default ProfileScreen
