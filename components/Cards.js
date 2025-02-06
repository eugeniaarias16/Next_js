import React from "react";
import Link from "next/link";
import Image from "next/image";
import { normalizeImageUrl } from "services/normalizeImageUrl";
import { generateStars, generatePrice } from "services/generateStars";



export default function Cards({ product }) {
  
  return (
    <Link
      key={product.id}
      href={`/product/${product.id}`}
      className="  bg-white rounded-xl shadow-md w-[200px] flex-none h-[300px] flex flex-col items-center overflow-hidden transition-transform transform hover:scale-105 hover:shadow-2xl"
    >
      {/* Imagen del Producto */}
      <div className="image-container relative w-[150px] h-[150px] overflow-hidden flex items-center justify-center">
        <Image
          src={normalizeImageUrl(product.api_featured_image)}
          alt={product.name || "Producto"}
          fill
          sizes="(max-width: 768px) 100px, (max-width: 1200px) 150px, 200px"
          className="object-contain"
        />
      </div>

      {/* Contenido */}
      <div className="card-content bg-white w-full mt-2 px-3 py-1 text-center text-brown flex flex-col items-center">
        <h3 className="text-md mb-1 w-full capitalize truncate">
          {product.name}
        </h3>
        <p className="text-sm text-green font-medium italic">{product.brand}</p>
        <span className="text-m bg-sand text-center w-full rounded-md text-green font-semibold mt-2">
          ${generatePrice(product.price)}
        </span>

        {/* Estrellas */}
        
          <div className="stars-container mt-2 flex items-center justify-center">
            <div className="bg-brown/30 rounded-full px-2 py-1 flex items-center gap-1">
            {generateStars(product.rating)}
            </div>
          </div>
        
      </div>
    </Link>
  );
}

