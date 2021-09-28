/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prefer-const */
import { React, useState, useEffect } from 'react'
import { Table, Typography, notification, Popconfirm } from 'antd'
import { history } from 'index'
import axios from 'axios'

const { Text } = Typography
/* eslint-disable react/destructuring-assignment */

const renderLink = async (
  title,
  responsable,
  client,
  category,
  price,
  submissionDate,
  active,
  status,
  description,
  invoices,
  bills,
  _id,
) => {
  localStorage.setItem(
    'projet',
    JSON.stringify({
      id: _id,
      title,
      responsable,
      client,
      category,
      price,
      submissionDate,
      active,
      status,
      description,
      invoices,
      bills,
    }),
  )

  history.push('/EditProjet')
}

const columns = (projets, setProjets, userRole) => {
  const handleRemove = async (e, id) => {
    e.preventDefault()
    setProjets(
      projets.map((p) => {
        if (p._id === id) {
          return {
            ...p,
            active: false,
          }
        }
        return p
      }),
    )
    try {
      const resp = await axios.put(`http://localhost:5000/projets/deactivateProjet/${id}`)
      if (resp.data) {
        notification.success({
          message: 'Project deactivated',
        })
      } else {
        notification.error({
          message: 'Error',
        })
      }
    } catch (err) {
      console.log(err)
    }
  }
  const handleActivate = async (e, id) => {
    e.preventDefault()
    setProjets(
      projets.map((p) => {
        if (p._id === id) {
          return {
            ...p,
            active: true,
          }
        }
        return p
      }),
    )
    try {
      const resp = await axios.put(`http://localhost:5000/projets/activateProjet/${id}`)
      if (resp.data) {
        notification.success({
          message: 'Project activated',
        })
      } else {
        notification.error({
          message: 'Error',
        })
      }
    } catch (err) {
      console.log(err)
    }
  }
  const cancel = (e) => {
    console.log(e)
  }
  return [
    {
      title: 'Nom',
      key: 'nom',
      render: ({ title }) => (
        <span className="d-flex align-items-center">
          <div>{title}</div>
        </span>
      ),
    },
    {
      title: 'Responsable',
      key: 'responsable',
      render: ({ responsable }) => (
        <a className="btn btn-sm btn-light" href="#" onClick={(e) => e.preventDefault()}>
          {responsable.name}
        </a>
      ),
    },
    {
      title: 'Client',
      key: 'client',
      render: ({ client }) => (
        <a className="btn btn-sm btn-light" href="#" onClick={(e) => e.preventDefault()}>
          {client?.name}
        </a>
      ),
    },
    {
      title: 'Category',
      key: 'category',
      render: ({ category }) => (
        <a className="btn btn-sm btn-light" href="#" onClick={(e) => e.preventDefault()}>
          {category[0]}
        </a>
      ),
      filters: [
        { text: 'Web', value: 'web' },
        { text: 'Mobile', value: 'mobile' },
      ],
      onFilter: (value, record) => {
        return record.category[0] === value
      },
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',

      render: (text) => (
        <a className="btn btn-sm btn-light" href="#" onClick={(e) => e.preventDefault()}>
          {text}
        </a>
      ),
    },

    {
      title: 'SubmissionDate',
      key: 'submissionDate',
      width: 130,
      sorter: (a, b) => new Date(a.submissionDate) - new Date(b.submissionDate),
      render: ({ submissionDate }) => {
        return <div>{submissionDate.substring(0, 10)}</div>
      },
    },
    {
      title: 'Is active',
      dataIndex: 'active',
      key: 'isActive',
      width: 130,
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
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: 130,
      filters: [
        { text: 'on hold', value: 'on hold' },
        { text: 'accepted', value: 'accepted' },
      ],
      onFilter: (value, record) => {
        return record.status === value
      },
      render: (status) => {
        return (
          <Text type={status === 'accepted' ? 'success' : ''} strong>
            {status}
          </Text>
        )
      },
    },

    {
      title: 'Action',
      key: 'action',
      render: ({
        title,
        responsable,
        client,
        category,
        price,
        submissionDate,
        active,
        status,
        description,
        invoices,
        bills,
        _id,
      }) => (
        <span className="d-flex">
          <a
            href="#/ConsulterProjet"
            onClick={() =>
              renderLink(
                title,
                responsable,
                client,
                category,
                price,
                submissionDate,
                active,
                status,
                description,
                invoices,
                bills,
                _id,
              )
            }
            className="btn btn-sm btn-light mr-2"
          >
            <i className="fe fe-edit mr-2" />
            View
          </a>
          {userRole === 'admin' && (
            <div>
              <button
                type="button"
                onClick={() =>
                  renderLink(
                    title,
                    responsable,
                    client,
                    category,
                    price,
                    submissionDate,
                    active,
                    status,
                    description,
                    invoices,
                    bills,
                    _id,
                  )
                }
                className="btn btn-sm btn-light mr-2"
              >
                <i className="fe fe-edit mr-2" />
                edit
              </button>
              {active === true ? (
                <Popconfirm
                  title="Are you sure to deactivate this projects?"
                  onConfirm={(e) => handleRemove(e, _id)}
                  onCancel={cancel}
                  okText="Yes"
                  cancelText="No"
                >
                  <a href="#" className="btn btn-sm btn-light">
                    <small>
                      <i className="fe fe-trash mr-2" />
                    </small>
                    Desactiver
                  </a>
                </Popconfirm>
              ) : (
                <Popconfirm
                  title="Are you sure to activate this project?"
                  onConfirm={(e) => handleActivate(e, _id)}
                  onCancel={cancel}
                  okText="Yes"
                  cancelText="No"
                >
                  <a href="#" className="btn btn-sm btn-light">
                    Activer
                  </a>
                </Popconfirm>
              )}
            </div>
          )}
        </span>
      ),
    },
  ]
}
const Table1 = ({ userRole }) => {
  /* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */
  const [projets, setProjets] = useState([])
  useEffect(() => {
    const URL =
      userRole === 'admin'
        ? 'http://localhost:5000/projets/getProjets'
        : 'http://localhost:5000/projets/getClientProjets'
    const fetchProjet = async () => {
      try {
        const resp = await axios.get(URL, {
          headers: {
            Authorization: `Bearer ${JSON.parse(localStorage.getItem('accessToken'))}`,
          },
        })
        const newData = resp.data.map((projet) => {
          return { ...projet, key: projet._id }
        })
        setProjets(newData)
      } catch (err) {
        console.log(err)
      }
    }

    fetchProjet()
  }, [])

  return (
    <div>
      <div className="table-responsive text-nowrap">
        <Table columns={columns(projets, setProjets, userRole)} dataSource={projets} />
      </div>
    </div>
  )
}
export default Table1
