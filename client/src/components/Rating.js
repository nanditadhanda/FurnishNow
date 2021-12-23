import React from 'react'
import {RiStarHalfSLine, RiStarSLine, RiStarSFill} from 'react-icons/ri'


const Rating = ({value, text, color, size=''}) => {
    return (

       
    
       <div >
          <span className={`${color} ${size} d-flex no-wrap`} title={`${value} out of 5 stars`}>
            {value >= 1 
                ? <RiStarSFill className={`${color} ${size}`}/>
                : value >= 0.5 
                    ? <RiStarHalfSLine />
                    : <RiStarSLine />
            }  
            {value >= 2 
                ? <RiStarSFill />
                : value >= 1.5 
                    ? <RiStarHalfSLine />
                    : <RiStarSLine />
            } 
            {value >= 3 
                ? <RiStarSFill />
                : value >= 2.5 
                    ? <RiStarHalfSLine />
                    : <RiStarSLine />
            } 
            {value >= 4 
                ? <RiStarSFill />
                : value >= 3.5 
                    ? <RiStarHalfSLine />
                    : <RiStarSLine />
            }  
            {value >= 5 
                ? <RiStarSFill className={`${color} ${size}`}/>
                : value >= 4.5 
                    ? <RiStarHalfSLine />
                    : <RiStarSLine />
            }
          </span>
          <small className="align-middle">{text && text}</small>          
       </div>
       
       
    )
}

export default Rating
