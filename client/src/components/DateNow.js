import React  from 'react'

const DateNow = () => {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    // const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

     //set date
    const current = new Date();

    return (
        <div>
           {current.getDate()}&nbsp;{months[current.getMonth()]}&nbsp;{current.getFullYear()}, {current.getHours()}:{current.getMinutes()}:{current.getSeconds()}         
        </div>
    )
}

export default DateNow
