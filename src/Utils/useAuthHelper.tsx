import { useContext } from "react"
import { AuthContext } from "../Providers/AuthProvider"

export const useAuth = () => {
      const all = useContext(AuthContext)
      return all
}

