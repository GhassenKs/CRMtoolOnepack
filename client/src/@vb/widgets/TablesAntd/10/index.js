import React, { useState, useEffect } from 'react'
import { notification, Table, Popconfirm } from 'antd'
import { history } from 'index'
import axios from 'axios'

const renderLink = async (
  _id,
  title,
  price,
  subscription,
  users,
  description,
  sale,
  recent,
  dateOfCreation,
  responsable,
  discount,
) => {
  localStorage.setItem(
    'produit',
    JSON.stringify({
      _id,
      title,
      price,
      subscription,
      users,
      description,
      sale,
      recent,
      dateOfCreation,
      responsable,
      discount,
    }),
  )
  history.push('/EditProduit')
}

const columns = (produits, setProduits) => {
  const cancel = (e) => {
    console.log(e)
  }
  const handleRemove = async (e, _id) => {
    e.preventDefault()
    setProduits(
      produits.filter((p) => {
        return p._id !== _id
      }),
    )
    try {
      const resp = await axios.delete(`http://localhost:5000/products/removeProduct/${_id}`)
      if (resp.data) {
        notification.success({
          message: 'Product deleted',
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
      title: 'DateOfCreation',
      key: 'dateOfCreation',
      width: 130,
      sorter: (a, b) => new Date(a.dateOfCreation) - new Date(b.dateOfCreation),
      render: ({ dateOfCreation }) => {
        return <div>{dateOfCreation.substring(0, 10)}</div>
      },
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
      title: 'Discount',
      dataIndex: 'discount',
      key: 'discount',

      render: (text) => (
        <a className="btn btn-sm btn-light" href="#" onClick={(e) => e.preventDefault()}>
          {text}
        </a>
      ),
    },
    {
      title: 'Sale',
      dataIndex: 'sale',
      key: 'sale',

      render: (sale) => {
        return (
          <span
            className={
              sale === true
                ? 'font-size-12 badge badge-primary'
                : 'font-size-12 badge badge-default'
            }
          >
            {`${sale}`}
          </span>
        )
      },
    },
    {
      title: 'Subscription',
      key: 'subscription',
      render: ({ subscription }) => <span>{subscription?.type}</span>,
    },

    {
      title: 'Action',
      key: 'action',
      render: ({
        _id,
        title,
        price,
        subscription,
        users,
        description,
        sale,
        recent,
        dateOfCreation,
        responsable,
        discount,
      }) => (
        <span>
          <a
            href="#/ConsulterProduit"
            onClick={() =>
              renderLink(
                _id,
                title,
                price,
                subscription,
                users,
                description,
                sale,
                recent,
                dateOfCreation,
                responsable,
                discount,
              )
            }
            className="btn btn-sm btn-light mr-2"
          >
            <i className="fe fe-edit mr-2" />
            View
          </a>
          <button
            type="button"
            onClick={() =>
              renderLink(
                _id,
                title,
                price,
                subscription,
                users,
                description,
                sale,
                recent,
                dateOfCreation,
                responsable,
                discount,
              )
            }
            className="btn btn-sm btn-light mr-2"
          >
            <i className="fe fe-edit mr-2" />
            edit
          </button>
          <Popconfirm
            title="Are you sure to delete this product?"
            onConfirm={(e) => handleRemove(e, _id)}
            onCancel={cancel}
            okText="Yes"
            cancelText="No"
          >
            <a href="#" className="btn btn-sm btn-light">
              <small>
                <i className="fe fe-trash mr-2" />
              </small>
              Remove
            </a>
          </Popconfirm>
        </span>
      ),
    },
  ]
}
const Table1 = ({ userId }) => {
  /* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */
  const [produits, setProduits] = useState([])
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const resp = await axios.get('http://localhost:5000/products/getProducts', {
          headers: {
            Authorization: `Bearer ${JSON.parse(localStorage.getItem('accessToken'))}`,
          },
        })
        const newData = resp.data.map((produit) => {
          return { ...produit, key: produit._id }
        })

        const res = newData.filter((p) => {
          return p.responsable._id === userId
        })

        setProduits(res)
      } catch (err) {
        console.log(err)
      }
    }

    fetchProduct()
    // eslint-disable-next-line
  }, [])

  return (
    <div className="table-responsive text-nowrap">
      <Table columns={columns(produits, setProduits)} dataSource={produits} />
    </div>
  )
}
export default Table1
