import { React, useState, useEffect } from 'react'
import { Input, Form, Button, Select, notification } from 'antd'

import { history } from 'index'
import axios from 'axios'

const { Option } = Select

const Form8 = () => {
  /* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */
  const [produit, setProduit] = useState(JSON.parse(localStorage.getItem('produit')))
  console.log(produit)
  const [form] = Form.useForm()
  const fetchProduit = async () => {
    const tempProduit = await JSON.parse(localStorage.getItem('produit'))
    console.log(tempProduit)
    setProduit(tempProduit)
  }

  useEffect(() => {
    fetchProduit()
    return () => {
      localStorage.removeItem('produit')
    }
  }, [])
  const submit = async (values) => {
    try {
      const res = await axios.put(
        `http://localhost:5000/products/updateProduct/${produit._id}`,
        {
          ...values,
          users: produit.users,
          sale: produit.sale,
          discount: produit.discount,
          responsable: produit.responsable._id,
        },
        {
          headers: {
            Authorization: `Bearer ${JSON.parse(localStorage.getItem('accessToken'))}`,
          },
        },
      )
      if (res.data) {
        notification.success({
          message: 'product updated',
        })
        history.push('/Produit')
      } else {
        notification.error({
          message: 'Erreur',
        })
      }
    } catch (err) {
      console.log(err)
    }
  }
  const onChange = (value) => {
    console.log(`selected ${value}`)
  }

  const onBlur = () => {
    console.log('blur')
  }

  const onFocus = () => {
    console.log('focus')
  }

  const onSearch = (val) => {
    console.log('search:', val)
  }

  return (
    <div>
      <h6 className="mb-4 text-uppercase">
        <strong>Editer Votre Produit</strong>
      </h6>
      <div className="row mb-4">
        <div className="col-md-11">
          <Form
            layout="vertical"
            form={form}
            onFinish={submit}
            initialValues={
              produit === null
                ? {}
                : {
                    type: produit.subscription.type,
                    sale: produit.sale,
                    discount: produit.discount,
                    responsable: produit.responsable.name,
                    dateOfCreation: produit.dateOfCreation,
                    title: produit.title,
                    price: produit.price,
                    subscription: produit.subscription,
                    users: produit.users,
                    description: produit.description,
                  }
            }
          >
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <Form.Item
                    label="Title"
                    name="title"
                    rules={[{ required: true, message: 'Title requis' }]}
                  >
                    <Input />
                  </Form.Item>
                </div>
              </div>

              <div className="col-md-6">
                <div className="form-group">
                  <Form.Item
                    label=" Price"
                    name="price"
                    rules={[
                      { required: true, message: 'Prix requis' },
                      () => ({
                        validator(_, value) {
                          if (!value || value.toString().replace(/[0-9]/g, '').length === 0)
                            return Promise.resolve()
                          return Promise.reject(new Error('Prix invalide'))
                        },
                      }),
                    ]}
                  >
                    <Input addonBefore="DT" />
                  </Form.Item>
                </div>
              </div>
            </div>

            <div className="form-group">
              <Form.Item name="type">
                <Select
                  showSearch
                  style={{ width: 200 }}
                  placeholder="Subscription"
                  optionFilterProp="children"
                  onChange={onChange}
                  onFocus={onFocus}
                  onBlur={onBlur}
                  onSearch={onSearch}
                  filterOption={(input, option) =>
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                >
                  <Option value="Gold">Gold</Option>
                  <Option value="Basic">Basic</Option>
                  <Option value="FREE">Free</Option>
                </Select>
              </Form.Item>
            </div>

            <div className="form-group">
              <Form.Item
                label="Description"
                name="description"
                rules={[{ required: true, message: ' requise' }]}
              >
                <Input />
              </Form.Item>
            </div>
            <div>
              <Form.Item>
                <Button
                  htmlType="submit"
                  type="primary"
                  className="btn btn-lg btn-success width-200"
                >
                  Editer
                </Button>
              </Form.Item>
            </div>
          </Form>
        </div>
      </div>
    </div>
  )
}

export default Form8
