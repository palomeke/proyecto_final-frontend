import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Hero = () => {
  const uid = useSelector((state) => state.auth?.uid);
  const isAuthenticated = !!uid;

  return (
    <div className="bg-unsplashBgImage relative flex h-full items-center justify-center bg-cover bg-center bg-no-repeat">
      <div className="absolute inset-0 bg-black bg-opacity-50" />
      <div className="relative z-10 w-full max-w-[860px] text-center text-white">
        <h1 className="text-4xl font-black md:text-5xl">
          Proyecto de Gestor de Tareas
        </h1>
        <p className="mt-5 text-sm font-light md:text-xl md:font-normal">
          Bienvenido a Find My Notes, donde los estudiantes se unen para
          organizar, acceder y compartir fácilmente sus notas. Dile adiós a los
          cuadernos dispersos; optimiza tu rutina de estudio y emprende un
          camino hacia la excelencia académica. Simplifica tu vida estudiantil,
          haz que tus notas trabajen para ti: descubre una nueva era de
          innovación. ¡Empieza hoy!
        </p>
        <div className="mt-5">
          {/* <Link to="/search">
            <button className="rounded-xl bg-white px-7 py-4 font-black text-blue-500 ">
              Get Started
            </button>
          </Link> */}
          <div
            className="flex items-center justify-center gap-5
          "
          >
            {isAuthenticated ? (
              <Link
                to="/search"
                className="mr-10 rounded-xl bg-white px-6 py-3 text-lg font-bold text-blue-500 hover:bg-gray-100"
              >
                Get Started
              </Link>
            ) : (
              <>
                <Link to="/login">
                  <button className="rounded-xl bg-white px-7 py-4 font-black text-blue-500 ">
                    Login
                  </button>
                </Link>
                <Link to="/signup">
                  <button className="rounded-xl bg-white px-7 py-4 font-black text-blue-500 ">
                    Signup
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
