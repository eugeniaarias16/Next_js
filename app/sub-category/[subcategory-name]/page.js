import { getSubCategoryData } from "@/services/getSubCategoryData";
import Cards from "@/components/Cards";
import React, { Suspense } from "react";
import ProductLoader from "@/components/ProductLoader";

export default async function SubCategoryPage({ params, searchParams }) {
  // No await needed here - params is a regular object
  const { "subcategory-name": subcategoryName } = await params;
  
 
  // Usar encadenamiento opcional para acceso seguro
  const resolvedSearchParams = await searchParams; // Asegura que searchParams esté resuelto
  const brands = resolvedSearchParams?.brands?.split(",") || [];
  const tags = resolvedSearchParams?.tags?.split(",") || [];
  

  console.log("Subcategory:", subcategoryName);
  console.log("Selected Brands:", brands);
  console.log("Selected Tags:", tags);




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
      <Suspense fallback={<ProductLoader />}>
      <div className="w-full h-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 xxl:grid-cols-4 gap-6 mt-10">
  {data.map((product) => (
    <Cards
      key={product.id}
      product={product}
      className="bg-white rounded-xl shadow-md w-full h-[300px] flex flex-col items-center overflow-hidden transition-transform transform hover:scale-105 hover:shadow-2xl"
    />
  ))}
</div>

      </Suspense>
    </div>
  );
}