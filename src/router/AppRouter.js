import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { GestorScreen } from "../components/gestor/GestorScreen";
import { useDispatch, useSelector } from "react-redux";
import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";
import Header from "../pages/Header";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import { startLogin } from "../actions/auth"; // Importa startLogin si lo necesitas

export const AppRouter = () => {
  const dispatch = useDispatch();
  const { checking, uid } = useSelector((state) => state.auth);

  // Verifica si hay un token al cargar la aplicación
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      // Si hay token, podrías disparar una acción para verificar su validez
      // dispatch(verifyToken(token)); // Necesitarías implementar esta acción
    } else {
      // Si no hay token, asegúrate que checking sea false
      // Esto dependerá de cómo manejas el estado en tu reducer de auth
    }
  }, [dispatch]);

  // Si no estás usando realmente checking, puedes simplificar el componente
  return (
    <Router>
      <Header />
      <div>
        <Routes>
          {/* Ruta pública principal */}
          <Route path="/" element={<Home />} />

          {/* Ruta de registro público */}
          <Route path="/signup" element={<Signup />} />

          {/* Ruta de login - solo para no autenticados */}
          <Route
            path="/login"
            element={
              <PublicRoute isAuthenticated={!!uid}>
                <Login />
              </PublicRoute>
            }
          />

          {/* Ruta privada del gestor */}
          <Route
            path="/gestor"
            element={<PrivateRoute isAuthenticated={!!uid}></PrivateRoute>}
          />

          {/* Redirección para rutas no definidas */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
};
