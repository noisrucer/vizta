import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto'

const options = {
  legend: {
    display: false
  },
  tooltips: {
    enabled: false
  }
}

function BarChart({chartData}) {
  return (
    <Bar data={chartData} options={options} />
  )
}

export default BarChart