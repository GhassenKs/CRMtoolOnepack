import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Input, Button, Form, notification } from 'antd'
import { Link } from 'react-router-dom'
import { loginClientThunk } from 'redux/user/reducers'

const LoginClient = () => {
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const onFinish = ({ email, password }) => {
    dispatch(loginClientThunk(email, password))
  }

  const onFinishFailed = (errorInfo) => {
    notification.error({ message: errorInfo })
  }

  return (
    <div className="mt-5 d-flex rounded justify-content-center align-items-center">
      <div className="mt-5">
        <img
          src="https://images.unsplash.com/photo-1620202119243-212a883c5627?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=834&q=80"
          alt=""
          className="rounded-left img-fluid"
          style={{
            width: '300px',
            height: '500px',
            objectFit: 'cover',
          }}
        />
      </div>
      <div
        className="bg-white w-120 p-5 mt-5 rounded-right"
        style={{
          width: '500px',
          height: '500px',
        }}
      >
        <div className="text-dark font-size-32 mb-3">Welcome to your CRM Dashboard!</div>
        <div className="mb-4">Sign in to see updates on your projects</div>
        <Form
          layout="vertical"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          className="mb-4"
          initialValues={{ email: 'medali77@com', password: 'azerty', role: 'client' }}
        >
          <Form.Item
            name="email"
            rules={[{ required: true, message: 'Please input your e-mail address' }]}
          >
            <Input placeholder="Email" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your password' }]}
          >
            <Input type="password" placeholder="Password" />
          </Form.Item>
          <Button
            type="primary"
            className="text-center w-100 btn btn-success"
            htmlType="submit"
            loading={user.loading}
          >
            <strong>Sign in</strong>
          </Button>
        </Form>
        <Link to="/auth/forgot-password" className="vb__utils__link">
          Forgot Password?
        </Link>
      </div>
    </div>
  )
}

export default LoginClient
