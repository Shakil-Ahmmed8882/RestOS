// @ts-nocheck
import { useAuth } from "../../../Utils/useAuthHelper";



const UserEmail = () => {
    const {user} = useAuth()
  return (
    <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">{user?.email}</p>
  );
};

export default UserEmail; 