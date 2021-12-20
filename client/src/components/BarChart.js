import React, {useState, useEffect} from 'react'

import 'chart.js/auto';
import { Bar} from 'react-chartjs-2';

const BarChart = ({labels=[], datasetLabel, data=[], color=''}) => {
    const [bgColor, setBgColor] = useState('')
    const [borderColor, setBorderColor] = useState('')

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
      <Bar
        data={{
          labels: labels,
          datasets: [
            {
              label: datasetLabel,
              data: data,
              backgroundColor: bgColor,
              borderColor: borderColor,
              borderWidth: 1,
            },
            // {
            //   label: 'Quantity',
            //   data: [47, 52, 67, 58, 9, 50],
            //   backgroundColor: 'orange',
            //   borderColor: 'red',
            // },
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

export default BarChart
