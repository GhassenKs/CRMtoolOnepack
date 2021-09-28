import { React, useEffect, useState } from 'react'
import { Input, Form, Button, Select, notification } from 'antd'
import { history } from 'index'
import axios from 'axios'

const { Option } = Select

const Form9 = () => {
  /* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */
  const [form] = Form.useForm()
  const [clients, setClients] = useState([])

  useEffect(() => {
    const getClients = async () => {
      try {
        const resp = await axios.get(`http://localhost:5000/clients/getClients`, {
          headers: {
            Authorization: `Bearer ${JSON.parse(localStorage.getItem('accessToken'))}`,
          },
        })
        setClients(resp.data)
      } catch (err) {
        console.log(err)
      }
    }
    getClients()
  }, [])
  const submit = async (values) => {
    try {
      const resp = await axios.post('http://localhost:5000/projets/addProjet', values, {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem('accessToken'))}`,
        },
      })
      if (resp.data && resp.data.sucess === 'projet ajouté') {
        notification.success({
          message: resp.data.sucess,
        })
        history.push('/Projet')
      } else {
        notification.error({
          message: 'Error',
        })
      }
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div>
      <h6 className="mb-4 text-uppercase">
        <strong>Ajouter Votre Projet</strong>
      </h6>
      <div className="row mb-4">
        <div className="col-md-11">
          <Form
            layout="vertical"
            form={form}
            onFinish={submit}
            initialValues={{
              category: 'web',
              clientId: '',
            }}
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
                      <Select.Option value="" key="ddas">
                        Select a client
                      </Select.Option>
                      {clients.map((client) => (
                        <Select.Option value={client._id} key={client._id}>
                          {client.name}
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
              <div className="form-group">
                <Form.Item name="category" label="Category" className="ml-4">
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
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <Form.Item
                    label="Description"
                    name="description"
                    rules={[{ required: true, message: 'Description requise' }]}
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
                  Ajouter
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
