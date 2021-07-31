import React from 'react'
import { Form, FormControl, Button } from 'react-bootstrap'
import {FaSearch} from 'react-icons/fa'

const Search = () => {
    return (
        <Form className="d-flex search">
            <FormControl
                type="search"
                placeholder="Search"
                className="mr-2"
                aria-label="Search"
            />
            <Button variant="success"><FaSearch /></Button>                    
        </Form>
    )
}

export default Search
