import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { LoginScreen } from "../components/auth/LoginScreen";
import { GestorScreen } from "../components/gestor/GestorScreen";
import { useDispatch, useSelector } from "react-redux";
import { startChecking } from "../actions/auth";
import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";
export const AppRouter = () => {
  const dispatch = useDispatch();
  const { checking, uid } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(startChecking());
  }, [dispatch]);

  if (checking) {
    return <h5>Espere...</h5>;
  }

  return (
    <Router>
      <Routes>
        {/* Ruta pública (login) */}
        <Route
          path="/login"
          element={
            <PublicRoute isAuthenticated={!!uid}>
              <LoginScreen />
            </PublicRoute>
          }
        />

        {/* Ruta privada (dashboard o gestor) */}
        <Route
          path="/"
          element={
            <PrivateRoute isAuthenticated={!!uid}>
              <GestorScreen />
            </PrivateRoute>
          }
        />

        {/* Redirección para rutas no definidas */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};
