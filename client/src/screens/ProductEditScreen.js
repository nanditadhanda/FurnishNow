import React, {useState, useEffect} from 'react'

//axios
import axios from 'axios'

//Routing
import { Link } from 'react-router-dom'

//Redux imports
import { useDispatch, useSelector } from 'react-redux'
//Import product details action
import {listProductDetails, updateProduct } from '../actions/productActions'

//constants
import {PRODUCT_UPDATE_RESET} from '../constants/productConstants'

//UI components
import {Form, Row, Col, Button, FloatingLabel, Image} from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'

//icons
import { IoArrowBack } from 'react-icons/io5'

const ProductEditScreen = ({match, history}) => {
    //get id passed in URL
    const productID = match.params.id

    //set default local states
    const [name, setName] = useState('')
    const [slug, setSlug] = useState('')
    const [brand, setBrand] = useState('')
    const [category, setCategory] = useState('')
    const [description, setDescription] = useState('')
    const [image, setImage] = useState('')
   // const [image3D, setImage3D] = useState('')
    const [countInStock, setCountInStock] = useState('')
    const [costPrice, setCostPrice] = useState(0.00)
    const [salePrice, setSalePrice] = useState(0.00)
    const [uploading, setUploading] = useState(false)
    const [file, setFile] = useState('')

    //define dispatch
    const dispatch = useDispatch()

    //select userLogin state to check if user is logged in
    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    //get productDetails state
    const productDetails = useSelector(state => state.productDetails)
    //destructure state
    const { error, loading, product} = productDetails


    //get productUpdate state
    const productUpdate = useSelector(state => state.productUpdate)
    //destructure state
    const { error: updateError, loading:updateLoading, success:updateSuccess} = productUpdate


    //use effect react hook
    useEffect(() => {
        //authenticate and check if user is logged in and whether they are System Admin
        if(userInfo && userInfo.isSystemAdmin){

            //if information updated, reset productUpdate state and redirect to product list page
            if(updateSuccess){
                dispatch({type: PRODUCT_UPDATE_RESET})
                history.push("/admin/productList")
            }
            //else - information not updated
            else{            
            
                //if no product data found in state or if product id doesn't match the id passed in, retrieve product data
                if(!product || product._id !== Number(productID)){
                    dispatch(listProductDetails(productID))
                    
                }
                //if user data is present in state, set values of local states
                else{
                    //reset previous update attempt
                    dispatch({type: PRODUCT_UPDATE_RESET})

                    //set local states                    
                    setName(product.name)
                    setBrand(product.brand)
                    setSlug(product.slug)
                    setCategory(product.category)
                    setDescription(product.description)
                    setImage(product.image)
                    
                   // setImage3D(product.image3D)
                    setCountInStock(product.countInStock)
                    setCostPrice(product.costPrice)
                    setSalePrice(product.salePrice)
                }
            }
                
        }
        //if not authorized user , redirect to login page
        else{
             history.push("/accessdenied")
        }
     
    }, [dispatch, userInfo, updateSuccess, product, productID, history])

    const submitHandler = (e) => {
        //prevent refresh or redirect to another page
        e.preventDefault()

        if(file !== ""){
            uploadFileHandler()
        }        
        dispatch(updateProduct({
            _id: productID,
            name,
            brand,
            //category,
            description,
            // image3D,
            countInStock,
            costPrice,
            salePrice
        }))

       // 
    }

    // function to upload images
    const uploadFileHandler = async (e) => {

        //get file passed in
       // const file = e.target.files[0]

        //create FormData() function
        const formData = new FormData()

        //add file + product ID to FormData function (same names as backend variables)
        formData.append('image', file)
        formData.append('product_id', productID)

        //set uploading to true
        setUploading(true)

        //upload image to backend - send POST request
        try{
            //configure headers
            const config = {
                headers:{
                    'Content-Type' : 'multipart/form-data'
                }
            }

            //send POST request
            const {data} = await axios.post(
                '/api/products/upload-image', 
                formData,
                config
            )

            //setImage(data)

            //set uploading to true
            setUploading(false)

        }
        catch(error){
            //set uploading to false
            setUploading(false)

        }
    }


    // displayed to user
    return (

        <div>
            <Link to="/admin/productList">
                <Button variant="outline-secondary"><IoArrowBack /> Back</Button>
            </Link>
            
            <FormContainer title="Edit Product" lg="7"  shadow="shadow-sm">
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
                                <Col  xs="12" >
                                    {/* Name Field */}
                                    <Form.Group controlId="name" className="pb-3">
                                        <Form.Label>Name</Form.Label>
                                        <Form.Control
                                            type="text" 
                                            value={name} onChange={(e) => setName(e.target.value)}/>
                                    </Form.Group>
                                </Col>
                                
                                
                            </Row>
                            <Row>
                                <Col xs="12" md="6">
                                    {/* Category */}
                                    <Form.Group controlId="category" className="pb-3">
                                        <Form.Label>Category</Form.Label>
                                        <Form.Control 
                                            type="text" 
                                            value={category} onChange={(e) => setCategory(e.target.value)}/>
                                    </Form.Group>
                                </Col>
                                <Col md="6" xs="12">
                                    {/* Brand Field */}
                                    <Form.Group controlId="brand" className="pb-3">
                                        <Form.Label>Brand</Form.Label>
                                        <Form.Control 
                                            type="text" 
                                            value={brand} onChange={(e) => setBrand(e.target.value)}/>
                                    </Form.Group>       
                                </Col>
                                
                            </Row>
                            <Row>
                                <Col xs="12" md="6" lg="4">
                                    {/* Count In Stock */}
                                    <Form.Group controlId="countInStock" className="pb-3">
                                        <Form.Label>Count In Stock</Form.Label>
                                        <Form.Control 
                                            type="text" 
                                            value={countInStock} onChange={(e) => setCountInStock(e.target.value)}/>
                                    </Form.Group>
                                </Col>
                                <Col xs="12" md="6" lg="4">
                                    {/* Cost Price */}
                                    <Form.Group controlId="costPrice" className="pb-3">
                                        <Form.Label>Cost Price</Form.Label>
                                        <Form.Control
                                            label="Cost Price" 
                                            type="number" 
                                            value={costPrice} onChange={(e) => setCostPrice(e.target.value)}/>
                                    </Form.Group>
                                </Col>
                                <Col xs="12" md="6" lg="4">
                                    {/* Sale Price */}
                                    <Form.Group controlId="salePrice" className="pb-3">
                                        <Form.Label>Sale Price</Form.Label>
                                        <Form.Control                                            
                                            type="number" 
                                            value={salePrice} onChange={(e) => setSalePrice(e.target.value)}/>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs="12">
                                    {/* Image Field */}
                                    <Form.Group controlId="image" className="pb-4">
                                        <Form.Label>Product Image</Form.Label>

                                        <Row>
                                            {/* <Col xs='3' md='2'>
                                                < Image src={image} alt={slug} fluid rounded className="border"/>
                                            </Col> */}
                                            <Col>
                                                <Form.Control 
                                                    readOnly
                                                    className="mb-2"
                                                    type="text" 
                                                    value={image} 
                                                    onChange={(e) => setImage(e.target.value)}/> 
                                                
                                                <Form.Control 
                                                    type="file"
                                                    id="image-file"
                                                    label="Select File"
                                                    custom
                                                    onChange={(e) => setFile(e.target.files[0])}
                                                />
                                            </Col>
                                        </Row>

                                        
                                        

                          
                                        {/* if image is uploading */}
                                        {uploading && <Loader />}
                                    
                                    </Form.Group> 
                                    
                                          
                                </Col>
                                <Col xs="12" md="6">
                                    {/* Count In Stock */}
                                    {/* <Form.Group controlId="image3D" className="py-3">
                                        <Form.Label>3D Image</Form.Label>
                                        <Form.Control 
                                            type="text" 
                                            value={image3D} onChange={(e) => setImage3D(e.target.value)}/>
                                    </Form.Group> */}
                                </Col>
                            </Row>
                            <Row>
                                <Col xs="12">
                                    {/* Description */}
                                    <FloatingLabel controlId="desciption" className="pb-3" label="Description" >
                                        <Form.Control
                                            style={{ height: '100px' }}                                            
                                            as="textarea" 
                                            value={description} onChange={(e) => setDescription(e.target.value)}/>
                                    </FloatingLabel>

                                </Col>
                            </Row>
                            
                            {/* Submit Button */}
                            <div className="d-grid">
                                <Button type="submit" variant="primary" className="my-3">Update</Button>
                            </div>  
                        </Form>
                    )}
            </FormContainer>
        </div>
    )
}

export default ProductEditScreen
