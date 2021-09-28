import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Input, Button, Form, notification } from 'antd'
import { Link } from 'react-router-dom'
import { loginThunk } from 'redux/user/reducers'
import logo from '../../../../assets/logo.svg'
import style from '../style.module.scss'

const Login = () => {
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const onFinish = ({ email, password }) => {
    dispatch(loginThunk(email, password))
  }

  const onFinishFailed = (errorInfo) => {
    notification.error({ message: errorInfo })
  }

  return (
    <div className="mt-4">
      <div className="pt-2 pb-5 text-center">
        <div className={style.logo}>
          <img src={logo} alt="logo" height="70px" width="70px" />
        </div>
        <h1>
          <strong className={style.mainLogo}>CRM Dashboard</strong>
        </h1>
      </div>
      <div className={`card ${style.container}`}>
        <div className="text-dark font-size-32 mb-3">Sign In</div>
        <Form
          layout="vertical"
          hideRequiredMark
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          className="mb-4"
          initialValues={{ email: 'seif@test.com', password: 'seif' }}
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

export default Login
