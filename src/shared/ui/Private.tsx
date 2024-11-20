import React, { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";

import PropTypes from "prop-types";
import { useAuth } from "../../Utils/useAuthHelper";
import FoodPageSpinner from "./loading/Spinner";
import { useAppSelector } from "../../redux/hooks";
import { selectToken, selectUser } from "../../redux/features/auth/auth.slice";

const ProtectedRoutes = ({ children }: { children: ReactNode }) => {
  // @ts-ignore

  const user = useAppSelector(selectUser);
  const token = useAppSelector(selectToken);

  if (!token) {
    return <Navigate to={"/sign-in"} replace={true} />;
  }

  const location = useLocation();

  if (user) {
    return children;
  }

  return <Navigate state={location.pathname} to="/sign-in"></Navigate>;
};

ProtectedRoutes.propTypes = {
  children: PropTypes.node,
};

export default ProtectedRoutes;
