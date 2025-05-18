// src/router/PublicRoute.js

import React from "react";
// Importa la librería React, necesaria para trabajar con JSX y componentes.

import PropTypes from "prop-types";
// Importa PropTypes para validar el tipo de las props que recibe el componente.

import { Navigate } from "react-router-dom";
// Importa Navigate, que se usa para redirigir programáticamente a otra ruta.

/**
 * Ruta pública que bloquea el acceso a usuarios autenticados.
 * Si el usuario está autenticado, lo redirige al home ("/").
 */
export const PublicRoute = ({ isAuthenticated, children }) => {
  return !isAuthenticated ? children : <Navigate to="/" replace />;
};
// Define y exporta el componente PublicRoute.
// Si el usuario NO está autenticado (`isAuthenticated` es false), renderiza los componentes hijos (por ejemplo, el formulario de login).
// Si el usuario ya está autenticado, lo redirige automáticamente al home ("/") para evitar que vuelva al login.

PublicRoute.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  // Valida que la prop `isAuthenticated` sea un booleano obligatorio.

  children: PropTypes.node.isRequired,
  // Valida que `children` (los componentes hijos) sea un nodo de React obligatorio.
};
