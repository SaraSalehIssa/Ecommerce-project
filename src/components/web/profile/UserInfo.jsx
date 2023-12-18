import React, { useContext } from 'react'
import { UserContext } from '../context/User';
import style from './Profile.module.css'

function UserInfo() {
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
                <img className={`${style.photo}`} src={userData.image.secure_url} alt="user image" />
                <h2 className='text-capitalize '>{userData.userName}</h2>
                <p className={`${style.role}`}>{userData.role}</p>
            </div>
        </>
    )
}

export default UserInfo