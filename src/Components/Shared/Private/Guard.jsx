import { Navigate, useLocation } from "react-router-dom";

import PropTypes from 'prop-types'; 
import Spinner from "../Spinner/Spinner";
import { useAuth } from "../../../Utils/useAuthHelper";

const Guard = ({ children }) => {
  const { user, loading } = useAuth()
  const location = useLocation();

  if (loading) return <Spinner></Spinner>

  if (user) {
    return children;
  }

    return <Navigate state={location.pathname} to="/sign-in"></Navigate>;


};

Guard.propTypes = {
  children: PropTypes.node 
}

export default Guard;