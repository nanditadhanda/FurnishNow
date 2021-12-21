import React, {useState, useEffect} from 'react'

import { useParams } from 'react-router-dom'

import { useDispatch,useSelector } from 'react-redux'

//
import {createCategory, updateCategory, listCategoryDetails} from '../actions/categoryActions'

//UI components
import Loader from '../components/Loader'
import Message from '../components/Message'
import SideBar from '../components/SideBar'
import FormContainer from '../components/FormContainer'

import {Row, Col, Form, Button} from 'react-bootstrap'

const AddEditCategoryScreen = ({history}) => {

    let {slug} = useParams()

    const [page, setPage] = useState('')
    const [btnTitle, setBtnTitle] = useState('')

    const [id, setID] = useState('')
    const [name, setName] = useState('')
    const [category_slug, setSlug] = useState('')
    const [image, setImage] = useState('')
    const [file, setFile] = useState('')
    const [message, setMessage] = useState('')

    const dispatch = useDispatch()

    //select userLogin state to check if user is logged in
    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    const categoryUpdate = useSelector(state => state.categoryUpdate)
    const {loading: loadingUpdate, error: errorUpdate, success: successUpdate} = categoryUpdate

    const categoryDetails = useSelector(state => state.categoryDetails)
    const {loading: loadingDetails, error: errorDetails, category} = categoryDetails



    //get category state
    const categoryCreate = useSelector(state => state.categoryCreate)
    const {loading : loadingCreate, error: errorCreate, success : successCreate} = categoryCreate

    //create slug
    const createSlug = (val) => {
        setSlug(val
        .toLowerCase()
        .replace(/ /g,'-')
        .replace(/[^\w-]+/g,'')
        )

    }

    const submitHandler = (e) => {
        e.preventDefault()
        //validations
        if(name === ''){
            setMessage('Please fill out category name')
        }
        else if(image === '' && file === ''){
            setMessage('Please select image')
        }
        else{
             //create FormData() function
            const categoryData = new FormData()

            //add file + name to FormData function (same names as backend variables)   
            if(file !== null ){
                categoryData.append('image', file)
            } 
            categoryData.append('name', name)
            categoryData.append('slug', category_slug)

            //execute add/update actions
            try{
                if(page==='add'){
                    //dispatch create action
                    dispatch(createCategory(categoryData))
                }
                else {
                    //dispatch update action
                    if(id !== 5 || slug !== 'uncategorized'){
                        dispatch(updateCategory(categoryData, id))
                    }          
                }
                
            }
            catch(error){
                //set uploading to false
                setMessage(error)
            }

            
        }
    }

    useEffect(() => {
         //authenticate and check if user is logged in and whether they are System Admin
        if(userInfo && userInfo.isStoreManager){
            //if successfully created / updated, redirect to manage catalog screen
            if(successCreate || successUpdate){
                history.push("/store-manager/manageCatalog") 
            }   
            
            if(slug !== undefined){
                
                setPage('edit')
                setBtnTitle('Update Category')
            }
            else{
                setPage('add')
                setBtnTitle('Add Category')
            }

            if(page === 'edit'){
                if(!category || category.slug !== slug){
                    dispatch(listCategoryDetails(slug))
                }
                else{
                    //set local states 
                    setID(category.id)                   
                    setName(category.name)
                    setSlug(category.slug)
                    setImage(category.image)
                    
                }
            }
        }
        //if not authorized user , redirect to login page
        else{
             history.push("/accessdenied")
        }        
        
    }, [userInfo, dispatch, history,successCreate, successUpdate, slug, page, category])

    return (
        <Row className="w-100">
            <SideBar activeTab="product"/>
            <Col>
                <main>                    
                    <FormContainer title={page ==='add' ? "Add Catalog" : "Edit Catalog"} lg="6"  shadow="shadow-sm">
                        {/* Error */}
                
                        {(errorCreate || errorDetails || errorUpdate || message) && 
                            <Message variant="danger">Error: {
                                errorCreate ? errorCreate 
                                : errorDetails ? errorDetails
                                : errorUpdate ? errorUpdate
                                : message}
                            </Message>}

                        {(id === 5 || slug==='uncategorized') &&
                            <Message variant="warning">Warning: You are not permitted to alter this category</Message>
                            }

                        {successCreate && <Message variant="success">Category Created</Message>}
                        {/* if loading*/}
                        {loadingCreate || loadingDetails || loadingUpdate ? <Loader />
                                //if error is encountered, show error message
                                :
                            <Form onSubmit={submitHandler}>
                                <Row>
                                    <Col  xs="12" md="6">
                                        {/* name Field */}
                                        <Form.Group controlId="name" className="pb-3">
                                            <Form.Label>Name</Form.Label>
                                            <Form.Control
                                                type="text" 
                                                readOnly={id === 5 || slug==='uncategorized'}
                                                value={name} onChange={(e) => 
                                                    {setName(e.target.value)
                                                     createSlug(e.target.value)
                                                }}/>
                                        </Form.Group>
                                    </Col>   
                                    <Col  xs="12" md="6">
                                        {/* slug Field */}
                                        <Form.Group controlId="slug" className="pb-3" >
                                            <Form.Label>Slug</Form.Label>
                                            <Form.Control
                                                readOnly
                                                type="text" 
                                                value={category_slug}/>
                                        </Form.Group>
                                    </Col>                                            
                                </Row>
                                <Row>                                             
                                    <Col >
                                        <Form.Group className="pb-4">                                      
                                            <Form.Label>Product Image</Form.Label>
                                            <Form.Control 
                                                readOnly
                                                className="mb-2"
                                                type="text" 
                                                value={image} 
                                                onChange={(e) => setImage(e.target.value)}
                                            /> 
                                            {!(id === 5 || slug==='uncategorized') &&
                                                <Form.Control 
                                                    type="file"
                                                    id="image-file"
                                                    label="Select File"
                                                    placeholder={file}
                                                    custom
                                                    onChange={(e) => setFile(e.target.files[0])}
                                                /> 
                                            }                                   
                                        </Form.Group>                                                 
                                    </Col>                                        
                                </Row>
                                {/* Submit Button */}
                                <div className="d-grid">
                                    <Button type="submit" variant="primary" disabled={(id === 5 || slug==='uncategorized')} className="my-3">{btnTitle}</Button>
                                </div>
                            </Form>
                        }
                    </FormContainer>             
                </main>
            </Col>          
        </Row>
    )
}

export default AddEditCategoryScreen
