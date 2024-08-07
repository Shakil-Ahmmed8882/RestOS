// @ts-nocheck
import { useAuth } from "../../../Utils/useAuthHelper";

const UserName = () => {
  const { user } = useAuth();
  return <h2>{user?.displayName}</h2>;
};

export default UserName;
