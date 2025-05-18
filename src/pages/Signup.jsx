import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { startRegister } from "../actions/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Las contraseñas no coinciden");
      return;
    }

    try {
      const result = await dispatch(startRegister(email, password, name));

      if (result?.payload?.uid) {
        toast.success("Registro exitoso");
        navigate("/gestor");
      } else {
        toast.error(result?.error?.message || "Error en el registro");
      }
    } catch (error) {
      toast.error("Error al conectar con el servidor");
      console.error("Registration error:", error);
    }
  };

  return (
    <div className="flex w-full items-center justify-center bg-[#f3f4f6] p-5">
      <form
        className="flex w-full max-w-[420px] flex-col gap-4 rounded-xl bg-white p-5 shadow-xl"
        onSubmit={handleRegister}
      >
        <h1 className="text-2xl font-bold">Register</h1>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col items-start justify-center">
            <label className="font-bold" htmlFor="name">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="w-full rounded-lg border border-gray-400 p-2 focus:ring focus:ring-blue-500"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

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

          <div className="flex flex-col items-start justify-center">
            <label className="font-bold" htmlFor="confirmPassword">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              className="w-full rounded-lg border border-gray-400 p-2 focus:ring focus:ring-blue-500"
              placeholder="*********"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className="rounded-lg bg-blue-500 px-5 py-2 font-bold text-white hover:bg-blue-600"
        >
          Register
        </button>

        <div className="flex items-center justify-between text-sm">
          <p>Already have an account?</p>
          <Link to="/login" className="font-bold">
            Login
          </Link>
        </div>
        <ToastContainer />
      </form>
    </div>
  );
};

export default Signup;
