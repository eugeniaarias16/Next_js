import React from "react";
import Image from "next/image";
import { normalizeImageUrl } from "services/normalizeImageUrl";
import { QuantityController } from "./QuantityController";
import { DeleteProductsSection } from "./DeleteProducts";

export default function CartItems({ item }) {
  return (
    <div className="xl:w-full xxl:w-9/10 xs:w-9/10 min-h-40 bg-ligth-brown/50 rounded-2xl drop-shadow-2xl flex overflow-hidden xs:p-1.5 p-4 shadow-lg">
      {/* 📷 Contenedor de la imagen */}
      <div className="xs:hidden lg:w-1/4  h-full flex items-center justify-center bg-amber-50 p-2">
        <Image
          src={normalizeImageUrl(item.api_featured_image)}
          alt={item.name}
          priority
          width={120} // Dejar width y height en 0 para que Next.js ajuste el tamaño correctamente
          height={120}
          className="w-full  h-auto max-h-[120px] object-contain rounded-lg"
        />
      </div>

      {/* 🛍 Info de la tarjeta */}
      <div className="xs:w-full xxl:w-3/4  xl:w-full h-full flex flex-col justify-between py-4 px-4">
        <div className=" flex">
          <div className="w-4/5">
            <h2 className="text-lg font-bold text-brownn drop-shadow-lg">
              {item.name}
            </h2>
            <h3 className="text-md text-green font-semibold drop-shadow-lg">
              {item.brand}
            </h3>
          </div>

          <div className="w-1/5  flex justify-end text-xl ">
            <DeleteProductsSection item={item} />
          </div>
        </div>


          {/* control de cantidades y precios */}
          <div className=" w-full    h-full flex justify-between items-center">
            <QuantityController
              item={item}
              className="bg-ligth-brown mr-1.5 ml-1.5 text-green w-8 h-8 rounded-full shadow-lg hover:bg-ligth-brown hover:scale-95 transition-transform"
            />
          </div>
       
      </div>
    </div>
  );
}
