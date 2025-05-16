import React from "react";
import { Navbar } from "../ui/Navbar";
import { GestorEvent } from "./GestorEvent";
import { GestorModal } from "./GestorModal";
export const GestorScreen = () => {
  return (
    <div className="gestor-screen">
      <Navbar />
      <GestorModal />
    </div>
  );
};
