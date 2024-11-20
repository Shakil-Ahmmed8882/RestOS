/* eslint-disable react/prop-types */
import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../Utils/useAuthHelper'
import { useAppSelector } from '../redux/hooks'
import { selectUser } from '../redux/features/auth/auth.slice'
// import Loader from '../components/Shared/Loader'

const PrivateRoute = ({ children }) => {
  const user = useAppSelector(selectUser)
  
  const location = useLocation()
  
  
  console.log(user)

  if (user) return children
  // return <Navigate to='/sign-in' state={{ from: location }} replace='true' />
}

export default PrivateRoute
