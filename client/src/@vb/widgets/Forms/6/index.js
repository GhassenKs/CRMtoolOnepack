import { React, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Input, Form, Button, Upload, notification } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import { logoutThunk } from 'redux/user/reducers'
import { history } from 'index'
import axios from 'axios'

const jwt = require('jsonwebtoken')

const Form6 = () => {
  const [form] = Form.useForm()
  const dispatch = useDispatch()
  const file = (e) => {
    if (Array.isArray(e)) {
      return e
    }
    return e && e.fileList
  }
  const submit = async (values) => {
    // make the post request to update profile by id
    const myToken = localStorage.getItem('accessToken')
    try {
      const decoded = jwt.verify(JSON.parse(myToken), 'secret')
      const { sub, role } = decoded
      const URL =
        role === 'admin'
          ? `http://localhost:5000/admins/updateAdmin/${sub}`
          : `http://localhost:5000/clients/updateClient/${sub}`
      const data = new FormData()
      data.append('name', values.name)
      data.append('lastName', values.lastName)
      data.append('email', values.email)
      if (values.password) {
        data.append('password', values.password)
      }
      data.append('adress', values.adress)
      data.append('phone', values.phone)
      if (values.upload) {
        data.append('profilePicture', values.upload[0].originFileObj)
      }
      localStorage.setItem('name', values.name)
      dispatch({
        type: 'user/SET_STATE',
        payload: {
          name: values.name,
        },
      })
      const resp = await axios.put(URL, data, {
        headers: {
          Authorization: `Bearer ${myToken}`,
        },
      })
      if (resp.data) {
        localStorage.setItem('img', JSON.stringify(`${resp.data.profilePicture}`))
        notification.success({
          message: 'Profile updated successfully',
        })
        history.push('/')
      } else {
        notification.error({
          message: 'Could not update profile',
        })
      }
    } catch (error) {
      console.log(error)
      dispatch(logoutThunk())
    }
  }
  useEffect(() => {
    const myToken = localStorage.getItem('accessToken')
    try {
      const decoded = jwt.verify(JSON.parse(myToken), 'secret')
      const { sub, role } = decoded
      const url =
        role === 'admin'
          ? `http://localhost:5000/admins/getAdmin/${sub}`
          : `http://localhost:5000/clients/getClient/${sub}`
      const fetchUserData = async () => {
        const resp = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${myToken}`,
          },
        })
        form.setFieldsValue({ ...resp.data, password: '' })
      }
      fetchUserData()
    } catch (error) {
      console.log(error)
      dispatch(logoutThunk())
    }
    // eslint-disable-next-line
  }, [])
  return (
    <div>
      <h6 className="mb-4 text-uppercase">
        <strong>Editer Votre profil</strong>
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
                    name="password"
                    label="Mot de passe"
                    /* rules={[{ required: true, message: 'Mot de passe requis' }]} */
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
                  listType="picture"
                  accept=".png, .jpg, .jpeg, .tiff, .tif, .bmp, .webp"
                  maxCount={1}
                >
                  <Button icon={<UploadOutlined />}>Click to upload</Button>
                </Upload>
              </Form.Item>
            </div>
            <div className="form-group">
              <Form.Item
                label="Adresse"
                name="adress"
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

export default Form6
