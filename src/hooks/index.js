import axios from 'axios'
import { clearCookie } from '../api/auth'

const axiosSecure = axios.create({
  baseURL: 'https://contest-hub-server-kappa.vercel.app',
  withCredentials: true,
})

axiosSecure.interceptors.response.use(
  response => response,
  async error => {
    console.log('Error tracked in the interceptor', error.response)
    if (
      error.response &&
      (error.response.status === 401 || error.response.status === 403)
    ) {
      await clearCookie()
      window.location.replace('/login')
    }

    return Promise.reject(error)
  }
)

export default axiosSecure
