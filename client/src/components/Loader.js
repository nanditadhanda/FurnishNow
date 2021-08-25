import React from 'react'
import { Spinner } from 'react-bootstrap'

const Loader = () => {
    return (
        <div className="mx-auto my-5 align-middle text-center">
          <Spinner animation="border"  role ="status"  variant="primary" />  
        </div>
    )
}

export default Loader
