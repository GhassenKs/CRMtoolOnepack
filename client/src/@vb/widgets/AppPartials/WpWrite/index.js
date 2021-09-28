import React, { useEffect, useState } from 'react'
import { UploadOutlined } from '@ant-design/icons'
import { Input, Button, Upload, Form, Select, notification } from 'antd'
import { history } from 'index'
import axios from 'axios'

const { TextArea } = Input

const WpWrite = () => {
  const [form] = Form.useForm()
  const [projects, setProjects] = useState([])
  useEffect(() => {
    const fetchUserProjects = async () => {
      try {
        const resp = await axios.get('http://localhost:5000/projets/getClientProjets', {
          headers: {
            Authorization: `Bearer ${JSON.parse(localStorage.getItem('accessToken'))}`,
          },
        })
        /* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */
        setProjects(
          resp.data.map((project) => {
            return {
              resp: project.responsable._id,
              name: project.title,
            }
          }),
        )
      } catch (err) {
        console.log(err)
      }
    }
    fetchUserProjects()
  }, [])
  const submit = async (values) => {
    const data = new FormData()
    data.append('category', values.category)
    data.append('context', values.context)
    data.append('object', values.object)
    data.append('responsableId', values.project.split(' ')[1])
    data.append('type', values.type)
    data.append('snapshots', values.upload[0].originFileObj)

    try {
      const resp = await axios.post('http://localhost:5000/reclamations/addReclamation', data, {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem('accessToken'))}`,
        },
      })
      if (resp.data.sucess !== 'Reclamation ajouté') {
        notification.error({
          message: "Erreur a l'ajout de la reclamation",
        })
      } else {
        notification.success({
          message: 'Reclamation ajoutee avec succes',
        })
        history.push('/Reclamation')
      }
    } catch (err) {
      console.log(err)
    }
  }

  const file = (e) => {
    if (Array.isArray(e)) {
      return e
    }
    return e && e.fileList
  }
  return (
    <div>
      <h5 className="text-dark mb-4">Nouvelle reclamation</h5>
      <Form
        form={form}
        onFinish={submit}
        initialValues={{
          type: 'important',
          category: 'technical',
          project: '',
        }}
      >
        <Form.Item label="importance" name="type">
          <Select style={{ width: 180 }}>
            <Select.Option value="important" key={0}>
              Important
            </Select.Option>
            <Select.Option value="urgent" key={1}>
              Urgent
            </Select.Option>
          </Select>
        </Form.Item>

        <Form.Item label="category" name="category">
          <Select style={{ width: 180 }} className="ml-3">
            <Select.Option value="technical" key={1}>
              Technical
            </Select.Option>
            <Select.Option value="financial" key={2}>
              Financial
            </Select.Option>
            <Select.Option value="error" key={3}>
              Error
            </Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="Project"
          name="project"
          /*  rules={[{ required: true, message: 'Projet requis' }]} */
        >
          <Select style={{ width: 180 }} className="ml-3">
            <Select.Option value="" key="x">
              Select a project
            </Select.Option>
            {projects.map((project, index) => (
              <Select.Option value={`${index} ${project.resp}`} key={index}>
                {project.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="object"
          label="Object"
          rules={[{ required: true, message: 'Objet requis' }]}
        >
          <Input placeholder="Object" className="ml-3" />
        </Form.Item>

        <Form.Item name="context" rules={[{ required: true, message: 'Description requise' }]}>
          <TextArea rows={4} placeholder="Description" />
        </Form.Item>
        <Form.Item name="upload" valuePropName="fileList" getValueFromEvent={file}>
          <Upload
            name="file"
            listType="picture"
            accept=".png, .jpg, .jpeg, .tiff, .tif, .bmp, .webp"
            /* maxCount={1} */
          >
            <Button>
              <UploadOutlined />
              Ajouter des images
            </Button>
          </Upload>
        </Form.Item>
        <Form.Item>
          <Button className="mr-2" type="primary" style={{ width: 200 }} htmlType="submit">
            Envoyer
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default WpWrite
