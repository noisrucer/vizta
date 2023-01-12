import React from 'react';
import { Radar } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';

const options = {
  plugins: {
    legend: {
      display: false
    },
    labels: {
      fontColor: "white"
    }
  },
  scale: {
    suggestedMax: 10
  },
  scales: {
    r: {
      angleLines: {
        color: "grey"
      },
      grid: {
        color: "grey"
      },
    }
  }
};

function RadarChart({chartData}) {
  return (
    <Radar data={chartData} options={options}/>
  )
}

export default RadarChart