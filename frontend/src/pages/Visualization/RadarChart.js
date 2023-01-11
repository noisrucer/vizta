import React from 'react';
import { Radar } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';

const options = {
  plugins: {
    legend: {
      display: false
    }
  },
  scale: {
    suggestedMax: 10
  }
};

function RadarChart({chartData}) {
  return (
    <Radar data={chartData} options={options}/>
  )
}

export default RadarChart