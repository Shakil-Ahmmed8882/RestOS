import { useAuth } from "../useAuthHelper"

export const UserProfileImage = () => {
    const {user} = useAuth()
    return user?.photoURL
}

export const UserName = () => {
    const {user} = useAuth()
    return user?.displayName
}