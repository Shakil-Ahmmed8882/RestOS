/* eslint-disable react/prop-types */
import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../Utils/useAuthHelper'
// import Loader from '../components/Shared/Loader'

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth()
  
  const location = useLocation()
  
  if (loading) return 'loading'
  if (user) return children
  return <Navigate to='/sign-in' state={{ from: location }} replace='true' />
}

export default PrivateRoute
