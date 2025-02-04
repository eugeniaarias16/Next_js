"use client";
import React, { useState } from "react";

export function ProductDescriptionCollapse({ data }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative w-full max-w-lg mt-2 ">
      <div
        className={`relative overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-max" : "max-h-20"
        }`}
      >
        <p className="text-md text-green leading-relaxed">
          {data.description}
        </p>

        {/* Efecto de fade-out cuando está colapsado */}
        {!isOpen && (
          <div className="absolute bottom-0 left-0 w-full h-10 bg-gradient-to-t from-color-sand to-transparent"></div>
        )}
      </div>

      {/* Botón de expansión/reducción */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="mt-2 text-green/70 font-semibold hover:underline flex items-center"
      >
        {isOpen ? (
          <>
            Close <span className="ml-1 text-xl">×</span>
          </>
        ) : (
          "See More"
        )}
      </button>
    </div>
  );
}
