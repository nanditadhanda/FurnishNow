import React, {useState, useEffect} from 'react'

//Routing
import { Link } from 'react-router-dom'

//Redux imports
import { useDispatch, useSelector } from 'react-redux'
//Import login action
import { login } from '../actions/userActions'

//UI components
import {Form, Row, Col, Button} from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'

const LoginScreen = ({location, history}) => {
    //set states
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [redirect] = useState(location.search ? location.search.split('=')[1]: '/')
    const dispatch = useDispatch()

     //logged in user state
    const userLogin = useSelector(state => state.userLogin)

    //destructure the state
    const {userInfo, error, loading} = userLogin

    //check if user is already logged in
    useEffect(() => {    
        //if user info is found, redirect to dashboard or redirect location
        if(userInfo){
            if(userInfo && userInfo.isStoreManager){
                history.push('store-manager/dashboard')                   
            }
            else if(userInfo && userInfo.isSystemAdmin){
                history.push('admin/dashboard')            
            }
            else{
                history.push(redirect) 
            }
        }      
 
    }, [history, userInfo, redirect])



    //submit login function
    const submitHandler = (e) => {
        //prevent refresh or redirect to another page
        e.preventDefault()

        //dispatch login info
        dispatch(login(email, password))

    }

    return (
        <FormContainer title="Sign In" lg="5" shadow="shadow">
            {loading && <Loader />}
            {error && <Message variant="danger" dismissable="true" show={error ? true : false}>Error: {error}</Message>}
                <Form onSubmit={submitHandler}>

                    {/* Email Field */}
                    <Form.Group controlId="email">
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control 
                            type="email" 
                            value={email} onChange={(e) => setEmail(e.target.value)}/>
                    </Form.Group>

                    {/* Password Field */}
                    <Form.Group controlId="password" className="py-3">
                        <Form.Label>Password</Form.Label>
                        <Form.Control 
                            type="password" 
                            value={password} onChange={(e) => setPassword(e.target.value)}/>
                    </Form.Group>

                    {/* Submit Button */}
                    <div className="d-grid">
                        <Button type="submit" variant="primary" className="my-3">Sign In</Button>
                    </div>   
                </Form>
                <Row>
                    <Col>
                        <p>New to Furnish Now?&nbsp; 
                            <Link to={redirect ? `/register?redirect=${redirect}` : '/redirect'}>
                            Create an Account</Link>
                        </p>
                    </Col>
                </Row>
        </FormContainer>
     
    )
}

export default LoginScreen



