import React from "react";
import ReactDOM from "react-dom/client";
import { GestorApp } from "./GestorApp";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css"; // Necesario si estás usando la vista del calendario también
import "react-clock/dist/Clock.css"; // Necesario si está habilitado el reloj
import "./styles.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <GestorApp />
  </React.StrictMode>
);
