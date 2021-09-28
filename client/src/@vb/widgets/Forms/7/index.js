import { React, useState, useEffect } from 'react'
import { Input, Form, Button, Upload, notification } from 'antd'
import { history } from 'index'
import { UploadOutlined } from '@ant-design/icons'
import axios from 'axios'

const Form7 = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')))
  const [form] = Form.useForm()
  const file = (e) => {
    if (Array.isArray(e)) {
      return e
    }
    return e && e.fileList
  }

  const fetchUser = async () => {
    const tempUser = await JSON.parse(localStorage.getItem('user'))
    setUser(tempUser)
  }
  useEffect(() => {
    fetchUser()
    return () => {
      localStorage.removeItem('user')
    }
  }, [])
  const submit = async (values) => {
    // make the post request to update profile by id
    const data = new FormData()
    data.append('name', values.prenom)
    data.append('lastName', values.lastName)
    data.append('email', values.email)
    if (values.password) {
      data.append('password', values.password)
    }
    data.append('adress', values.address)
    data.append('phone', values.tel)
    if (values.upload) {
      data.append('profilePicture', values.upload[0].originFileObj)
    }
    try {
      const resp = await axios.put(`http://localhost:5000/clients/updateClient/${user.id}`, data, {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem('accessToken'))}`,
        },
      })
      if (resp.data) {
        notification.success({
          message: 'Client updated successfully',
        })
        history.push('/client')
      } else {
        notification.error({
          message: 'Could not update client',
        })
      }
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <div>
      <h6 className="mb-4 text-uppercase">
        <strong>Editer client</strong>
      </h6>
      <div className="row mb-4">
        <div className="col-md-11">
          <Form
            layout="vertical"
            form={form}
            onFinish={submit}
            initialValues={
              user === null
                ? {}
                : {
                    prenom: user.prenom,
                    lastName: user.nom,
                    email: user.email,
                    password: user.mdp,
                    tel: user.numero,
                    address: user.adresse,
                  }
            }
          >
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <Form.Item
                    label="Prénom"
                    name="prenom"
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
                    name="password"
                    label="Mot de passe"
                    /*  rules={[{ required: true, message: 'Mot de passe requis' }]} */
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
                      /*  { required: true, message: 'Confimer le mot de passe' }, */
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

              <div className="col-md-6">
                <div className="form-group">
                  <Form.Item
                    label="Numéro de téléphone"
                    name="tel"
                    rules={[
                      { required: true, message: 'Numéro de téléphone requis' },
                      () => ({
                        validator(_, value) {
                          if (value.toString().replace(/[^0-9]/g, '').length === 8)
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
            </div>

            <div className="form-group">
              <Form.Item
                name="upload"
                label="Photo de profil"
                valuePropName="fileList"
                getValueFromEvent={file}
                extra="vous pouvez conserver votre ancienne photo en n'en téléchargeant pas une nouvelle"
              >
                <Upload
                  name="logo"
                  listType="picture"
                  accept=".png, .jpg, .jpeg, .tiff, .tif, .bmp, .webp .jfif"
                  maxCount={1}
                >
                  <Button icon={<UploadOutlined />}>Click to upload</Button>
                </Upload>
              </Form.Item>
            </div>
            <div className="form-group">
              <Form.Item
                label="Adresse"
                name="address"
                rules={[{ required: true, message: 'Adresse requise' }]}
              >
                <Input />
              </Form.Item>
            </div>
            <div>
              <Form.Item>
                <Button htmlType="submit" className="btn btn-lg btn-success width-200">
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

export default Form7
