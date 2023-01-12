import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto'

const options = {
  
  scales: {
    x: {
      display: true,
      ticks: {
        fontColor: 'white', 
      }
    },
    y: {
      display: true,
      ticks: {
        fontColor: 'white', 
      }
    }
  },

  plugins: {
    legend: {
      display: false
    }
  }
}

function LineChart({chartData}) {
  return (
    <Line data={chartData} options={options} />
  )
}

export default LineChart