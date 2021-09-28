import React, { useState, useEffect, useRef } from 'react'
import { Helmet } from 'react-helmet'
// import ChartsChartjs2 from '@vb/widgets/ChartsChartjs/2'
import ChartsChartistjs2 from '@vb/widgets/ChartsChartistjs/1'
import ChartReclamation from '@vb/widgets/ChartsChartjs/reclamationsChart'
import HeadersHeading from '@vb/widgets/Headers/Heading'
// import Typography2 from '@vb/widgets/Typography/2'
// import WidgetsLists13 from '@vb/widgets/WidgetsLists/13'
import ChartsChartjs5 from '@vb/widgets/ChartsChartjs/5'
import { Statistic, Row, Col, Card, Progress } from 'antd'
import axios from 'axios'
// import Produit from 'pages/Produit'

const Dashboard = () => {
  const mounted = useRef()
  const [Projets, setProjets] = useState([])
  const [Produits, setProduits] = useState([])
  const [nbClients, setNbClients] = useState(0)
  const [nbClientsActifs, setNbClientsActifs] = useState(0)
  const [nbClientsDeactifs, setNbClientsDeactifs] = useState(0)
  const [nbProjetsAccepted, setNbProjetsAccepted] = useState(0)
  const [nbProjetsOnHold, setNbProjetsOnHold] = useState(0)
  const [nbProjetsWorkingOnIt, setNbProjetsWorkingOnIt] = useState(0)

  const [nbProjets, setNbProjets] = useState(0)
  const [nbProduits, setNbProduits] = useState(0)

  const [nbReclamation, setNbReclamation] = useState(0)
  const [nbReclamationError, setNbReclamationError] = useState(0)
  const [nbReclamationFinancial, setNbReclamationFinancial] = useState(0)
  const [nbReclamationTechnical, setNbReclamationTechnical] = useState(0)
  const getClients = () => {
    axios
      .get('http://localhost:5000/clients/getClients', {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem('accessToken'))}`,
        },
      })
      .then((res) => {
        setNbClients(res.data.length)
        const active = res.data.filter((client) => client.active === true)
        setNbClientsActifs(active.length)
        const deactive = res.data.filter((client) => client.active === false)
        setNbClientsDeactifs(deactive.length)
      })
      .catch((err) => {
        console.log(err)
      })
  }
  // eslint-disable-next-line no-unused-vars
  const getProjets = () => {
    axios
      .get('http://localhost:5000/projets/getProjets', {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem('accessToken'))}`,
        },
      })
      .then((res) => {
        setProjets(res.data)
        setNbProjets(res.data.length)
        const onHoldProj = res.data.filter((project) => project.status === 'on hold')
        setNbProjetsOnHold(onHoldProj.length)
        const AcceptedProj = res.data.filter((project) => project.status === 'accepted')
        setNbProjetsAccepted(AcceptedProj.length)
        const WorkonitProj = res.data.filter((project) => project.status === 'working on it')
        setNbProjetsWorkingOnIt(WorkonitProj.length)
      })
      .catch((err) => {
        console.log(err)
      })
  }
  // eslint-disable-next-line consistent-return
  const getReclamations = () => {
    axios
      .get('http://localhost:5000/reclamations/getReclamations', {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem('accessToken'))}`,
        },
      })
      .then((res) => {
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

  const getProduits = () => {
    axios
      .get('http://localhost:5000/products/getProducts', {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem('accessToken'))}`,
        },
      })
      .then((res) => {
        setProduits(res.data)
        setNbProduits(res.data.length)
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
      getClients()
      getProjets()
      getReclamations()
      getProduits()
    }
    return () => {
      setNbClients(0)
      setProjets([])
      setNbClientsActifs(0)
      setNbClientsActifs(0)
      setNbProduits(0)
      setNbProjetsAccepted(0)
      setNbProjetsOnHold(0)
      setNbProjetsWorkingOnIt(0)
      setNbReclamation(0)
      setNbReclamationError(0)
      setNbReclamationFinancial(0)
      setNbReclamationTechnical(0)
    }
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
          <Col span={12}>
            <a href="#/client">
              <Card className="mt-2" style={{ background: '#ff2052' }}>
                <Statistic
                  title="Clients"
                  value={nbClients}
                  valueStyle={{ color: '#FFFFFF' }}
                  prefix={<span className="fe fe-user"> </span>}
                  suffix=""
                />
              </Card>
            </a>
          </Col>
          <Col span={12}>
            <a href="#/Produit">
              <Card className="mt-2" style={{ background: '#007fff', color: 'white' }}>
                <Statistic
                  title="Produits"
                  value={nbProduits}
                  valueStyle={{ color: '#FFFFFF' }}
                  prefix={<span className="fe fe-package"> </span>}
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
              <HeadersHeading data={{ title: 'Nombre de projets et de produits par mois' }} />
            </div>
            <div className="card-body">
              <ChartsChartistjs2 projets={Projets} produits={Produits} />
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
        <div className="row">
          <div className="col-md-12">
            <div
              className="card ml-4"
              style={{ height: '380px', width: '600px', marginLeft: '12px' }}
            >
              <div className="card-header">
                <HeadersHeading data={{ title: 'Progress  Client' }} />
              </div>
              <div
                className="d-flex align-items-center"
                style={{ height: '380px', width: '600px', display: 'inline-flex' }}
              >
                <div style={{ marginLeft: '150px' }} className="align-top">
                  {' '}
                  <h4 style={{ marginLeft: '32px' }}>Active</h4> <br />
                  <Progress
                    type="circle"
                    percent={parseFloat((nbClientsActifs / nbClients) * 100).toFixed(2)}
                  />
                </div>
                <div style={{ marginLeft: '40px' }} className="align-top">
                  {' '}
                  <h4 style={{ marginLeft: '20px' }}> Deactivated </h4> <br />{' '}
                  <Progress
                    type="circle"
                    percent={parseFloat((nbClientsDeactifs / nbClients) * 100).toFixed(2)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
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
