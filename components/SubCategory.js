import Image from 'next/image';
import React from 'react';
import { normalizeImageUrl } from '@/services/normalizeImageUrl';
import Link from 'next/link';
import apiService from '@/services/apiService';

export default async function SubCategory({ SubCategory }) {
  if (!SubCategory || SubCategory.length === 0) {
    return (
      <div className="text-center text-gray-500 mt-10">
        <p>No subcategories available for this category.</p>
      </div>
    );
  }

  // Función para cargar las imágenes de cada subcategoría
  const fetchSubCategoryImages = async () => {
    const images = {};

    for (const item of SubCategory) {
      try {
        const subCat = await apiService(item.apiCall); // Llamada a la API para obtener datos
        const firstObj = subCat?.[2] || subCat?.[1]  ; // Obtenemos el primer objeto válido
        const subCatImg = normalizeImageUrl(firstObj.api_featured_image); // Normalizamos la URL de la imagen
        images[item.name] = subCatImg || '/placeholder-image.png'; // Almacenamos la imagen o una predeterminada
      } catch (error) {
        console.error(`Error fetching data for ${item.name}:`, error);
        images[item.name] = '/placeholder-image.png'; // Imagen predeterminada en caso de error
      }
    }

    return images;
  };

  // Esperamos que las imágenes se carguen en el servidor
  const subCategoryImages = await fetchSubCategoryImages();

  return (
    <div className="w-9/10 flex  gap-4  justify-center ">
  {SubCategory.map((item) => (
    <Link
      href={item.link }
      key={item.name}
      className="w-1/4 h-[250px] bg-light-sand rounded-lg overflow-hidden shadow-lg transition-transform transform hover:scale-105 flex flex-col"
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
