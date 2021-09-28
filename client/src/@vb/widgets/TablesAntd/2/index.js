import React, { useState, useEffect } from 'react'
import { Table, notification } from 'antd'
import { history } from 'index'
import axios from 'axios'

const renderLink = async (id, nom, prenom, mdp, status, email, numero, adresse) => {
  localStorage.setItem(
    'user',
    JSON.stringify({
      id,
      nom,
      prenom,
      mdp,
      status,
      email,
      numero,
      adresse,
    }),
  )
  history.push('/editClient')
}

const columns = (setAlldata, alldata) => {
  const handleRemove = async (e, id) => {
    e.preventDefault()
    setAlldata(
      alldata.map((client) => {
        if (client._id === id) {
          return {
            id: client.id,
            key: client.id,
            lastName: client.nom,
            name: client.name,
            password: client.password,
            active: false,
            email: client.email,
            phone: client.phone,
            adress: client.adress,
          }
        }
        return client
      }),
    )
    try {
      const resp = await axios.put(`http://localhost:5000/clients/deactivateClient/${id}`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem('accessToken'))}`,
        },
      })
      if (resp.data) {
        notification.success({
          message: 'User deactivated successfully',
        })
      }
    } catch (error) {
      notification.error({
        message: error,
      })
    }
  }
  return [
    {
      title: 'Nom',
      key: 'nom',
      render: ({ name, lastName, email, profilePicture }) => {
        return (
          <span className="d-flex align-items-center">
            {profilePicture ? (
              <img
                src={`http://localhost:5000/${profilePicture}`}
                alt=""
                className="rounded-circle"
                height="50px"
                width="50px"
              />
            ) : (
              <img
                src={`https://ui-avatars.com/api/?name=${name}&background=random&length=1`}
                alt=""
                className="rounded-circle"
                height="50px"
                width="50px"
              />
            )}
            <div className="ml-4">
              <div>
                {name} {lastName}
              </div>
              <div style={{ color: '#A0A0A0' }}>{email}</div>
            </div>
          </span>
        )
      },
    },
    {
      title: 'Numero',
      dataIndex: 'phone',
      key: 'numero',
    },
    {
      title: 'Adresse',
      dataIndex: 'adress',
      key: 'adresse',
      sorter: (a, b) => a.adress.length - b.adress.length,
    },
    {
      title: 'Status',
      dataIndex: 'active',
      key: 'status',
      filters: [
        { text: 'Active', value: true },
        { text: 'Deactivated', value: false },
      ],
      onFilter: (value, record) => {
        return record.active === value
      },
      defaultFilteredValue: ['true'],
      render: (text) => (
        <span
          className={
            text === true
              ? 'font-size-12 badge badge-primary'
              : 'font-size-12 badge bg-red text-white'
          }
        >
          {text === true ? 'Active' : 'Deactivated'}
        </span>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: ({
        _id: id,
        lastName: nom,
        name: prenom,
        password: mdp,
        active: status,
        email,
        phone: numero,
        adress: adresse,
      }) => {
        return (
          <span>
            <button
              type="button"
              onClick={() => renderLink(id, nom, prenom, mdp, status, email, numero, adresse)}
              className="btn btn-sm btn-light mr-2"
            >
              <i className="fe fe-edit mr-2" />
              Editer
            </button>
            {status !== false && (
              <a href="#" onClick={(e) => handleRemove(e, id)} className="btn btn-sm btn-light">
                <small>
                  <i className="fe fe-trash mr-2" />
                </small>
                Desactiver
              </a>
            )}
          </span>
        )
      },
    },
  ]
}
const Table1 = () => {
  const [alldata, setAlldata] = useState([])
  /* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const resp = await axios.get('http://localhost:5000/clients/getClients', {
          headers: {
            Authorization: `Bearer ${JSON.parse(localStorage.getItem('accessToken'))}`,
          },
        })

        const newData = resp.data.map((client) => {
          return { ...client, key: client._id }
        })
        setAlldata(newData)
      } catch (err) {
        console.log(err)
      }
    }
    fetchClients()
  }, [])

  return (
    <div>
      <div className="table-responsive text-nowrap">
        <Table columns={columns(setAlldata, alldata)} dataSource={alldata} />
      </div>
    </div>
  )
}
export default Table1
