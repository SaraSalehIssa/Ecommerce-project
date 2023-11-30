import React from 'react'
import WebNavbar from '../components/web/navbar/WebNavbar'
import WebFooter from '../components/web/footer/WebFooter'
import { Outlet } from 'react-router-dom'

function WebLayout({ user, setUser }) {
    return (
        <>
            <WebNavbar user={user} setUser={setUser} />
            <Outlet />
            <WebFooter />
        </>
    )
}

export default WebLayout