import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';

function DoughnutChart({chartData}) {

  const options = {
    layout: {
      padding: -15
    },
    plugins: {
      tooltip: {
        enabled: false
      },
      legend: {
        position: "right",
        padding: {
          left: 2
        },
        labels: {
          filter: (legendItem, data) => data.datasets[0].data[legendItem.index] != 0,
          color: "#fff",
          usePointStyle: true,
          pointStyle: 'circle',
          useBorderRadius: "false",
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