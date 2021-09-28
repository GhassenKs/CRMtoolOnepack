import React from 'react'
import { Helmet } from 'react-helmet'
import LoginClientC from '@vb/components/Auth/LoginClientC'
import { useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'

const LoginClient = () => {
  const id = useSelector((state) => state.user.id)
  return (
    <div>
      <Helmet title="Login-client" />
      {id === '' ? <LoginClientC /> : <Redirect to="/dashboard" />}
    </div>
  )
}

export default LoginClient
