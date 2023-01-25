import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
// import faker from 'faker';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  indexAxis: 'y',
  elements: {
    bar: {
      borderWidth: 2,
    },
  },
  responsive: true,
  plugins: {
    legend: {
      display: false
    }
  },
  scales: {
    x: {
      stacked: true
    },
    y: {
      stacked: true
    }
  }
  // scales: {
  //   yAxes: {
  //     grid: {
  //       drawBorder: true,
  //       color: "#FFFFFF"
  //     },
  //     ticks:{
  //       beginAtZero: false,
  //       color: "white",
  //       fontSize: 12
  //     }
  //   },
  //   xAxes: {
  //     grid: {
  //       beginAtZero: false,
  //       color: "white",
  //       fontSize: 12
  //     }
  //   }
  // }
};



function HorizontalBarChart({chartData}) {
  return (
    <Bar data={chartData} options={options}/>
  )
}

export default HorizontalBarChart