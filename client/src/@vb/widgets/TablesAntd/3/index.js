import React from 'react'
import { Table, Divider } from 'antd'
import data from './data.json'

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  } /*
  {
    title: 'Tags',
    key: 'tags',
    dataIndex: 'tags',
    render: (tags) => (
      <span>
        {tags.map((tag) => {
          let color = tag.length > 5 ? 'red' : 'green'
          if (tag === 'loser') {
            color = 'volcano'
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          )
        })}
      </span>
    ),
  }, */,
  {
    title: 'Action',
    key: 'action',
    render: (text, record) => (
      <span>
        <a>Invite {record.name}</a>
        <Divider type="vertical" />
        <a href="#/consulterReclamation">Delete</a>
      </span>
    ),
  },
]

class TablesAntdBasic extends React.Component {
  render() {
    return (
      <div className="responsive-table text-nowrap">
        <Table columns={columns} dataSource={data} />
      </div>
    )
  }
}

export default TablesAntdBasic
