import React from "react";
import Image from "next/image";

export default function Banner({ image }) {
  return (
    <div className="relative w-full h-[calc(100vh-0.1rem)] overflow-hidden z-0">
      {/* Imagen principal */}
      <Image
        src={image || "/home-banner.png"}
        alt="Home Banner"
        className="absolute mask-gradient-80  top-0 left-0 w-full h-full object-cover"
        priority
        fill

      />
      {/* Fondo borroso de respaldo */}
      <div
        className="absolute top-0 left-0 w-full h-full bg-[url('/home-banner.png')] bg-cover bg-center blur-2xl opacity-50 -z-10"
      ></div>
    </div>
  );
}
