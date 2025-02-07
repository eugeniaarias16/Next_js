import React from "react";
import { IsLogin } from "../../components/Login";

export default function Page() {
  return (
    <div className="w-7/10 h-[calc(100vh-6rem)] mt-[4.5rem] m-auto bg-sand/30 rounded-2xl backdrop-blur-2xl shadow-2xl">
      {/* Contenedor del formulario */}
      <IsLogin />
    </div>
  );
}
