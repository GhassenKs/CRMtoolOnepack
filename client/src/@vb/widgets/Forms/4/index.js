import React from 'react'
import { Input, Form, Button, notification } from 'antd'
import axios from 'axios'
import { history } from 'index'

const Form4 = () => {
  const [form] = Form.useForm()

  const submit = async (values) => {
    try {
      const resp = await axios.post(
        'http://localhost:5000/clients/register',
        {
          name: values.name,
          lastName: values.lastName,
          email: values.email,
          phone: parseInt(values.phone, 10),
          adress: 'my addr',
          password: values.password,
        },
        {
          headers: {
            Authorization: `Bearer ${JSON.parse(localStorage.getItem('accessToken'))}`,
          },
        },
      )
      if (resp) {
        console.log(resp.data)
        notification.success({
          message: 'client added successfully',
        })
        history.push('/client')
      }
    } catch (err) {
      notification.error({
        message: err,
      })
    }
  }
  return (
    <div>
      <h6 className="mb-4 text-uppercase">
        <strong>Creer un profil</strong>
      </h6>
      <div className="row mb-4">
        <div className="col-md-11">
          <Form layout="vertical" form={form} onFinish={submit}>
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <Form.Item
                    label="Prénom"
                    name="name"
                    rules={[{ required: true, message: 'Prénom requis' }]}
                  >
                    <Input />
                  </Form.Item>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <Form.Item
                    label=" Nom"
                    name="lastName"
                    rules={[{ required: true, message: 'Nom requis' }]}
                  >
                    <Input />
                  </Form.Item>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                      { type: 'email', message: 'Email invalide' },
                      { required: true, message: 'Email requis' },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <Form.Item
                    label="Numéro de téléphone"
                    name="phone"
                    rules={[
                      { required: true, message: 'Numéro de téléphone requis' },
                      () => ({
                        validator(_, value) {
                          if (!value || value.toString().replace(/[^0-9]/g, '').length === 8)
                            return Promise.resolve()
                          return Promise.reject(new Error('Numero invalide'))
                        },
                      }),
                    ]}
                  >
                    <Input addonBefore="+216" />
                  </Form.Item>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <Form.Item
                    name="password"
                    label="Mot de passe"
                    rules={[{ required: true, message: 'Mot de passe requis' }]}
                    hasFeedback
                  >
                    <Input.Password />
                  </Form.Item>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <Form.Item
                    name="confirm"
                    label="Confirmer mot de passe"
                    rules={[
                      { required: true, message: 'Confimer le mot de passe' },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (!value || getFieldValue('password') === value)
                            return Promise.resolve()
                          return Promise.reject(new Error('Les mots de passe ne correspondent pas'))
                        },
                      }),
                    ]}
                    hasFeedback
                  >
                    <Input.Password />
                  </Form.Item>
                </div>
              </div>
            </div>

            <div>
              <Form.Item>
                <Button htmlType="submit" className="btn btn-lg btn-success width-200">
                  Creer
                </Button>
              </Form.Item>
            </div>
          </Form>
        </div>
      </div>
    </div>
  )
}

export default Form4
