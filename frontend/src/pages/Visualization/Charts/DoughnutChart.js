import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto'

function DoughnutChart({chartData}) {

  const options = {
    plugins: {
      legend: {
        labels: {
          color: "#fff",
          usePointStyle: true,
          pointStyle: 'circle'
        }
      },
      datalabels: {
        display: true,
        align: 'bottom',
        backgroundColor: '#ccc',
        borderRadius: 3,
        font: {
          size: 18,
        }
      }
    }
  }

  // const plugins = [{
  //   beforeDraw: function(chart) {
  //    var width = chart.width,
  //        height = chart.height,
  //        ctx = chart.ctx;
  //        ctx.restore();
  //        var fontSize = (height / 160).toFixed(2);
  //        ctx.font = fontSize + "em sans-serif";
  //        ctx.textBaseline = "top";
  //        var text = `10`,
  //        textX = Math.round((width - ctx.measureText(text).width) / 2),
  //        textY = height / 2;
  //        ctx.fillText(text, textX, textY);
  //        ctx.save();
  //   } 
  // }]

  return (
    <Doughnut 
      type="doughnut"
      data={chartData} 
      options={options} 
      // plugins={plugins}
      />
  )
}

export default DoughnutChart