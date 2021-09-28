import { React, useState, useEffect } from 'react'
import { Table, Tag, Space, notification, Popover, Radio, Typography, Popconfirm } from 'antd'
import axios from 'axios'
import { history } from 'index'

const { Text } = Typography
/* eslint-disable react/destructuring-assignment */

const renderLink = async (data) => {
  localStorage.setItem('recl', JSON.stringify(data))
  history.push('/ConsulterReclamation')
}

const columns = (recData, setRecData, userRole) => {
  const handleRemove = async (e, id) => {
    e.preventDefault()
    setRecData(
      recData.map((r) => {
        if (r._id === id) {
          return {
            ...r,
            active: false,
          }
        }
        return r
      }),
    )
    try {
      const resp = await axios.put(
        `http://localhost:5000/reclamations/deactivateReclamation/${id}`,
        {
          headers: {
            Authorization: `Bearer ${JSON.parse(localStorage.getItem('accessToken'))}`,
          },
        },
      )
      if (resp.data) {
        notification.success({
          message: 'Reclamation deactivated successfully',
        })
      }
    } catch (error) {
      notification.error({
        message: error,
      })
    }
  }
  const cancel = (e) => {
    console.log(e)
  }
  const handleStatusChange = async (e, id, oldStatus) => {
    if (oldStatus !== e.target.value) {
      try {
        const resp = await axios.put(
          `http://localhost:5000/reclamations/updateReclamation/${id}`,
          {
            status: e.target.value,
            responsableId: '610d40d850f39c32e8f0b584',
            clientId: recData.find((row) => row._id === id).client._id,
          },
          {
            headers: {
              Authorization: `Bearer ${JSON.parse(localStorage.getItem('accessToken'))}`,
            },
          },
        )
        if (resp && resp.data.sucess === 'reclamation modifié') {
          setRecData(
            recData.map((row) => {
              if (row._id === id) {
                return {
                  ...row,
                  status: e.target.value,
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
          <div>{responsable !== null ? <div>{responsable.name}</div> : <div>Unknown</div>}</div>
        )
      },
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      width: 100,
      filters: [
        { text: 'financial', value: 'financial' },
        { text: 'technical', value: 'technical' },
        { text: 'error', value: 'error' },
      ],
      onFilter: (value, record) => {
        return record.category === value
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
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      width: 160,
      sorter: (a, b) => new Date(a.date) - new Date(b.date),
      render: (date) => {
        return <div>{date.substring(0, 10)}</div>
      },
    },
    {
      title: 'Objet',
      dataIndex: 'object',
      key: 'object',
    },
    {
      title: 'Importance',
      key: 'type',
      dataIndex: 'type',
      width: 100,
      filters: [
        { text: 'important', value: 'important' },
        { text: 'urgent', value: 'urgent' },
      ],
      onFilter: (value, record) => {
        return record.type === value
      },
      render: (tag) => {
        return <Tag color={tag === 'important' ? 'volcano' : '#f50'}>{tag.toUpperCase()}</Tag>
      },
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: 130,
      filters: [
        { text: 'solved', value: 'solved' },
        { text: 'not solved yet', value: 'not solved yet' },
      ],
      onFilter: (value, record) => {
        return record.status === value
      },
      render: (status) => {
        return (
          <Text type={status === 'solved' ? 'success' : ''} strong>
            {status}
          </Text>
        )
      },
    },
    {
      title: 'Action',
      key: 'action',
      width: 100,
      render: (data) => {
        const content = (
          <Radio.Group
            defaultValue={data.status}
            onChange={(e) => handleStatusChange(e, data._id, data.status)}
          >
            <Space direction="vertical">
              <Radio value="solved">Solved</Radio>
              <Radio value="not solved yet">Not solved yet</Radio>
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
            {userRole === 'admin' && data.active === true && (
              <Popconfirm
                title="Are you sure to deactivate this reclamation?"
                onConfirm={(e) => handleRemove(e, data._id)}
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
            )}
          </Space>
        )
      },
    },
  ]
}
const Table12 = ({ userRole }) => {
  const [recData, setRecData] = useState([])
  useEffect(() => {
    const URL =
      userRole === 'client'
        ? 'http://localhost:5000/reclamations/getClientReclamations'
        : 'http://localhost:5000/reclamations/getReclamations'
    const fetchData = async () => {
      try {
        const resp = await axios.get(URL, {
          headers: {
            Authorization: `Bearer ${JSON.parse(localStorage.getItem('accessToken'))}`,
          },
        })
        /* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */
        if (resp.data === []) {
          setRecData(resp.data)
        } else {
          setRecData(
            resp.data.map((recl) => {
              return {
                ...recl,
                key: recl._id,
              }
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
      <Table columns={columns(recData, setRecData, userRole)} dataSource={recData} />
    </div>
  )
}

export default Table12
