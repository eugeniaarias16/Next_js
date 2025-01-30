import { categoriesMap } from "@/services/categoriesMap";
import apiService from "@/services/apiService";
import Cards from "@/components/Cards";
import React from 'react';


export default async function Page({ params }) {
  const { "subcategory-name": subcategoryName } = params;

  const selectedSubCategory = categoriesMap
    .flatMap((category) => category.SubCategory)
    .find((subCat) => subCat.name.toLowerCase() === subcategoryName.toLowerCase());

  if (!selectedSubCategory) {
    return <div className="text-center text-red-500">Subcategory not found</div>;
  }

  const data = await apiService(`${selectedSubCategory.apiCall}`, 70);
  console.log("data: ",data)
  const tagList = [
    ...new Set(
      data
        .map((product) => product.tag_list)
        .flat()
        .filter(Boolean)
    ),
  ];

  return (
    <div className="p-6">
      <h2 className="w-full p-5 text-center text-5xl text-brownn">
        {selectedSubCategory.name}
      </h2>

      {/* Tarjetas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
        {data.map((product) => (
          <Cards key={product.id} product={product} generateStars={(rating) => {
            const fullStars = Math.floor(rating || 0);
            const emptyStars = 5 - fullStars;
            return (
              <span className="text-gold text-xl">
                {"★".repeat(fullStars)}
                {"☆".repeat(emptyStars)}
              </span>
            );
          }} />
        ))}
      </div>
    </div>
  );
}
