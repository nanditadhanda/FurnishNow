import React, { useState, useEffect} from 'react'
import {Button, Form} from 'react-bootstrap'

//import redux components
import {useDispatch, useSelector} from 'react-redux'

//import actions
import {createProductReview} from '../actions/productActions'

//import constants
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants'

//import UI components
import Loader from '../components/Loader'
import Message from '../components/Message'


const Review = ({user, product_id}) => {
    //set initial states
    const [rating, setRating] = useState(0)
    const [title, setTitle] = useState('')
    const [comment, setComment] = useState('')

    //set dispatch
    const dispatch = useDispatch()


    /*-------- product reviews ----------*/

    //retrieve productCreateReview state
    const productCreateReview = useSelector(state => state.productCreateReview)
    // //destructure state
     const { loading: loadingProductReview, error: errorProductReview, success: successProductReview} = productCreateReview

    //use effect
    useEffect(() => {
        if(successProductReview){
            setRating(0)
            setComment('')
            setTitle('')            
        }
        
    }, [dispatch, successProductReview])

    const reviewSubmitHandler = (e) => {
        e.preventDefault()
       
        dispatch(createProductReview(
            product_id, 
            {
                title,
                rating,            
                comment
            }            
        ))
    }
    return (
        <>
            {loadingProductReview && <Loader />}
            {successProductReview && <Message variant="success">Product Review Submitted</Message>}
            {errorProductReview && <Message variant="danger">{errorProductReview}</Message>}
            <Form onSubmit={reviewSubmitHandler}>
                <Form.Group controlId='rating' className="mb-3">
                    <Form.Label className="mb-1">Rating</Form.Label> 
                    <Form.Select
                        value={rating} 
                        onChange={(e) => setRating(e.target.value)}
                    >
                        <option >Select</option>
                        <option value="1">Poor</option>
                        <option value="2">Fair</option>
                        <option value="3">Good</option>
                        <option value="4">Very Good</option>
                        <option value="5">Excellent</option>
                    
                    </Form.Select>
                </Form.Group>
                <Form.Group controlId='title' className="mb-3">
                    <Form.Label className="mb-1">Title</Form.Label> 
                    <Form.Control 
                        value={title}
                        type='text'  
                        onChange={(e) => setTitle(e.target.value)}                
                    />                
                </Form.Group>
                <Form.Group controlId='comment'>
                    <Form.Label className="mb-1">Review</Form.Label> 
                    <Form.Control 
                        value={comment}
                        as='textarea' 
                        row="5" 
                        
                        onChange={(e) => setComment(e.target.value)}                
                    />                
                </Form.Group>
                <div className="d-grid">
                    <Button disabled={loadingProductReview} type="submit"
                        className="my-4" variant="outline-success">
                            Submit
                    </Button>
                </div>
            </Form>
        </>
    )
}

export default Review
