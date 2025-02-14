'use client';
import { useRouter } from 'next/navigation';
import React from 'react';
import { FaCheckCircle } from "react-icons/fa";

export default function StatusPay() {
  const router = useRouter();

  return (
    <main className="w-full h-[calc(100vh-4rem)] mt-16 flex items-center justify-center bg-gradient-to-b from-sand to-ligth-sand">
      <div className="flex flex-col items-center gap-8 p-10 bg-white/50 rounded-3xl shadow-2xl backdrop-blur-md border border-ligth-brown/30">
        
        {/* Ícono de éxito */}
        <FaCheckCircle className="text-green text-[150px] drop-shadow-2xl p-3 rounded-full " />

        {/* Título */}
        <h2 className="text-center font-semibold text-[40px] text-white bg-green px-6 py-3 rounded-2xl shadow-md">
          Your purchase was successful!
        </h2>

        {/* Mensaje de agradecimiento */}
        <p className="text-2xl text-brownn/80 font-medium">
          Thanks for your purchase
        </p>

        {/* Botón de regreso */}
        <button onClick={()=> router.push("/")} className="px-6 py-3 text-white bg-green rounded-xl text-xl font-semibold shadow-md hover:scale-105 transition-all hover:bg-ligth-brown">
          Go to Home
        </button>
      </div>
    </main>
  );
}
