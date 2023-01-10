import React from 'react';
import { Radar } from 'react-chartjs-2';
import { 
    Chart as ChartJS,
    // LineElement,
    // PointElement,
    // Tooltip,
    // Legend,
    // RadiaLinearScale
 } from 'chart.js/auto'

function RadarChart({chartData}) {
  return (
    <Radar data={chartData}/>
  )
}

export default RadarChart