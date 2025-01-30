import React from "react";
import Image from "next/image";
import { normalizeImageUrl } from "@/services/normalizeImageUrl";
import { generateStars } from "@/services/generateStars";
import { generatePrice } from "@/services/generateStars";

export default async function Product({ params }) {
  const { "product-id": productId } = params;

  const res = await fetch(
    `http://makeup-api.herokuapp.com/api/v1/products/${productId}.json`
  );
  const data = await res.json();

  // Componente Colors correctamente definido y llamado
  const Colors = ({ colors }) => {
    if (!colors || colors.length === 0) {
      return <span>No colors</span>;
    }

    return (
      <div className="flex flex-wrap gap-3 mt-3">
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
    );
  };

  return (
    <div className=" flex flex-row pt-10 flex-wrap h-screen">
      {/* Contenedor de la imagen */}
      <div className="w-2/5 h-4/5 bg-[#fdf7f0] flex items-center rounded-3xl justify-center">
      
        <Image
          src={normalizeImageUrl(data.api_featured_image)}
          width={300}
          height={300}
          alt={data.name}
          priority
          className="object-contain rounded-lg"
        />
      </div>

      {/* Contenedor derecho con información */}
      <div className="w-3/5 h-4/5 p-7 bg-color-sand rounded-lg flex flex-col justify-between">
        {/* Contenedor principal */}
        <div>
          {/* 🔹 Título con sombra */}
          <h2 className="text-4xl font-extrabold text-brownn mb-3 drop-shadow-lg">
            {data.name}
          </h2>
          <h3 className="text-xl text-green font-semibold mb-4">
            {data.brand}
          </h3>

          {/*  Colores del producto */}
          <Colors colors={data.product_colors} />

          {/* 💲 Precio */}
          <div className="flex items-center justify-between mt-6">
            <span className="text-3xl  text-ligth-sand drop-shadow-lg bg-ligth-brown rounded-2xl w-20 text-center shadow-2xl">
              ${generatePrice(data.price)}
            </span>
          </div>

          {/*  Descripción y estrellas */}
          <div className="mt-6 flex items-center  bg-green/70 text-lg rounded-md px-3 py-1 font-semibold w-8/10">
            <p className="text-lg font-semibold text-ligth-sand drop-shadow-lg">
              Product Description
            </p>
            <span className=" flex items-center ml-6 ">
              {generateStars(data.rating)} 
            </span>
          </div>

          {/*  Descripción */}
          <p className="text-md text-green leading-relaxed mt-2 w-8/10">
            {data.description}
          </p>
        </div>

        {/* Contador de cantidad */}
        <div className="flex items-center justify-center gap-6 mt-6">
          <button className="bg-ligth-brown text-green text-2xl   w-12 h-12 rounded-full shadow-lg hover:bg-ligth-brown hover:scale-95 transition-transform ">
            -
          </button>
          <span className="text-2xl font-semibold text-color-brownn">1</span>
          <button className="bg-ligth-brown text-green text-2xl w-12 h-12 rounded-full shadow-lg hover:bg-ligth-brown hover:scale-95 transition-transform">
            +
          </button>
        </div>
      </div>

      {/* Pie de página */}
      <div className=" pl-10 pr-10 w-screen  h-1/5 flex justify-between items-center">
      <button className="w-30 h-10 bg-green/70  rounded-2xl text-sand  hover:bg-ligth-brown hover:text-green hover:scale-95 transition-transform">Go Back</button>
      <button className="w-30 h-10 bg-green/70  rounded-2xl text-sand  hover:bg-ligth-brown hover:text-green hover:scale-95 transition-transform">Go Pay</button>
      
      </div>
    </div>
  );
}
