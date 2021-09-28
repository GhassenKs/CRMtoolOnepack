import React, { useEffect, useState } from 'react'
import { Input, Form, Select, DatePicker, Upload, Button, notification } from 'antd'
import { history } from 'index'
import { UploadOutlined } from '@ant-design/icons'
import axios from 'axios'

const { TextArea } = Input
/* eslint no-underscore-dangle: ["error", { "allow": ["_id","_d"] }] */

const Form1 = ({ type, userId }) => {
  const [form] = Form.useForm()
  const [clients, setClients] = useState([])

  const file = (e) => {
    if (Array.isArray(e)) {
      return e
    }
    return e && e.fileList
  }

  const submit = async (values) => {
    const URL =
      type === 'devis'
        ? 'http://localhost:5000/invoices/addInvoice'
        : 'http://localhost:5000/bills/addBill'
    const data = new FormData()

    data.append('client', values.client)
    data.append('responsable', userId)
    data.append('description', values.description)
    data.append('price', values.price)
    data.append('name', values.name)
    data.append('paid', false)
    data.append('status', values.status)
    data.append('deadline', new Date(values.deadline._d))

    if (values.image) {
      data.append(
        'image',
        values.image.map((i) => {
          return i.originFileObj
        }),
      )
    }
    try {
      const resp = await axios.post(URL, data)
      if (resp.data) {
        notification.success({
          message: 'Success',
        })
        history.push(type === 'devis' ? '/Devis' : '/Facture')
      } else {
        notification.error({
          message: 'Error',
        })
      }
    } catch (err) {
      console.log(err)
    }
  }
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
    // eslint-disable-next-line
  }, [])
  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 4 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 12 },
    },
  }

  return (
    <div>
      <h5 className="text-dark mb-4">{type === 'devis' ? 'Nouveau devis' : 'Nouvelle facture'}</h5>
      <Form
        {...formItemLayout}
        labelAlign="left"
        form={form}
        onFinish={submit}
        initialValues={{
          client: '',
        }}
      >
        <Form.Item
          name="client"
          label="Client"
          rules={[{ required: true, message: 'Client requis' }]}
        >
          <Select style={{ width: 180 }}>
            <Select.Option value="" key="x">
              Select a client
            </Select.Option>
            {clients.map((client) => (
              <Select.Option value={client._id} key={client._id}>
                {client.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name="name" label="Nom" rules={[{ required: true, message: 'Nom requis' }]}>
          <Input placeholder="nom" />
        </Form.Item>
        <Form.Item
          name="status"
          label="Status"
          rules={[{ required: true, message: 'Status requis' }]}
        >
          <Input placeholder="status" />
        </Form.Item>
        <Form.Item
          name="description"
          label="Description"
          rules={[{ required: true, message: 'Description requise' }]}
        >
          <TextArea rows={4} placeholder="Description" />
        </Form.Item>
        <Form.Item
          name="price"
          label="Prix"
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
          className="mb-3"
        >
          <Input placeholder="Prix" addonBefore="DT" />
        </Form.Item>
        <Form.Item
          name="deadline"
          label="Deadline"
          rules={[{ required: true, message: 'Date requise' }]}
        >
          <DatePicker />
        </Form.Item>
        <Form.Item name="image" label="Images" valuePropName="fileList" getValueFromEvent={file}>
          <Upload listType="picture" accept=".png, .jpg, .jpeg, .tiff, .tif, .bmp, .webp">
            <Button icon={<UploadOutlined />}>Click to upload</Button>
          </Upload>
        </Form.Item>
        <button type="submit" className="btn btn-success px-5">
          {type === 'devis' ? 'Ajouter devis' : 'Ajouter facture'}
        </button>
      </Form>
    </div>
  )
}

export default Form1
