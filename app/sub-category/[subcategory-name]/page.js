import { categoriesMap } from "services/categoriesMap";
import Cards from "components/Cards";
import React from 'react';
import { getProductswithFilters } from "actions/getProductswithFilters";


export default async function Page({ params }) {
  const { "subcategory-name": subcategoryName } = await params;
  console.log(subcategoryName);

  const selectedSubCategory = categoriesMap
    .flatMap((category) => category.SubCategory)
    .find((subCat) => subCat.link.includes(subcategoryName));

  if (!selectedSubCategory) {
    return <div className="text-center text-red-500">Subcategory not found</div>;
  }
  
  const data = await getProductswithFilters(selectedSubCategory.apiCall, 70);
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
    <div >
      <h2 className="w-full  text-center text-5xl text-brownn">
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
