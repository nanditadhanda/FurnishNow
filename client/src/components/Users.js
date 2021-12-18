import React, {useState, useEffect} from 'react'

//Routing
import { LinkContainer } from 'react-router-bootstrap'

//Redux imports
import { useDispatch , useSelector} from 'react-redux'
//Import userList action
import { deleteUser, updateUser } from '../actions/userActions'

import { USER_UPDATE_RESET } from '../constants/userConstants'

//UI components
import {Table, Button, Form} from 'react-bootstrap'
import {RiCheckFill, RiCloseFill} from 'react-icons/ri'
import { IoTrashSharp } from 'react-icons/io5'
import {MdEdit} from 'react-icons/md'

const Users = ({type, users, activeStatus}) => {

    const [updated, setUpdated] = useState(false)


    //set dispatch
    const dispatch = useDispatch()

    //get userInfo state
    const userLogin = useSelector(state => state.userLogin)
    const {userInfo}  = userLogin

    //delete user
    const deleteHandler = (id) => {
        if(window.confirm("Are you sure you would like to delete this user?")){
            dispatch(deleteUser(id))
        }
        
    }

    //get userUpdateAccount state
    const userUpdateAccount = useSelector(state => state.userUpdateAccount)
    //destructure state
    const { error: updateError, loading:updateLoading, success:updateSuccess} = userUpdateAccount

    useEffect(() => {
        if(updateSuccess){
            dispatch({type: USER_UPDATE_RESET})    
        }
    }, [updateSuccess, dispatch])


    const disableHandler = id => e => {
        
        let newArr = [...activeStatus] // copying the old datas array
        newArr[id] = e.target.checked // replace e.target.value with whatever you want to change it to
        activeStatus = [newArr]
        setUpdated(true)
        
    }

    return (
        <Table striped bordered responsive className="table-sm">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    {type === 'staff' && (
                        <>
                            <th className="text-center">Admin</th>
                            <th className="text-center">Store Manager</th>
                        </>
                    )}
                    
                    <th className="text-center"> {type === 'staff' ? "Action" : "Active"}</th>
                </tr>                            
            </thead>
            <tbody>

                {users.map((user, index) => (
                    type === 'staff' ?

                        (user.isSystemAdmin || user.isStoreManager) &&
                        <tr key={user._id} readOnly={(userInfo._id === user._id)}>
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
                                {!(userInfo._id === user._id) &&
                                <>
                                    <LinkContainer to={`/admin/user/${user._id}/edit`}>
                                    <Button variant="outline-success"   className="btn-icon me-2"><MdEdit/></Button>
                                    </LinkContainer>
                                    
                                    <Button variant="outline-danger"  className="btn-icon" onClick={() => deleteHandler(user._id)}><IoTrashSharp /></Button>
                                </>
                                }
                            </td>             
                        </tr>

                    : (!user.isSystemAdmin && !user.isStoreManager) &&

                    

                    <tr key={user._id}>
                        <td>{user._id}</td>
                        <td>{user.first_name}</td>
                        <td>{user.last_name}</td>
                        <td>{user.email}</td>
                        <td>{user.phone_number}</td>            
                        <td className="text-center">
                            <Form.Check 
                                type="switch"
                                id="custom-switch"
                                label=""          
                                checked={activeStatus[user._id]}  
                                onChange={disableHandler(user._id)}  
                                                                    
                            />
                        </td>             
                    </tr>

                ))}
                
            </tbody>

        </Table>
    )
}

export default Users
