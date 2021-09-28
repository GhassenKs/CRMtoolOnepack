import React from 'react'
import { Pie } from 'react-chartjs-2'

const Chart = ({ nberror, nbtechnical, nbfinancial }) => {
  const pieData = {
    labels: ['Error', 'Financial', 'Technical'],
    datasets: [
      {
        data: [nberror, nbtechnical, nbfinancial],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      },
    ],
  }
  const pieOptions = {
    plugins: {
      datalabels: {
        formatter: (value, ...ctx) => {
          const { datasets } = ctx.chart.data.datasets
          if (datasets.indexOf(ctx.dataset) === datasets.length - 1) {
            const sum = datasets[0].data.reduce((a, b) => a + b, 0)
            const percentage = `${(Math.round((value / sum) * 100) / 100).toFixed(2)} %`
            console.log(percentage)
          }
        },
      },
    },
  }
  return <Pie data={pieData} options={pieOptions} />
}

export default Chart
