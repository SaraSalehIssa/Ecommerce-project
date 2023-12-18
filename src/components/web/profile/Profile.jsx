import React from 'react'
import { Link, Outlet } from 'react-router-dom';
import style from './Profile.module.css'

function Profile() {
    return (
        <aside className={`${style.profile}`}>
            <div className={`${style.profileLinks}`}>
                <nav>
                    <Link to=''>Information</Link>
                    <Link to='contact'>Contact</Link>
                    <Link to='order'>Order</Link>
                </nav>
            </div>
            <div className={`${style.userData}`}>
                <Outlet />
            </div>
        </aside>
    )
}

export default Profile