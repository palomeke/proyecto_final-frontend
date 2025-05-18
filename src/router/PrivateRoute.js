import React from "react";
// Importa la librería React necesaria para crear componentes.

import PropTypes from "prop-types";
// Importa PropTypes, una herramienta para validar las propiedades (props) que recibe el componente.

import { Navigate } from "react-router-dom";
// Importa el componente Navigate de react-router-dom, que se utiliza para redireccionar al usuario programáticamente.

/**
 * Ruta privada que solo permite el acceso si el usuario está autenticado.
 * Si no lo está, redirige a /login.
 */
export const PrivateRoute = ({ isAuthenticated, children }) => {
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};
// Define y exporta el componente PrivateRoute.
// Si el usuario está autenticado (`isAuthenticated` es true), renderiza sus hijos (children).
// Si no lo está, redirige automáticamente a la ruta "/login".

PrivateRoute.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  // Valida que `isAuthenticated` sea un booleano obligatorio.

  children: PropTypes.node.isRequired,
  // Valida que `children` (los componentes hijos) sea un nodo de React obligatorio.
};
