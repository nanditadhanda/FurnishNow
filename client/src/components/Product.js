//individual product card

//import components
import React from 'react'
import {Card} from 'react-bootstrap'
import Rating from './Rating'
import { Link } from 'react-router-dom'

//product function
function Product({product}) {
    return (
        <Card className="my-3 rounded product">
            <Link to={`/product/${product.category_slug}/${product._id}`}>
                {/* product image */}
                <Card.Img src={product.image}/> 

                {/* product details */}
                <Card.Body>
                    <Card.Title className="fw-normal" as="h5">{product.name}</Card.Title>
                    <Rating value={product.rating} text={`${product.numReviews} reviews`} color="text-primary"/> 
                    <Card.Text as="h4" className="fw-bold mt-2">RM {product.salePrice}</Card.Text>
                    {/* do add to cart function */}                        
                </Card.Body>
            </Link>
            
        </Card>
    )
}

export default Product

