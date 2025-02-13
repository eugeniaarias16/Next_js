import React from "react";
import { IsLogin } from "../../components/Login";

export default function LoginPage() {
  return (
    <div className="w-7/10 h-[calc(100vh-6rem)] mt-[4.5rem] m-auto bg-blur rounded-2xl backdrop-blur-2xl shadow-2xl flex justify-center items-center">
      {/* Contenedor del formulario */}
      <IsLogin />
    </div>
  );
}
