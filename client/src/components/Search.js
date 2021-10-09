import React, {useState, useEffect} from 'react'
import { Form, FormControl, Button } from 'react-bootstrap'
import {FaSearch} from 'react-icons/fa'

import {useHistory} from 'react-router-dom'

const Search = ({path="products"}) => {
    //set keyword state
    const [keyword, setKeyword] = useState('')  
    

    //set history to redirect user based on URL parameters
    let history = useHistory()

    //clear search bar if keyword is blank
    if(keyword === ''){
        history.push(history.location.pathname)
    }

    //submit handler
    const submitHandler = (e) => {

        //preventing rerouting
        e.preventDefault()

        if(keyword){
            history.push(`/${path}?search=${keyword}&page=1`)
        }
        else{
            history.push(history.location.pathname)
        }
    }
    return (
        <Form className="d-flex search" onSubmit={submitHandler}>
            <FormControl
                type="search"
                placeholder="Search"
                name="search"
                className="mr-2"
                aria-label="Search"
                onChange={(e) => setKeyword(e.target.value)}
            />
            <Button type="submit" variant="success"><FaSearch /></Button>                    
        </Form>
    )
}

export default Search
