<<<<<<< HEAD

=======
>>>>>>> 1b1f3d8f7a228243baf398500d2ae620539a889d
import { useContext } from "react"
import { AuthContext } from "../Providers/🛡️AuthProvider"

export const useAuth = () => {
      const all = useContext(AuthContext)
      return all
}