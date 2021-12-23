import React from 'react'

import { LinkContainer } from 'react-router-bootstrap'

import { Image } from 'react-bootstrap'

const Category = ({categories}) => {
    return (
        <div className="d-flex justify-content-center category-thumbnails flex-wrap">
            {categories.map(category => (
                <LinkContainer key={category.id} to={`/products/${category.slug}`}>  
                    <div>
                        <div className="thumbnailContainer">
                            <Image src={category.image} roundedCircle fluid title={category.name} />
                        </div>       
                        <h6 className='text-center py-3 fs-sm-5'>{category.name}</h6>              
                    </div>                
                </LinkContainer>                   
            ))}
        </div>
    )
}

export default Category
