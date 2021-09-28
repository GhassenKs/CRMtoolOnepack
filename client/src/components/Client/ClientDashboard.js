import React, { useState, useEffect, useRef } from 'react'
import { Helmet } from 'react-helmet'
// import ChartsChartjs2 from '@vb/widgets/ChartsChartjs/2'
import ChartsChartistjs2 from '@vb/widgets/ChartsChartistjs/1Client/index'
import ChartReclamation from '@vb/widgets/ChartsChartjs/reclamationsChart'
import HeadersHeading from '@vb/widgets/Headers/Heading'
// import Typography2 from '@vb/widgets/Typography/2'
// import WidgetsLists13 from '@vb/widgets/WidgetsLists/13'
import ChartsChartjs5 from '@vb/widgets/ChartsChartjs/5'
import { Statistic, Row, Col, Card, Progress } from 'antd'
import axios from 'axios'
import { getId } from 'redux/user/reducers'

const Dashboard = () => {
  const mounted = useRef()
  // const [produits] = useState([])
  const [nbProjetsAccepted, setNbProjetsAccepted] = useState(0)
  const [nbProjetsOnHold, setNbProjetsOnHold] = useState(0)
  const [nbProjetsWorkingOnIt, setNbProjetsWorkingOnIt] = useState(0)
  const [projets, setProjets] = useState([])
  const [currentprojets, setCurrentProjets] = useState([])

  const [nbProjets, setNbProjets] = useState(0)

  const [nbReclamation, setNbReclamation] = useState(0)
  const [nbReclamationError, setNbReclamationError] = useState(0)
  const [nbReclamationFinancial, setNbReclamationFinancial] = useState(0)
  const [nbReclamationTechnical, setNbReclamationTechnical] = useState(0)

  // eslint-disable-next-line no-unused-vars
  const Projets = () => {
    axios
      .get('http://localhost:5000/projets/getClientProjets', {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem('accessToken'))}`,
        },
      })
      .then((res) => {
        const prjdata = res.data
        console.log(prjdata)
        setProjets(prjdata)
        setNbProjets(prjdata.length)
        const onHoldProj = prjdata.filter((project) => project.status === 'on hold')
        setNbProjetsOnHold(onHoldProj.length)
        const AcceptedProj = prjdata.filter((project) => project.status === 'accepted')
        setNbProjetsAccepted(AcceptedProj.length)
        const WorkonitProj = prjdata.filter((project) => project.status === 'working on it')
        setNbProjetsWorkingOnIt(WorkonitProj.length)
        const currentprj = []
        currentprj.push(res.data[res.data.length - 1])
        currentprj.push(res.data[res.data.length - 2])
        console.log(currentprj)
        setCurrentProjets(currentprj)
      })
      .catch((err) => {
        console.log(err)
      })
  }
  // eslint-disable-next-line consistent-return
  const getReclamations = () => {
    axios
      .get(`http://localhost:5000/reclamations/getClientReclamations`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem('accessToken'))}`,
        },
      })
      .then((res) => {
        console.log(getId())
        setNbReclamation(res.data.length)
        const errorreclam = res.data.filter((reclam) => reclam.category === 'error')
        setNbReclamationError(errorreclam.length)
        const financialreclam = res.data.filter((reclam) => reclam.category === 'financial')
        setNbReclamationFinancial(financialreclam.length)
        const techreclam = res.data.filter((reclam) => reclam.category === 'technical')
        setNbReclamationTechnical(techreclam.length)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const legendChart = {
    names: ['Projets', 'Produits'],
    types: ['info', 'warning'],
  }
  useEffect(() => {
    mounted.current = true
    if (mounted.current === true) {
      const userId = getId()
      console.log(userId)
      Projets()
      console.log(projets)
      getReclamations(userId)
      console.log(currentprojets.length)
    }
    return () => {
      mounted.current = false
    }
    // eslint-disable-next-line
  }, [])

  return (
    <div>
      <Helmet title="Dashboard" />
      <div className="site-statistic-demo-card">
        <Row gutter={16}>
          <Col span={12}>
            <a href="#/Projet">
              <Card style={{ background: '#9966cc' }}>
                <Statistic
                  title="Projets"
                  value={nbProjets}
                  valueStyle={{ color: '#FFFFFF' }}
                  prefix={<span className="fe fe-code"> </span>}
                  suffix=""
                />
              </Card>
            </a>
          </Col>
          <Col span={12}>
            <a href="#/Reclamation">
              <Card style={{ background: '#8db600' }}>
                <Statistic
                  title="Reclammation"
                  value={nbReclamation}
                  valueStyle={{ color: '#FFFFFF' }}
                  prefix={<span className=" fe fe-clipboard"> </span>}
                  suffix=""
                />
              </Card>
            </a>
          </Col>
        </Row>
      </div>
      <div className="row mt-4">
        <div className="col-lg-6 col-md-12">
          <div className="card p-2" style={{ height: '380px' }} legend={legendChart}>
            <div className="card-header">
              <HeadersHeading data={{ title: 'Nombre de projets  par mois' }} />
            </div>
            <div className="card-body">
              <ChartsChartistjs2 projets={projets} />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div
              className="card ml-2"
              style={{ height: '380px', width: '597px', marginLeft: '-8px' }}
            >
              <div className="card-header">
                <HeadersHeading data={{ title: 'Progress  project' }} />
              </div>
              <div className="d-flex align-items-center">
                <div className="card-body">
                  <ChartsChartjs5
                    nbaccepted={(nbProjetsAccepted / nbProjets) * 100}
                    nbonhold={(nbProjetsOnHold / nbProjets) * 100}
                    nbworking={(nbProjetsWorkingOnIt / nbProjets) * 100}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div
              className="card ml-2"
              style={{ height: '380px', width: '597px', marginLeft: '-8px' }}
            >
              <div className="card-header">
                <HeadersHeading data={{ title: 'Progress  Reclamation' }} />
              </div>
              <div className="d-flex align-items-center">
                <div className="card-body">
                  <ChartReclamation
                    nberror={(nbReclamationError / nbReclamation) * 100}
                    nbtechnical={(nbReclamationTechnical / nbReclamation) * 100}
                    nbfinancial={(nbReclamationFinancial / nbReclamation) * 100}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        {currentprojets.map((prj) => {
          return (
            /* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */

            <div key={prj?._id} className="row">
              <div className="col-md-12">
                <div
                  className="card p-2"
                  style={{ height: '380px', width: '597px', marginLeft: '12px' }}
                >
                  <div className="card-header">
                    <HeadersHeading
                      data={{ title: `Overall project percentage progress ${prj?.title}` }}
                    />
                  </div>
                  <div style={{ padding: '70px' }}>
                    Progress percentage Project
                    <Progress percent={prj?.comments?.percentage} />
                    <center>
                      <h1>Actual Task :{prj?.comments?.currentTask}</h1>
                    </center>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
      {/* <div className="row">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-header">
              <HeadersHeading data={{ title: 'Projet Courant' }} />
            </div>
            <div className="card-body">
              <Typography2 />
            </div>
          </div>
        </div>
      </div>

      <div className="row"> 
        <div className="col-lg-6 col-md-12">
          <div className="card">
            <div className="card-body">
              <WidgetsLists13 />
            </div>
          </div>
        </div>
      </div>
  */}
    </div>
  )
}

export default Dashboard
