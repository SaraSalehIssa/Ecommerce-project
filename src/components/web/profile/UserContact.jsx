import React, { useContext } from 'react'
import { UserContext } from '../context/User';
import style from './Profile.module.css'

function UserContact() {
    const { userData, loading } = useContext(UserContext);

    if (loading) {
        return (
            <div className="d-flex justify-content-center my-5">
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        )
    }

    return (
        <>
            <div className={`${style.cardData}`}>
                <p className={`${style.email}`}>{userData.email}</p>
                <p className={`${style.phone}`}>{userData.phone}</p>
            </div>
        </>
    )
}

export default UserContact