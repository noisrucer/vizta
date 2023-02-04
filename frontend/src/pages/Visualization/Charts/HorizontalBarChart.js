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
import {Chart} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
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
  responsive: true,
  elements: {
    bar: {
      borderWidth: 2,
    },
  },
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      interaction: {
        intersect: false,
      },
    },
    datalabels: {
      formatter: function (value, context) {
        const currNum = context.dataset.data[context.dataIndex]
        if (!currNum) {
          return ""
        } 

        var totalNum = 0
        context.dataset.data.forEach(x => {totalNum += x})
        const original = context.dataset.data
        return Math.round(currNum / totalNum * 100) + "%"
      },
      color: "white",
      font: {
        size: 9.5
      }
    },
  },
  scales: {
    x: {
      stacked: true,
      grid: {
        color: "#666666",
        tickColor: "#333A46"
      },
      ticks: {
        stepSize: 1,
        color: "white"
      },
      beforeBuildTicks: function(axis) {
        console.log("axis", axis);
        if (axis.max < 3) {
          axis.options.ticks.stepSize = 2
        } else {
          axis.options.ticks.stepSize = Math.round(axis.max / 5 + 1)
        }
      }
    },
    y: {
      stacked: true,
      grid: {
        color: "#333A46"
      },
      ticks: {
        color: "white"
      },
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
    <Bar data={chartData} options={options} plugins={[ChartDataLabels]}/>
  )
}

export default HorizontalBarChart