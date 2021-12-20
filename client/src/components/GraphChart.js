import React, {useState, useEffect} from 'react'

import 'chart.js/auto';
import {Chart} from 'react-chartjs-2'

const GraphChart = ({labels=[], datasetLabel, data=[], color='', type}) => {
    const [bgColor, setBgColor] = useState('')
    const [borderColor, setBorderColor] = useState('')

    console.log(data)

    //set properties
    useEffect(()=>{
        if(color==='primary'){
            setBgColor('rgba(252, 183, 45, 0.2)')
            setBorderColor('rgba(252, 183, 45, 0.4)')
        } 
        else if(color==='success'){
            setBgColor('rgba(20, 161, 168, 0.2)')
            setBorderColor('rgba(20, 161, 168, 0.4)')
        }
        else if(color==='info'){
            setBgColor('rgba(23, 162, 184, 0.2)')
            setBorderColor('rgba(23, 162, 184, 0.4)')
        }
        else{
            setBgColor('rgba(108, 117, 125, 0.2)')
            setBorderColor('rgba(108, 117, 125, 0.4)')
        }
    },[color,labels, datasetLabel, data])

    return (
            <div>
      <Chart
        type={type}
        data={{
          labels: labels,
          datasets: [
            {
              label: datasetLabel,
              data: data,
              backgroundColor: bgColor,
              borderColor: borderColor,
              borderWidth: 1,              
              fill: 'origin',
            },
          ],
        }}
        height={400}
        width={600}
        options={{
          maintainAspectRatio: false,
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true,
                },
              },
            ],
          },
          legend: {
            labels: {
              fontSize: 25,
            },
          },
        }}
      />
    </div>
    )
}

export default GraphChart
