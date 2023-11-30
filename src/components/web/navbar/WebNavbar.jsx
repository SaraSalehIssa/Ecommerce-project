import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../../../index.css'

function WebNavbar({ user, setUser }) {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("userToken");
    setUser(null);
    navigate('/');
  }
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-lightSkyBlue">
        <div className="container">
          <a className="navbar-brand" href="#">The Girl House</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" to='/'>Home</Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to='/categories'>Categories</Link>
              </li>

              <li className="nav-item">
                <a className="nav-link" href="#">Products</a>
              </li>

              {user &&
                <li className="nav-item">
                  <a className="nav-link" href="#">Cart</a>
                </li>}
            </ul>
            <ul className="navbar-nav">
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Account
                </a>
                <ul className="dropdown-menu ">
                  {!user ? <>
                    <li><Link className="dropdown-item text-capitalize" to='/register'>register</Link></li>
                    <li><hr className="dropdown-divider" /></li>
                    <li><Link className="dropdown-item text-capitalize" to='/login'>login</Link></li>
                  </> :
                    <>
                      <li><Link className="dropdown-item text-capitalize" to='/register'>profile</Link></li>
                      <li><hr className="dropdown-divider" /></li>
                      <li><div className="dropdown-item text-capitalize" onClick={logout}>logout</div></li>
                    </>}
                </ul>
              </li>
            </ul>

          </div>
        </div>
      </nav>
    </>
  )
}

export default WebNavbar