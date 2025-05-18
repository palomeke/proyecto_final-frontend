import React from "react";
// Importa la biblioteca principal de React, necesaria para crear componentes.

import "./index.css"; // 👈 Importa Tailwind aquí
import ReactDOM from "react-dom/client";

// Importa el módulo de React que permite interactuar con el DOM, usando la nueva API de creación de raíces introducida en React 18.

import { GestorApp } from "./GestorApp";
// Importa el componente principal de la aplicación desde el archivo GestorApp.js o GestorApp.jsx.

import "react-datetime-picker/dist/DateTimePicker.css";
// Importa los estilos por defecto del componente DateTimePicker (selector de fecha y hora).

import "react-calendar/dist/Calendar.css";
// Importa los estilos por defecto del componente Calendar, necesario si se usa la vista de calendario dentro de DateTimePicker.

import "react-clock/dist/Clock.css";
// Importa los estilos del componente Clock, usado internamente por DateTimePicker si se habilita la funcionalidad de reloj.
// Importa los estilos por defecto del componente react-big-calendar, una librería para mostrar eventos en un calendario tipo Google Calendar.

import "./styles.css";
// Importa los estilos personalizados definidos por el usuario para la aplicación (archivo local styles.css).

const root = ReactDOM.createRoot(document.getElementById("root"));
// Crea una raíz de React a partir del elemento HTML con id "root", donde se montará la aplicación.

root.render(
  <React.StrictMode>
    <GestorApp />
  </React.StrictMode>
);
// Renderiza el componente principal <GestorApp /> dentro del contenedor "root", usando StrictMode para detectar posibles errores o advertencias.
