import { Navigate, useLocation } from "react-router-dom";

import PropTypes from 'prop-types'; 
import Spinner from "../Spinner/Spinner";
import { useAuth } from "../../../Utils/useAuthHelper";
import React from "react";

const Private = ({ children }) => {
  // @ts-ignore
  const { user, loading } = useAuth()
  const location = useLocation();

  console.log(user)
  console.log(loading)
  if (loading) return <Spinner></Spinner>


  if (user) {
    return children;
  }

    return <Navigate state={location.pathname} to="/sign-in"></Navigate>;


};

Private.propTypes = {
  children: PropTypes.node 
}

export default Private;