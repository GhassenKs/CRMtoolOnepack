import { React, useState, useEffect } from 'react'
import { Table, Tag, Space, Popover, Radio, notification } from 'antd'
import axios from 'axios'
import { history } from 'index'

const renderLink = async (data) => {
  localStorage.setItem(
    'c',
    JSON.stringify({
      ...data,
      name: `Devis : ${data.items.name}`,
    }),
  )
  history.push('/Consulter')
}

/* eslint-disable react/destructuring-assignment */
const columns = (fact, setFact, userRole) => {
  const handleStatusChange = async (e, data) => {
    if (data.paid !== e.target.value) {
      let resPaid
      if (e.target.value === 'true') resPaid = true
      else resPaid = false
      try {
        const resp = await axios.put(
          `http://localhost:5000/invoices/updateInvoice/${data._id}`,
          {
            client: data.client._id,
            responsable: data.responsable._id,
            name: data.items.name,
            description: data.items.description,
            price: data.items.price,
            paid: resPaid,
            status: data.status,
            deadline: data.deadline,
            title: data.items.title,
            src: data.items.src,
          },
          {
            headers: {
              Authorization: `Bearer ${JSON.parse(localStorage.getItem('accessToken'))}`,
            },
          },
        )
        if (resp && resp.data) {
          setFact(
            fact.map((row) => {
              console.log(row)
              if (row._id === data._id) {
                return {
                  ...row,
                  paid: e.target.value,
                }
              }
              return row
            }),
          )
          notification.success({
            message: 'Status updated successfully',
          })
        } else {
          notification.error({
            message: resp.data.message,
          })
        }
      } catch (err) {
        console.log(err)
      }
    }
  }
  return [
    {
      title: 'Client',
      dataIndex: 'client',
      key: 'client',
      width: 130,
      render: (client) => {
        return <div>{client !== undefined ? client.name : 'Unknown'}</div>
      },
    },
    {
      title: 'Responsable',
      dataIndex: 'responsable',
      key: 'responsable',
      width: 130,
      render: (responsable) => {
        return (
          <div>
            {typeof responsable === 'object' ? <div>{responsable.name}</div> : <div>Unknown</div>}
          </div>
        )
      },
    },
    {
      title: 'Date',
      dataIndex: 'dateOfCreation',
      key: 'dateOfCreation',
      width: 100,
      sorter: (a, b) => new Date(a.dateOfCreation) - new Date(b.dateOfCreation),
      render: (dateOfCreation) => {
        return <div>{dateOfCreation.substring(0, 10)}</div>
      },
    },
    {
      title: 'Deadline',
      dataIndex: 'deadline',
      key: 'deadline',
      width: 100,
      sorter: (a, b) => new Date(a.date) - new Date(b.date),
      render: (deadline) => {
        return <div>{deadline ? <span>deadline</span> : <span>Unknown</span>}</div>
      },
    },
    {
      title: 'Name',
      key: 'name',
      render: (el) => {
        return <div>{el.items.name}</div>
      },
      width: 200,
    },
    {
      title: 'Description',
      key: 'dsc',
      render: (el) => {
        return <div>{el.items.description}</div>
      },
      width: 200,
    },
    {
      title: 'Prix (DT)',
      key: 'prix',
      width: 100,
      render: (el) => {
        return <div>{el.items.price}</div>
      },
    },
    {
      title: 'Status',
      key: 'status',
      dataIndex: 'paid',
      width: 100,
      filters: [
        { text: 'Payee', value: true },
        { text: 'Non payee', value: false },
      ],
      onFilter: (value, record) => {
        return record.paid === value
      },
      render: (tag) => {
        let color = ''
        if (tag === 'true') {
          color = '#87d068'
        }
        if (tag === 'false') {
          color = '#f50'
        }
        return (
          <span>
            <Tag color={color}>{tag === 'true' ? 'PAYEE' : 'NON PAYEE'}</Tag>
          </span>
        )
      },
    },

    {
      title: 'Action',
      key: 'action',
      width: 100,
      render: (data) => {
        const content = (
          <Radio.Group defaultValue={data.paid} onChange={(e) => handleStatusChange(e, data)}>
            <Space direction="vertical">
              <Radio value="true">Payee</Radio>
              <Radio value="false">Non payee</Radio>
            </Space>
          </Radio.Group>
        )
        return (
          <Space size="middle">
            {userRole === 'admin' && (
              <Popover content={content} title="Update status">
                <a>Update</a>
              </Popover>
            )}
            <button type="button" onClick={() => renderLink(data)} className="btn btn-sm btn-light">
              Details
            </button>
          </Space>
        )
      },
    },
  ]
}

const Table13 = ({ userId, userRole }) => {
  const [fact, setFact] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resp = await axios.get(`http://localhost:5000/invoices/getInvoices`, {
          headers: {
            Authorization: `Bearer ${JSON.parse(localStorage.getItem('accessToken'))}`,
          },
        })
        /* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */
        if (resp.data === []) {
          setFact(resp.data)
        } else {
          setFact(
            resp.data
              .map((f) => {
                return {
                  ...f,
                  key: f._id,
                  paid: f.paid.toString(),
                }
              })
              .filter((i) => {
                if (userRole === 'admin') return i.responsable._id === userId
                return i.client._id === userId
              }),
          )
        }
      } catch (err) {
        console.log(err)
      }
    }
    fetchData()
    // eslint-disable-next-line
  }, [])

  return (
    <div className="table-responsive">
      <Table columns={columns(fact, setFact, userRole)} dataSource={fact} />
    </div>
  )
}

export default Table13
