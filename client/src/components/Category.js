import React from 'react'

import { LinkContainer } from 'react-router-bootstrap'

import { Image, Row, Col } from 'react-bootstrap'

const Category = ({categories}) => {
    return (
        <Row className="d-flex">
            {categories.map(category => (
                <LinkContainer key={category.id} to={`/products/${category.slug}`}>
                    <Col xs={4} md={2}>
                        <div className="thumbnailContainer">
                            <Image src={category.image} roundedCircle fluid title={category.name} />
                        </div>
                        
                        <h6 className='text-center py-3'>{category.name}</h6>
                    </Col>   
                
                </LinkContainer>
                          
            ))}
        </Row>
    )
}

export default Category
