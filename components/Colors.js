'use client'
import { useState } from "react";


export function ColorCollapse({ colors }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-auto">
      {/* Botón para abrir/cerrar */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-brownn/20 text-white px-2 py-2 rounded-md shadow-lg hover:bg-ligth-brown transition"
      >
        {isOpen ? "Hide Colors" : "Show Colors"}
      </button>

      {/* Lista de colores con animación */}
      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        {colors && colors.length > 0 ? (
          <div className="flex flex-wrap gap-3 mt-3 p-3 rounded-md">
            {colors.map((color, index) => (
              <div key={index} className="flex items-center gap-2">
                {/* Cuadro de color */}
                <span
                  className="w-6 h-6 rounded-full border border-gray-300"
                  style={{ backgroundColor: color.hex_value }}
                ></span>
                {/* Nombre del color */}
                <span className="text-sm text-gray-700">{color.colour_name}</span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600 mt-2">No colors available</p>
        )}
      </div>
    </div>
  );
}
