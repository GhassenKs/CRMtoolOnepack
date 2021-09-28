import React, { useEffect } from 'react'
import { Line } from 'react-chartjs-2'
import Legend from 'chartist-plugin-legend'

const Chart = ({ projets }) => {
  const getProjectsNumberPerMonth = (month) => {
    const projetsmonth = projets.filter(
      (projet) => new Date(projet.submissionDate).toDateString().substring(4, 7) === month,
    )
    return projetsmonth.length
  }

  const animationData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Projets',
        backgroundColor: 'rgb(0, 0, 0,0)',
        borderColor: 'rgb(155, 0, 203)',
        data: [
          getProjectsNumberPerMonth('Jan'),
          getProjectsNumberPerMonth('Fev'),
          getProjectsNumberPerMonth('Mar'),
          getProjectsNumberPerMonth('Avr'),
          getProjectsNumberPerMonth('Mai'),
          getProjectsNumberPerMonth('Jui'),
          getProjectsNumberPerMonth('Jul'),
          getProjectsNumberPerMonth('Aug'),
          getProjectsNumberPerMonth('Sep'),
          getProjectsNumberPerMonth('Oct'),
          getProjectsNumberPerMonth('Nov'),
          getProjectsNumberPerMonth('Dec'),
        ],
      },
    ],
  }

  const animatonOptions = {
    axisX: {
      labelInterpolationFnc(value, index) {
        return index % 2 !== 0 ? !1 : value
      },
    },
    plugins: [
      Legend({
        legendNames: ['Projets'],
      }),
    ],
  }

  useEffect(() => {}, [])

  return (
    <div>
      <Line
        className="height-300 chart-css-animations chartist-theme-dark chartist-animated"
        data={animationData}
        options={animatonOptions}
        type="Line"
      />
    </div>
  )
}

export default Chart
