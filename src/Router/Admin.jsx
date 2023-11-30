import { Navigate } from "react-router-dom"
import Loader from "../components/Loader/Loader"
import useRole from "../hooks/useRole"

const Admin = ({ children }) => {
    const [role, isLoading] = useRole()
  
    if (isLoading) return <Loader />
    if (role === 'admin') return children
    return <Navigate to='/dashboard' />
  }
  
  export default Admin
  