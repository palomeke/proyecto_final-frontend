import React from "react";
import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";

/**
 * Ruta privada que solo permite el acceso si el usuario está autenticado.
 * Si no lo está, redirige a /login.
 */
export const PrivateRoute = ({ isAuthenticated, children }) => {
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

PrivateRoute.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
};
