import React from 'react'
import { Pie } from 'react-chartjs-2'

const Chart = ({ nbaccepted, nbonhold, nbworking }) => {
  const pieData = {
    labels: ['Accepted', 'On hold', 'Working on it'],
    datasets: [
      {
        data: [nbaccepted, nbonhold, nbworking],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      },
    ],
  }
  const pieOptions = {
    plugins: {
      datalabels: {
        formatter: (value, ctx) => {
          const { datasets } = ctx.chart.data.datasets
          if (datasets.indexOf(ctx.dataset) === datasets.length - 1) {
            const sum = datasets[0].data.reduce((a, b) => a + b, 0)
            const percentage = `${Math.round(value / sum).toFixed(2) * 100} %`
            console.log(percentage)
          }
        },
      },
    },
  }
  return <Pie data={pieData} options={pieOptions} />
}

export default Chart
