import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import ChartAnnotation from 'chartjs-plugin-annotation';
import {Chart} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
// Chart.register(ChartDataLabels);
// Chart.defaults.global.plugins.datalabels.display = false

// var chart = new Chart({
//   plugins: [ChartDataLabels],
// })

// console.log(chart)

function DoughnutChart({chartData}) {

  const options = {
    plugins: {
      legend: {
        position: "right",
        labels: {
          color: "#fff",
          usePointStyle: true,
          pointStyle: 'circle',
          useBorderRadius: "false"
        }
      },
      datalabels: {
        formatter: function (value, context) {
          const percentage = context.dataset.data[context.dataIndex]
          return percentage ? percentage + "%" : "";
        },
        color: "white"
      }
    }
  }

  return (
    <Doughnut 
      type="doughnut"
      data={chartData} 
      options={options} 
      plugins={[ChartDataLabels]}
      />
  )
}

export default DoughnutChart