import React from 'react'

const Sort = (order, i, sort) => {

    //toggle between assending and descending
    if(sort[i].substring(0,1) === '-'){
        //remove minus operator
        sort[i] = sort[i].slice(1)
    }else{
        //reverse minus operator for all other table headers
        for(let j = 0; j < sort.length ; j++){
            if(sort[j].substring(0,1) === '-'){
                sort[j] = sort[j].slice(1)
            }
        }
        //set minus operator for selected table header
        sort[i] = '-' + sort[i]  
    }

    return sort
}

export default Sort
