import React from "react";
import Image from "next/image";
import { normalizeImageUrl } from "services/normalizeImageUrl";
import { generateStars } from "services/generateStars";
import { generatePrice } from "services/generateStars"; //
import { QuantityController } from "components/QuantityController";
import { ColorCollapse } from "components/Colors";
import { ProductDescriptionCollapse } from "components/ProductDescription";
import { getProductById } from "actions/getProductsByIDFromServer";
import { ButtonNavigation } from "@components/ButtonNavigation";

export default async function Product({ params }) {

  
  const { "product-id": productId } = await Promise.resolve(params);
  const data = await getProductById(productId);

  if (!data) {
    return (
      <div className="text-center text-xl text-red-500">Product not found</div>
    );
  }

  return (
    <main className=" w-full min-h-screen mt-16 flex flex-col lg:flex-row lg:flex-wrap pt-10 px-4 xs:px-2 gap-6">
      <div className="w-full flex flex-col lg:flex-row gap-6">
        {/* Contenedor de la imagen */}
        <div className="w-full lg:w-2/5 bg-white flex items-center justify-center rounded-3xl p-4 shadow-md">
          <Image
            src={normalizeImageUrl(data.api_featured_image)}
            width={300}
            height={300}
            alt={data.name}
            priority
            className="object-contain rounded-lg w-full max-w-[300px] h-auto"
          />
        </div>

        {/* Contenedor derecho con información */}
        <div className="w-full lg:w-3/5 xs:px-2  sm:p-7  rounded-lg flex flex-col justify-between gap-6">
          {/* Nombre del producto y marca */}
          <div>
            <h2 className="text-3xl lg:text-4xl font-extrabold text-brownn mb-3">
              {data.name}
            </h2>
            <h3 className="text-lg lg:text-xl text-green font-semibold mb-4">
              {data.brand}
            </h3>

            {/* Selección de colores */}
            <ColorCollapse colors={data.product_colors} />

            {/* Precio y cantidad */}
            <div className="flex justify-between xs:flex-wrap xs:gap-4 xs:w-full items-center mt-6 ">
              <span className="text-2xl lg:text-3xl text-ligth-sand drop-shadow-lg bg-ligth-brown rounded-2xl px-4 py-1">
                ${generatePrice(data.price)}
              </span>
              <span className=" flex justify-between items-center xs:w-full ">
                <QuantityController
                  id={data.id}
                  item={data}
                  className="bg-ligth-brown  text-green text-xl lg:text-2xl xs:w-[40px] xs:h-[40px] rounded-full shadow-lg hover:bg-ligth-brown hover:scale-95 transition-transform"
                />
              </span>
            </div>

            {/* Descripción del producto */}
            <div className="mt-6 flex flex-col lg:flex-row items-start lg:items-center gap-3 bg-green/50 text-lg rounded-md px-4 py-3">
              <p className="text-lg font-semibold text-ligth-sand">
                Product Description
              </p>
              <span className="flex items-center">
                {generateStars(data.rating)}
              </span>
            </div>

            {/* Colapsable de descripción */}
            <ProductDescriptionCollapse data={data} />
          </div>
        </div>
      </div>

      {/* Pie de página con botones */}
      <div className="w-full flex flex-col md:flex-row justify-between items-center gap-4 mt-6">
       <ButtonNavigation/>
      </div>
    </main>
  );
}
