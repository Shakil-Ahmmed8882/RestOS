import React, { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import { useAppSelector } from "../../redux/hooks";
import { selectToken, selectUser } from "../../redux/features/auth/auth.slice";
import { USER_ROLE } from "../../constants";

const ProtectedRoutes = ({ children }: { children: ReactNode }) => {
  const user = useAppSelector(selectUser);
  const token = useAppSelector(selectToken);
  const location = useLocation();
  const pathname = location.pathname;


  
  console.log({user})
  console.log({pathname})
  // If there's no token, redirect to sign-in
  if (!token) {
    return <Navigate to="/sign-in" replace />;
  }

  // If the user is trying to access an admin route but is not an admin
  if (user && user.role !== USER_ROLE.ADMIN && pathname.startsWith("/admin")) {
    return <Navigate to="/" replace />;
  }

  // If the user is trying to access a user-only route and is an admin
  if (user && user.role === USER_ROLE.ADMIN && pathname.startsWith("/user")) {
    return <Navigate to="/" replace />;
  }

  // If user is authenticated, render the children (protected route)
  if (user) {
    return children;
  }

  // If user is not authenticated, redirect to sign-in
  return <Navigate state={location.pathname} to="/sign-in" />;
};

ProtectedRoutes.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProtectedRoutes;
