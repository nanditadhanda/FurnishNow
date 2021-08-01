//individual product card

//import components
import React from 'react'
import {Card, Button} from 'react-bootstrap'

//product function
function Product({product}) {
    return (
        <Card className="my-3 rounded">
            <a href={`/product/${product._id}`}>
                {/* product image */}
                <Card.Img variant="top" src={product.image}/> 

                {/* product details */}
                <Card.Body>
                    <Card.Title>{product.name}</Card.Title>
                    <Card.Text> {product.rating} from {product.numReviews} reviews</Card.Text>
                    <Card.Text as="h4" className="fw-bold">${product.price}</Card.Text>
                    {/* do add to cart function */}
                    <div className="d-grid">
                        <Button variant="outline-primary">Add To Cart</Button>  
                    </div>
                                 
                </Card.Body>
            </a>
            
        </Card>
    )
}

export default Product

