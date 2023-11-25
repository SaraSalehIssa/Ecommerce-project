import React from 'react'
import AdminNavbar from '../components/dashboard/navbar/AdminNavbar'
import AdminFooter from '../components/dashboard/footer/AdminFooter'
import { Outlet } from 'react-router-dom'

function AdminLayout() {
  return (
    <>
      <AdminNavbar />
      <Outlet />
      <AdminFooter />
    </>
  )
}

export default AdminLayout