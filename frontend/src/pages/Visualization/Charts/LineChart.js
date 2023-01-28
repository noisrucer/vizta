import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto'

const options = {
  responsive: true,
  scales: {
    x: {
      grid: {
        color: "#666666",
        tickColor: "#333A46"
      },
      ticks: {
        color: "white"
      }
    },
    y: {
      grid: {
        color: "#333A46"
      },
      ticks: {
        color: "white"
      }
    }
  },

  plugins: {
    legend: {
      display: true,
      labels: {
        color: "#fff",
        usePointStyle: true,
        pointStyle: 'circle',
        useBorderRadius: "false"
      }
    }
  }
}

function LineChart({chartData}) {
  return (
    <Line data={chartData} options={options} />
  )
}

export default LineChart