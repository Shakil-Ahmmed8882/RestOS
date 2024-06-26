import axiosSecure from '.'

// Save user data in database
export const saveUser = async user => {


  const currentUser = {
    // name from signup as hard name or from firebase 
    name:user.displayName? user.displayName: user.name,
    email: user?.email,
    role: 'guest',
    status: 'Verified',
  }
  const { data } = await axiosSecure.put(`/users/${user?.email}`, currentUser)
  
  return data
}

// Get token from server
export const getToken = async email => {
  const { data } = await axiosSecure.post(`/jwt`, email)
  console.log('Token received from server------>', data)
  return data
}

// Clear token from browser
export const clearCookie = async () => {
  const { data } = await axiosSecure.get('/logout')
  return data
}

// Get user role
export const getRole = async email => {
  const { data } = await axiosSecure(`/user/${email}`)
  return data.role
}

// Get user role
export const getUsers = async () => {
  const { data } = await axiosSecure.get(`/users`)

  return data
}
