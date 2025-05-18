import React from "react";
import { Navbar } from "../ui/Navbar";
import { Outlet } from "react-router-dom"; // Para renderizar las rutas hijas

export const TasksScreen = () => {
  return (
    <div className="tasks-screen">
      <Navbar />
      <div className="container mx-auto p-4">
        {/* Esto renderizará TaskListPage, TaskPage o ShowTask según la ruta */}
        <Outlet />
      </div>
    </div>
  );
};
