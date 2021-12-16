import React,{useState, useEffect} from 'react'

import {Pagination} from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const Paginate = ({path='', pages, page, keyword='', filter='', isSystemAdmin=false , type=""}) => {
    
    const [search, setSearch] = useState('')

    if(keyword){
        keyword = keyword.split('?search=')[1].split('&')[0]
    }

    useEffect(() => {
        if(type==="products"){
            setSearch(`search=${keyword}&`)
        }
    }, [type, keyword])
    
    
    return (
        pages > 1 && (
        <Pagination className="justify-content-center">
            <LinkContainer to ={`${path}?${search}page=1`} >
                <Pagination.First />
            </LinkContainer>
            <LinkContainer to ={`${path}?${search}page=${page !== 1 ? (page-1) : 1}`} >
                <Pagination.Prev disabled={page === 1}/>
            </LinkContainer>
            {[...Array(pages).keys()].map((x) => (
                
                <LinkContainer 
                    key={x+1}
                    to ={`${path}?${search}page=${x + 1}`}
                >
                    <Pagination.Item active={x+1 === Number(page)}>{x+1}</Pagination.Item>
                </LinkContainer>
            ))}
            
            <LinkContainer to ={`${path}?${search}page=${page !== pages ? (page+1) : pages}`} >
                <Pagination.Next disabled={page === pages}/>
            </LinkContainer>
            <LinkContainer to ={`${path}?${search}page=${pages}`} >
                <Pagination.Last />
            </LinkContainer>
            
        </Pagination>
        )
    )
}

export default Paginate
