import React, {useState, useEffect} from 'react'

//Routing
import { LinkContainer } from 'react-router-bootstrap'

//Redux imports
import { useDispatch, useSelector } from 'react-redux'
//Import userList action
import { listUsers } from '../actions/userActions'

//UI components
import {Table, Button} from 'react-bootstrap'
import {RiCheckFill, RiCloseFill} from 'react-icons/ri'
import { IoTrashSharp } from 'react-icons/io5'
import {MdEdit} from 'react-icons/md'

import Message from '../components/Message'
import Loader from '../components/Loader'

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

    useEffect(() => {    
        if(userInfo && userInfo.isSystemAdmin){
            dispatch(listUsers())
        }
        else{
            history.push("/login")
        }     
    },[dispatch, history, userInfo])


    //delete user
    const deleteHandler = (id) => {
        console.log("delete: ", id)
    }

    return (
        <section>
            <h1>Users</h1>
            { /*show loader if loading */
            loading ? <Loader />
                /*else if an error occured, display error message */
                : error ? <Message variant="danger">{error}</Message>
                /*else show page content */
                : (
                    <Table striped bordered responsive className="table-sm">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th className="text-center">Admin</th>
                                <th className="text-center">Store Manager</th>
                                <th></th>
                            </tr>                            
                        </thead>
                        <tbody>
                            {users.map(user => (
                                <tr key={user._id}>
                                    <td>{user._id}</td>
                                    <td>{user.first_name}</td>
                                    <td>{user.last_name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.phone_number}</td>
                                    <td className="text-center">{user.isSystemAdmin ? <RiCheckFill className="text-success"/>
                                                : <RiCloseFill className="text-danger"/>}</td>
                                    <td className="text-center">{user.isStoreManager ? <RiCheckFill className="text-success"/>
                                                : <RiCloseFill className="text-danger"/>}</td>
                                    <td className="text-center">
                                        <LinkContainer to={`/admin/user/${user._id}`}>
                                            <Button variant="outline-success"  className="btn-icon me-2"><MdEdit/></Button>
                                        </LinkContainer>
                                        
                                        <Button variant="outline-danger"  className="btn-icon" onClick={deleteHandler(user._id)}><IoTrashSharp /></Button>
                                    </td>
                                        
                                </tr>
                            ))}
                            
                        </tbody>

                    </Table>
                )}
            
        </section>
    )
}

export default UserListScreen
