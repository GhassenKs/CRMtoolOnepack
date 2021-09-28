import { React, useState, useEffect } from 'react'
import { Input, Form, Button, Select, notification } from 'antd'
import { history } from 'index'
import axios from 'axios'
import { getId } from 'redux/user/reducers'

const { Option } = Select

const Form9 = ({ userId }) => {
  /* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */
  const [projet, setProjet] = useState(JSON.parse(localStorage.getItem('projet')))
  const [bills, setBills] = useState([])
  const [invoices, setInvoices] = useState([])
  const [clients, setClients] = useState([])
  /*  title,
   description,
   category,
   price,
   responsableId,
   clientId,
   status,
   billId,
   invoiceId, */
  const [form] = Form.useForm()
  const fetchProjet = async () => {
    setProjet(await JSON.parse(localStorage.getItem('projet')))
  }

  const fetchInvoices = async () => {
    try {
      const resp = await axios.get('http://localhost:5000/invoices/getInvoices')
      setInvoices(
        resp.data.filter((b) => {
          return b.responsable._id === userId
        }),
      )
    } catch (err) {
      console.log(err)
    }
  }

  const fetchBills = async () => {
    try {
      const resp = await axios.get('http://localhost:5000/bills/getBills')
      setBills(
        resp.data.filter((b) => {
          return b.responsable._id === userId
        }),
      )
    } catch (err) {
      console.log(err)
    }
  }

  const fetchClients = async () => {
    try {
      const resp = await axios.get('http://localhost:5000/clients/getClients', {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem('accessToken'))}`,
        },
      })
      setClients(
        resp.data.map((c) => {
          return {
            id: c._id,
            name: c.name,
          }
        }),
      )
    } catch (err) {
      console.log(err)
    }
  }

  const fetchData = () => {
    fetchBills()
    fetchInvoices()
    fetchClients()
  }

  useEffect(() => {
    fetchProjet()
    fetchData()
    return () => {
      localStorage.removeItem('projet')
    }
    // eslint-disable-next-line
  }, [])
  const submit = async (values) => {
    const data = new FormData()
    data.append('billId', values.billId)
    data.append('invoiceId', values.invoiceId)
    data.append('title', values.title)
    data.append('description', values.description)
    data.append('category', values.category)
    data.append('price', values.price)
    data.append('status', values.status)
    try {
      const res = await axios.put(
        `http://localhost:5000/projets/updateProjet/${projet.id}`,
        {
          ...values,
          responsableId: getId(),
          clientId: values.clientId !== projet.client.name ? values.client : projet.client._id,
        },
        {
          headers: {
            Authorization: `Bearer ${JSON.parse(localStorage.getItem('accessToken'))}`,
          },
        },
      )
      if (res.data) {
        console.log(res.data)
        notification.success({
          message: 'project updated',
        })
        history.push('/Projet')
      } else {
        notification.error({
          message: 'Erreur',
        })
      }
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div>
      <h6 className="mb-4 text-uppercase">
        <strong>Editer Votre Projet</strong>
      </h6>
      <div className="row mb-4">
        <div className="col-md-11">
          <Form
            layout="vertical"
            form={form}
            onFinish={submit}
            initialValues={
              projet === null
                ? {}
                : {
                    _id: projet._id,
                    title: projet.title,
                    clientId: projet.client?.name,
                    category: projet.category[0],
                    price: projet.price,
                    submissionDate: projet.submissionDate,
                    description: projet.description,
                    invoiceId: '',
                    billId: '',
                    status: projet.status,
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
                    label="Client"
                    name="clientId"
                    rules={[{ required: true, message: 'Client requis' }]}
                  >
                    <Select style={{ width: 180 }}>
                      {clients.map((c) => (
                        <Select.Option value={c.id} key={c.id}>
                          {c.name}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <Form.Item name="category" label="Category">
                    <Select
                      showSearch
                      style={{ width: 200 }}
                      placeholder="Category"
                      optionFilterProp="children"
                    >
                      <Option value="web">web</Option>
                      <Option value="mobile">mobile</Option>
                    </Select>
                  </Form.Item>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <Form.Item label="Invoice" name="invoiceId">
                    <Select style={{ width: 180 }}>
                      <Select.Option value="" key="ddas">
                        Select an invoice
                      </Select.Option>
                      {invoices.map((i) => (
                        <Select.Option value={i._id} key={i._id}>
                          {i.items.name}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <Form.Item label="Bill" name="billId">
                    <Select style={{ width: 180 }}>
                      <Select.Option value="" key="ddas">
                        Select a bill
                      </Select.Option>
                      {bills.map((b) => (
                        <Select.Option value={b._id} key={b._id}>
                          {b.items.name}
                        </Select.Option>
                      ))}
                    </Select>
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
            <div className="row">
              <div className="form-group ml-4">
                <Form.Item name="status" label="Status">
                  <Select
                    showSearch
                    style={{ width: 200 }}
                    placeholder="Status"
                    optionFilterProp="children"
                  >
                    <Option value="pending..">pending</Option>
                    <Option value="accepted">accepted</Option>
                    <Option value="on hold">on hold</Option>
                  </Select>
                </Form.Item>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <Form.Item
                    label="Description"
                    name="description"
                    rules={[{ required: true, message: 'Description requis' }]}
                  >
                    <Input />
                  </Form.Item>
                </div>
              </div>
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

export default Form9
