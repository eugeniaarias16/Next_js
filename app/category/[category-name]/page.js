import SubCategory from "components/SubCategory";
import React from "react";
import { categoriesMap } from "services/categoriesMap";
import SliderCards from "components/SliderCards";
import Image from "next/image";
import { fetchSubCategoryData } from "services/getSubCategoryData";

export default async function CategoryPage({ params }) {
  const { "category-name": categoryName } = params;

  // Encuentra la categoría seleccionada
  const selectedCategory = categoriesMap.find(
    (category) => category.name.toLowerCase() === categoryName.toLowerCase()
  );

  if (!selectedCategory) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center">
        <h1 className="text-4xl text-red-600">Category Not Found</h1>
      </div>
    );
  }


  const subCategoryData = await fetchSubCategoryData({selectedCategory});
  console.log("subCate",subCategoryData);

  return (
    <div className="flex flex-col min-h-screen text-center items-center">
      {/* Título de la categoría */}
      <h2 className="text-amber-800 mt-20 text-5xl mb-10">{categoryName}</h2>

      {/* Render de las subcategorías */}
      <SubCategory SubCategory={selectedCategory.SubCategory} />

      {/* Tablero de imágenes */}
      <div className="w-full h-auto flex flex-col mt-20 items-center">
        <h2 className="text-[50px] text-light-brown bg-white/40 rounded-xl w-1/2 backdrop-blur-md">
          Real Beauty
        </h2>
        <div className="w-9/10 shadow-2xl h-[600px] max-h-screen overflow-hidden mt-10 grid grid-cols-6 gap-1 grid-rows-4 rounded-xl">
          {["category1", "category2", "category3", "category4", "category5", "category6"].map(
            (img, index) => (
              <div
                key={index}
                className={`${
                  index === 0
                    ? "row-start-1 row-end-5 col-start-1 col-end-3"
                    : index === 1
                    ? "row-start-1 row-end-3 col-start-3 col-end-5"
                    : index === 2
                    ? "row-start-1 row-end-2 col-start-5 col-end-6"
                    : index === 3
                    ? "col-start-5 col-end-7 row-start-2 row-end-5"
                    : index === 4
                    ? "col-start-6 col-end-7 row-start-1 row-end-2"
                    : "col-start-3 col-end-5 row-start-3 row-end-5"
                } relative overflow-hidden`}
              >
                <Image
                  src={`/${img}.jpg`}
                  alt={`Categoría ${index + 1}`}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
            )
          )}
        </div>
      </div>

      {/* Render de los SliderCards */}
      {subCategoryData.length > 0 &&
        subCategoryData.map((subCategory) => (
          <SliderCards
            key={subCategory.name}
            products={subCategory.products}
            title={subCategory.name}
            /* link={subCategory.link  } */
          />
        ))}
    </div>
  );
}
