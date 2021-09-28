import React from 'react'
import AdminDashboard from 'components/Admin/AdminDashboard'
import ClientDashboard from 'components/Client/ClientDashboard'
import { useSelector } from 'react-redux'

const Dashboard = () => {
  const user = useSelector((state) => state.user)
  return <div>{user.role === 'admin' ? <AdminDashboard /> : <ClientDashboard />}</div>
}

export default Dashboard
