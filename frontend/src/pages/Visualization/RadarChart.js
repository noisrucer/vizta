import React from 'react';
import { Radar } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';

const options = {
  plugins: {
    legend: {
      display: false
    }
  }
}

function RadarChart({chartData}) {
  return (
    <Radar data={chartData} options={options}/>
  )
}

export default RadarChart