import axiosSecure from "../hooks"

export const saveUser = async user => {
    const currentUser = {
      name: user.displayName,  
      email: user.email,
      role: 'user',
      status: 'Verified',
    }
    const { data } = await axiosSecure.put(`/users/${user?.email}`, currentUser)
  
    return data
  }

  export const getToken = async email => {
    const { data } = await axiosSecure.post(`/jwt`, { email })
    console.log(data)
    return data
  }
  
  export const clearCookie = async () => {
    const { data } = await axiosSecure.get('/logout')
    return data
  }

  export const getRole = async email => {
    const { data } = await axiosSecure(`/user/${email}`)
    return data.role
  }


  export const getAllUsers = async () => {
    const { data } = await axiosSecure('/users')
    return data
  }
  export const updateRole = async ({ email, role }) => {
    const currentUser = {
      email,
      role,
      status: 'Verified',
    }
    const { data } = await axiosSecure.put(`/users/update/${email}`, currentUser)
    return data
  }
