import React from 'react'
import { Chart as ChartJS } from 'chart.js/auto'
import { Line } from 'react-chartjs-2'

export function LineChart(props) {
  const options = {
    plugins: {
      legend: {
        display: false
      }
    },
    scales: {
      x: {
        grid: {
          display: false
        }
      },
      y: {
        max: 100,
        grid: {
          display: false
        }
      }
    }
  }

  const data = {
    labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00'],
    datasets: [
      {
        label: props.label,
        data: props.data,
        fill: true,
        backgroundColor: 'rgba(248,186,42,0.2)',
        borderColor: 'rgba(248,186,42,1)'
      }
    ]
  }

  return (
    <div className='bg-light-sidebar_background dark:bg-dark-sidebar_background p-4 rounded-xl'>
      <h4 className='text-sm font-semibold text-gray-800 dark:text-gray-200 text-center pb-2'>
        {props.title}
      </h4>
      <Line data={data} options={options} />
    </div>
  )
}
