import React, { useState, useEffect } from 'react'
import './Navbar.scss'

import { useNavigate } from 'react-router-dom';
const Nav = () => {
  const navigate = useNavigate();
  const [token, setToken] = useState('')

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("token")
    setToken("")
    navigate('/')
}

  return (
    <div className='container'>
      <nav class="navbar navbar-expand-lg">
        <div class="container-fluid">
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class=" collapse navbar-collapse" id="navbarTogglerDemo01">
            <img className="nav__logo me-3" src='' alt="navbar logo" />

            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="#">Home</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">Service</a>
              </li>
              <li class="nav-item">
                <a class="nav-link disabled" aria-disabled="true">Disabled</a>
              </li>
            </ul>
            {!token ? (
              <>
                <button onClick={() => navigate('/login')} className='me-3'>Login</button>
              </>
            ) : (
              <img onClick={logout} src='' alt="" className='nav__avt me-3 rounded-circle' />
            )}
            <button class="btn" type="submit">Book Now</button>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Nav
