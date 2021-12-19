import React, {useEffect, useState} from 'react'

//Routing
import { LinkContainer } from 'react-router-bootstrap'

//redux hooks
import { useDispatch, useSelector } from 'react-redux'

//import actions
import {listCategories, deleteCategory} from '../actions/categoryActions'

//UI components
import {Table, Button} from 'react-bootstrap'

import Message from './Message'
import Loader from './Loader'

//icons
import { IoTrashSharp } from 'react-icons/io5'
import {IoMdAddCircleOutline} from 'react-icons/io'
import {MdEdit} from 'react-icons/md'

const CategoryTab = ({userInfo, searchPath, history, timer, timedMessage}) => {

    const [message, setMessage] = useState('')
    
    //set dispatch
    const dispatch = useDispatch()

    //select productList state
    const categoryList = useSelector(state => state.categoryList)
    const {loading, error, categories} = categoryList

    //get category create state
    const categoryCreate = useSelector(state => state.categoryCreate)
    const {success : createSuccess} = categoryCreate

    //get category update state
    const categoryUpdate = useSelector(state => state.categoryUpdate)
    const {success : updateSuccess} = categoryUpdate

    //select productDelete state
    const categoryDelete = useSelector(state => state.categoryDelete)
    const {loading:deleteLoading, error: deleteError, success: deleteSuccess} = categoryDelete
    

    //delete categories
    const deleteHandler = (id) => {
        if(window.confirm("Are you sure you would like to delete this category?")){
            dispatch(deleteCategory(id))
        }        
    }

    useEffect(() => {
        dispatch(listCategories())

        if (deleteSuccess){
            setMessage('Category successfully deleted')
        }
        if(createSuccess){
           setMessage('Category successfully created') 
        }
        if(updateSuccess){
           setMessage('Category successfully updated') 
        }
    },[dispatch, history, searchPath, deleteSuccess, createSuccess, updateSuccess])

    return (
        <>
            <h4 className="mb-4">Categories</h4>           
                
            <div className="d-flex mb-5 flex-row-reverse">                             
                {userInfo && userInfo.isStoreManager && 
                    <LinkContainer to={`/store-manager/category/add`}>
                        <Button variant="outline-success" >
                            <IoMdAddCircleOutline className="me-2 mb-1 fs-5"/>Add Category 
                        </Button>  
                    </LinkContainer>                       
                }                      
            </div>

            {// loading while performing create or delete action
                (deleteLoading) && <Loader />
            }
            {//error when creating or deleting product
                (deleteError && timedMessage) && <Message variant="danger">Error: {deleteError}</Message>                  
            }

             {//error when creating or deleting product
                ((deleteSuccess || createSuccess || updateSuccess) && timedMessage) && <Message variant="success">{message}</Message>                  
            }
                

            { /*show loader if loading */
            loading ? <Loader />
                /*else if an error occured, display error message */
                : error ? <Message variant="danger">{error}</Message>
                /*else show page content */
                : (
                <Table striped bordered responsive className="table-sm">
                    <thead>
                        <tr>
                            <td className='text-center'>ID</td>
                            <td>Name</td>
                            <td>Slug</td>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.map(category => (
                            <tr key={category.id}>
                                <td className='text-center'>{category.id}</td>
                                <td>{category.name}</td>                                    
                                <td>{category.slug}</td>                                    
                                {userInfo && userInfo.isStoreManager &&
                                    <td className="text-center">
                                        <LinkContainer to={`/store-manager/category/${category.slug}/edit`}>
                                            <Button variant="outline-success"   className="btn-icon me-2"><MdEdit/></Button>
                                        </LinkContainer>
                                        <Button variant="outline-danger"  className="btn-icon" onClick={() => deleteHandler(category.id)}><IoTrashSharp /></Button>
                                    </td>
                                }                                      
                            </tr>
                            
                        ))}
                    </tbody>
                </Table>
                )
            }
        
        </>
    )
}

export default CategoryTab