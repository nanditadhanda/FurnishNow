import React, {useState} from 'react'

import {Popover, Button, OverlayTrigger} from 'react-bootstrap'
import {BsQuestion} from 'react-icons/bs'

const PopoverTooltip = ({title="Info" , content="No information available"}) => {

    

    const popover = (
        <Popover id="popover-basic">
            <Popover.Header as="h3">{title}</Popover.Header>
            <Popover.Body>
                {content}
            </Popover.Body>
        </Popover>
        );

    return (
    <OverlayTrigger trigger="focus" placement="bottom" overlay={popover}>
    <Button variant="outline-secondary" className=" btn-icon-rounded ms-2"><BsQuestion /></Button>
  </OverlayTrigger>

            
            
       
    )
}

export default PopoverTooltip
