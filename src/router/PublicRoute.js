// src/router/PublicRoute.js
import React from "react";
import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";

/**
 * Ruta pública que bloquea el acceso a usuarios autenticados.
 * Si el usuario está autenticado, lo redirige al home ("/").
 */
export const PublicRoute = ({ isAuthenticated, children }) => {
  return !isAuthenticated ? children : <Navigate to="/" replace />;
};

PublicRoute.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
};
