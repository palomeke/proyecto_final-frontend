import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { MdOutlineFileUpload } from "react-icons/md";
import { GiHamburgerMenu } from "react-icons/gi";
import { useDispatch, useSelector } from "react-redux";
import { startLogout } from "../actions/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toastId = React.useRef(null); // Referencia para el toast

  // Accede a los datos desde authReducer
  const { uid, userData } = useSelector((state) => state.auth);
  const isAuthenticated = !!uid;

  const handleLogout = async () => {
    // Cerrar cualquier toast existente antes de mostrar uno nuevo
    if (toastId.current) {
      toast.dismiss(toastId.current);
    }

    try {
      toastId.current = toast.loading("Cerrando sesión...");
      const result = await dispatch(startLogout());

      if (result?.error) {
        toast.update(toastId.current, {
          render: result.error.message || "Error al cerrar sesión",
          type: "error",
          isLoading: false,
          autoClose: 5000,
          closeButton: true,
        });
      } else {
        toast.update(toastId.current, {
          render: "Sesión cerrada correctamente",
          type: "success",
          isLoading: false,
          autoClose: 3000,
          closeButton: true,
        });
        navigate("/login", { replace: true });
      }
    } catch (error) {
      toast.update(toastId.current, {
        render: "Error al cerrar sesión",
        type: "error",
        isLoading: false,
        autoClose: 5000,
        closeButton: true,
      });
      console.error("Logout error:", error);
    } finally {
      toastId.current = null;
    }
  };

  return (
    <header className="flex h-[80px] items-center justify-center shadow-md">
      <div className="mx-5 flex w-full max-w-[1550px] items-center justify-between">
        {/* Logo */}
        <div className="flex h-[60px] w-[120px] items-center justify-center overflow-hidden">
          <img src="/logo.png" alt="Logo" />
        </div>

        {/* Menú hamburguesa (mobile) */}
        <GiHamburgerMenu className="text-xl md:hidden" />

        {/* Navegación principal */}
        <div className="hidden md:flex md:items-center md:justify-center md:gap-4">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>

          {isAuthenticated ? (
            <>
              <Link to="/search">
                <FaSearch className="text-xl" />
              </Link>
              <Link to="/upload">
                <MdOutlineFileUpload className="text-[24px]" />
              </Link>
              {userData && (
                <Link to="/profile">
                  <button className="rounded-xl bg-blue-500 px-5 py-2 font-semibold hover:bg-blue-600">
                    {userData.name || "Perfil"}
                  </button>
                </Link>
              )}
              <button
                className="rounded-xl bg-blue-500 px-5 py-2 font-semibold hover:bg-blue-600"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login">
                <button className="rounded-xl bg-blue-500 px-5 py-2 font-semibold hover:bg-blue-600">
                  Login
                </button>
              </Link>
              <Link to="/signup">
                <button className="rounded-xl bg-blue-500 px-5 py-2 font-semibold hover:bg-blue-600">
                  Signup
                </button>
              </Link>
            </>
          )}
        </div>
      </div>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </header>
  );
};

export default Navbar;
