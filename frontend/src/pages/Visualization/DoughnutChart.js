import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto'

const options = {
  plugins: {
    legend: {
      display: false
    }
  }
}

function DoughnutChart({chartData}) {
  return (
    <Doughnut data={chartData} options={options}/>
  )
}

export default DoughnutChart