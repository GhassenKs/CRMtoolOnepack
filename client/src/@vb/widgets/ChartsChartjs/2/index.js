import React, { useEffect, useState } from 'react'
import { Bar } from 'react-chartjs-2'
import axios from 'axios'

/* const barData = {
 labels: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ], 
  labels:datesPrj,
  datasets: [
    {
      label: 'My First dataset',
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
      ],
      borderColor: [
        'rgba(255,99,132,1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
      ],
      borderWidth: 1,
      data: [65, 59, 80, 81, 56, 55, 40, 80, 81, 56, 55, 40],
    },
  ],
} */

const barOptions = {
  scales: {
    xAxes: [
      {
        stacked: true,
      },
    ],
    yAxes: [
      {
        stacked: true,
      },
    ],
  },
}

const Chart = () => {
  const [datesPrj, setDatesPrj] = useState([])

  const barData = {
    /* labels: [
       'January',
       'February',
       'March',
       'April',
       'May',
       'June',
       'July',
       'August',
       'September',
       'October',
       'November',
       'December',
     ], */
    labels: datesPrj,
    datasets: [
      {
        label: 'Projets',
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255,99,132,1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
        data: [65, 59, 80, 81, 56, 55, 40, 80, 81, 56, 55, 40],
      },
    ],
  }
  const getAllDateProjects = () => {
    const dates = []
    axios
      .get('http://localhost:5000/projets/getProjets', {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem('accessToken'))}`,
        },
      })
      .then((res) => {
        res.data.forEach((element) => {
          const date = `${new Date(element.submissionDate).getDate()} / ${
            new Date(element.submissionDate).getMonth() + 1
          } / ${new Date(element.submissionDate).getFullYear()}`
          dates.push(date)
        })
        setDatesPrj(dates)
      })
  }
  useEffect(() => {
    getAllDateProjects()
  }, [])
  return (
    <div>
      <Bar data={barData} options={barOptions} width={400} height={200} />
    </div>
  )
}

export default Chart
