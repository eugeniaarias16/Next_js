import Image from 'next/image';
import React from 'react';
import { normalizeImageUrl } from 'services/normalizeImageUrl';
import Link from 'next/link';
import { getProductswithFilters } from 'actions/getProductswithFilters';

export default async function SubCategory({ SubCategory }) {
  console.log("subCategory", SubCategory);
  if (!SubCategory || SubCategory.length === 0) {
    return (
      <div className="text-center text-gray-500 mt-10">
        <p>No subcategories available for this category.</p>
      </div>
    );
  }
const quantityItems = SubCategory.length;
console.log(`SubCategory length: ${quantityItems}`);
  //  cargar las imágenes de cada subcategoría
  const fetchSubCategoryImages = async () => {
    const images = {};

    for (const item of SubCategory) {
      try {
        const subCat = await getProductswithFilters(item.apiCall); // Llamada a la API para obtener datos
        const firstObj = subCat?.[2] || subCat?.[1]  ; 
        const subCatImg = normalizeImageUrl(firstObj.api_featured_image); // Normalizamos la URL de la imagen
        images[item.name] = subCatImg || '/placeholder-image.png';
      } catch (error) {
        console.error(`Error fetching data for ${item.name}:`, error);
        images[item.name] = '/placeholder-image.png'; // Imagen predeterminada en caso de error
      }
    }

    return images;
  };

  // Esperar a que las imágenes se carguen en el servidor
  const subCategoryImages = await fetchSubCategoryImages();

  return (
    <div className={`lg:w-9/10 xs:w-full xs:p-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-${quantityItems} gap-4 justify-center`}>
      {SubCategory.map((item) => (
        <Link
          href={item.link}
          key={item.name}
          className="bg-light-sand rounded-lg overflow-hidden shadow-lg transition-transform transform hover:scale-105 flex flex-col"
        >
          {/* Contenedor de la imagen */}
          <div className="w-full h-[90%] bg-white flex items-center justify-center">
            <Image
              src={subCategoryImages[item.name] || '/placeholder-image.png'}
              alt={item.name}
              height={200}
              width={200}
              className="object-contain max-h-full max-w-full"
            />
          </div>

          {/* Título */}
          <h3 className="text-center text-sand font-semibold h-[10%] w-full flex items-center justify-center bg-green">
            {item.name}
          </h3>
        </Link>
      ))}
    </div>
  );
}
