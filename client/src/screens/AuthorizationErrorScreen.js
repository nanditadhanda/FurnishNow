import React from 'react'
import { Link } from 'react-router-dom'
import Message from '../components/Message'
import { Container, Button } from 'react-bootstrap'
import {IoMdArrowBack} from 'react-icons/io'

const AuthorizationErrorScreen = () => {
    return (
        <Container className='py-5 align-center'>
            <h1 className='mb-4'>Access Denied</h1>
            <Message variant="warning">
                You are not authorized to access this page.       
            </Message>
            <Link to ="/">
                <Button variant="outline-success">
                    <IoMdArrowBack/> Go To Homepage</Button>
            </Link>
        </Container>       
    )
}

export default AuthorizationErrorScreen
