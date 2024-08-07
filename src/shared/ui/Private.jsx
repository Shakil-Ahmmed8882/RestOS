import React from "react";
import { Navigate, useLocation } from "react-router-dom";

import PropTypes from "prop-types";
import { useAuth } from "../../Utils/useAuthHelper";
import FoodPageSpinner from "./loading/Spinner";


const Private = ({ children }) => {
  // @ts-ignore
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return <FoodPageSpinner></FoodPageSpinner>;

  if (user) {
    return children;
  }

  return <Navigate state={location.pathname} to="/sign-in"></Navigate>;
};

Private.propTypes = {
  children: PropTypes.node,
};

export default Private;
