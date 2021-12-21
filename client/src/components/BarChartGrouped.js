import React from 'react'

import 'chart.js/auto';
import { Bar} from 'react-chartjs-2';

const BarChartStacked = ({labels=[], datasetLabel=[], data=[]}) => {
  
    return (
            <div>
      <Bar
        data={{
          labels: labels,
          datasets: [
            {
              label: datasetLabel[0],
              data: data[0],
              backgroundColor: 'rgba(255, 99, 132, 0.2)',
              borderColor: 'rgba(255, 99, 132, 0.4)',
              borderWidth: 1,
              fill: 'origin',
            },
            {
              label: datasetLabel[1],
              data: data[1],
              backgroundColor: 'rgba(252, 183, 45, 0.2)',
              borderColor: 'rgba(252, 183, 45, 0.4)',
              borderWidth: 1,
              fill: 'origin',
            },
           
            {
              label: datasetLabel[2],
              data: data[2],
              backgroundColor: 'rgba(23, 162, 184, 0.2)',
              borderColor: 'rgba(20, 161, 168, 0.4)',
              borderWidth: 1,
              fill: 'origin',
            },
          ],
        }}
        height={400}
        width={600}
        options={{
          maintainAspectRatio: false,
          
          grouped: true,
          scales: {
            x: {
                stacked: true,
            },
            y: {
                stacked: true,
                ticks: {
                  beginAtZero: true,
                },
            },
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

export default BarChartStacked
