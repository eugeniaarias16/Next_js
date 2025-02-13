import { getSubCategoryData } from "services/getSubCategoryData";
import Cards from "components/Cards";
import React, { Suspense } from "react";
import ProductLoader from "@components/ProductLoader";

export default async function Page({ params, searchParams }) {
  const { "subcategory-name": subcategoryName } = params;

  // Obtener filtros desde la URL
  const brands = searchParams?.brands?.split(",") || [];
  const tags = searchParams?.tags?.split(",") || [];

  console.log("Subcategory:", subcategoryName);
  console.log("Selected Brands:", brands);
  console.log("Selected Tags:", tags);

   // Esperar 5 segundos antes de cargar los datos
   const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
   await delay(5000);

  // Obtener datos de la subcategoría con filtros
  const { selectedSubCategory, data, error } = await getSubCategoryData(
    subcategoryName,
    brands,
    tags
  );

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div>
      {selectedSubCategory && (
        <h2 className="w-full text-center text-5xl text-brownn">
          {selectedSubCategory.name}
        </h2>
      )}
      <Suspense fallback={<ProductLoader/>}>
        {/* Productos filtrados */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
          {data.map((product) => (
            <Cards key={product.id} product={product} />
          ))}
        </div>
      </Suspense>
    </div>
  );
}
