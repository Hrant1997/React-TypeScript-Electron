

import React, { useEffect } from 'react'
import AuthContext from '../contexts/authContext'
import { Navigate, useLocation } from 'react-router-dom'
import axios from 'axios'

const CheckAuthWrapper = ({children}: React.PropsWithChildren) => {
  const location = useLocation()
  const { auth, setAuth } = React.useContext(AuthContext)
  const credentials = localStorage.getItem('credentials')
    
  useEffect(() => {
    axios.post(`http://localhost:4000/login?${credentials}`)
      .then(() => {
        setAuth({ loggedIn: true })
      })
      .catch(() => {
        setAuth({ loggedIn: false })
      })
  }, [credentials, setAuth])

  const isLoginPage = location.pathname.includes('login')

  if (!auth.loggedIn && !isLoginPage) {
    return <Navigate to='login' />
  }

  if (auth.loggedIn && isLoginPage) {
    return <Navigate to='/' />
  }

  return <>{children}</>
}

export default CheckAuthWrapper