import React from 'react'
import { Helmet } from 'react-helmet'
import Login from '@vb/components/Auth/Login'
import { useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'

const SystemLogin = () => {
  const id = useSelector((state) => state.user.id)
  return (
    <div>
      <Helmet title="Login-admin" />
      {id === '' ? <Login /> : <Redirect to="/dashboard" />}
    </div>
  )
}

export default SystemLogin
