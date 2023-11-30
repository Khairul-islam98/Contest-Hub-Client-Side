import { useQuery } from "@tanstack/react-query"
import useAuth from "./useAuth"
import { getRole } from "../api/auth"

const useRole = () => {
    const { user, loading } = useAuth()
    const { data: role, isLoading } = useQuery({
      enabled: !loading && !!user?.email,
      queryFn: async () => await getRole(user?.email),
      queryKey: ['role'],
    })
  
    return [role, isLoading]
  }
  
  export default useRole
  