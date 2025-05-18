import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="flex items-center justify-center p-16">
      <div className="flex h-full w-full flex-col gap-10 px-20 lg:flex-row lg:justify-between">
        <div className=" lg:w-[450px]">
          <h2 className="relative mb-3 text-2xl font-black before:absolute before:top-[30px] before:h-[3px] before:w-[50px] before:bg-blue-500">
            Sobre nosotros
          </h2>
          <p className="text-gray-600">
            Como tu planificación no siempre es perfecta, necesitas poder
            estudiar cuando y donde quieras. Simplemente lee tus apuntes una
            última vez en tu tableta o teléfono mientras estás fuera de casa.
          </p>
        </div>
        <div className="">
          <h2 className="relative mb-3 text-2xl font-black before:absolute before:top-[30px] before:h-[3px] before:w-[50px] before:bg-blue-500">
            Links de rapido acceso
          </h2>
          <ul className="text-gray-600">
            <li className="mb-1">
              <Link to="/about">About</Link>
            </li>
            <li className="mb-1">
              <Link to="/faq">FAQ</Link>
            </li>
          </ul>
        </div>
        <div className="">
          <h2 className="relative mb-3 text-2xl font-black before:absolute before:top-[30px] before:h-[3px] before:w-[50px] before:bg-blue-500">
            Informacion de contacto
          </h2>
          <ul className="text-gray-600">
            <li className="mb-1">
              <Link to="/faq">+591 79573025</Link>
            </li>
            <li className="mb-1">
              <Link to="/faq">pablo.chuquimia@ucb.edu.bo</Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
