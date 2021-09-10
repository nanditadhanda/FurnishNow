import React, {useState, useEffect} from 'react'

//Routing
import { Link } from 'react-router-dom'

//Redux imports
import { useDispatch, useSelector } from 'react-redux'
//Import login action
import { register } from '../actions/userActions'

//UI components
import {Form, Row, Col, Button} from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'


const RegisterScreen = ({location, history}) => {
    //set default local states
    const [first_name, setFirstName] = useState('')
    const [last_name, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')

    //define dispatch
    const dispatch = useDispatch()

     //check previous location of app URL
    const redirect = location.search ? location.search.split('=')[1] : '/'

    //register user state
    const userRegister = useSelector(state => state.userRegister)

    //destructure the state
    const {error, loading, userInfo} = userRegister

    //check if user is already logged in
    useEffect(() => {
        //if user info is found, redirect to previous location
        if(userInfo){
            history.push(redirect)
        }
    }, [history, userInfo, redirect])

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
             dispatch(register(first_name, last_name, email, password))

            
        }   
    }


    return (
        <FormContainer title="Register" lg="7" >
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
                    <Button type="submit" variant="primary" className="my-3">Register</Button>
                </div>  
            </Form>
            <Row>
                <Col>
                    <p>Already have an account?&nbsp; 
                        <Link to={redirect ? `/login?redirect=${redirect}` : '/redirect'}>
                        Sign In</Link>
                    </p>
                </Col>
            </Row>
        </FormContainer>
    )
}

export default RegisterScreen

