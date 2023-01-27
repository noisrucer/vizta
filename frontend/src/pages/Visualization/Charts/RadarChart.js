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
    suggestedMax: 5
  },
  scales: {
    r: {
      beginAtZero: true,
      angleLines: {
        color: "#282F3C"
      },
      grid: {
        color: "#282F3C"
      },
      pointLabels: {
        color: "white"
      },
      ticks: {
        color: "white",
        stepSize: 1,
        backdropColor: 'transparent'
      }
    }
  }
};

function RadarChart({chartData}) {
  return (
    <Radar data={chartData} options={options}/>
  )
}

export default RadarChart