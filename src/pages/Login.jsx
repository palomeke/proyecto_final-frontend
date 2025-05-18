import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { startLogin } from "../actions/auth";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const result = await dispatch(startLogin(email, password));

      // Verifica si el login fue exitoso
      if (result?.payload?.uid) {
        navigate("/gestor");
      } else {
        // Muestra error específico del backend
        toast.error(result?.error?.message || "Credenciales incorrectas");
      }
    } catch (error) {
      toast.error("Error al conectar con el servidor");
      console.error("Login error:", error);
    }
  };

  return (
    <div className="h-heightWithoutNavbar flex w-full items-center justify-center p-5">
      <form
        className="flex w-full max-w-[420px] flex-col gap-4 rounded-xl bg-white p-5 shadow-xl"
        onSubmit={handleLogin}
      >
        <h1 className="text-2xl font-bold">Login</h1>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col items-start justify-center">
            <label className="font-bold" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full rounded-lg border border-gray-400 p-2 focus:ring focus:ring-blue-500"
              placeholder="your.email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="flex flex-col items-start justify-center">
            <label className="font-bold" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full rounded-lg border border-gray-400 p-2 focus:ring focus:ring-blue-500"
              placeholder="*********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className="rounded-lg bg-blue-500 px-5 py-2 font-bold text-white hover:bg-blue-600"
        >
          Log In
        </button>

        <div className="flex items-center justify-between text-sm">
          <p>New to FindMyNotes?</p>
          <Link to="/signup" className="font-bold">
            Create an account
          </Link>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Login;
