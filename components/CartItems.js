import React from "react";
import Image from "next/image";
import { normalizeImageUrl } from "@/services/normalizeImageUrl";
import { QuantityController } from "./QuantityController";
import DeleteProductsSection from "./DeleteProducts";

export default function CartItems({ item }) {
  return (
    <div className="w-9/10  h-40 bg-ligth-brown/50 rounded-2xl drop-shadow-2xl flex p-4 shadow-lg">
      {/* 📷 Contenedor de la imagen */}
      <div className="w-1/4 h-full flex items-center">
        <Image
          src={normalizeImageUrl(item.api_featured_image)}
          width={80}
          height={80}
          alt={item.name}
          priority
          className="object-contain rounded-lg"
        />
      </div>

      {/* 🛍 Info de la tarjeta */}
      <div className="w-3/4 h-full flex flex-col justify-between px-4">
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
            <DeleteProductsSection item={item}/>
          </div>
        
        
        </div>

        <div className="w-full flex flex-nowrap">
          {/* Precios */}
          <div className="flex flex-col gap-1 w-1/2">
            <div className="flex justify-between">
              <span className="text-sm text-brownn font-medium">
                Unitary Price:
              </span>
              <span className="text-sm bg-gold text-brownn font-bold px-2 py-1 rounded-md shadow-md">
                ${item.price}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-brownn font-medium">
                Total Price:
              </span>
              <span className="text-sm bg-gold text-brownn font-bold px-2 py-1 rounded-md shadow-md">
                ${item.price}
              </span>
            </div>
          </div>

          {/* control de cantidades */}
          <div className=" w-1/2 h-full flex justify-center items-center">
            <QuantityController
              item={item}
              className="bg-ligth-brown mr-1.5 ml-1.5 text-green w-8 h-8 rounded-full shadow-lg hover:bg-ligth-brown hover:scale-95 transition-transform"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
