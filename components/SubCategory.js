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
    <div className="w-9/10 flex m-auto gap-4 flex-wrap justify-center">
      {SubCategory.map((item) => (
        <Link
          href={item.link}
          key={item.name}
          className="w-1/4 h-[250px] bg-light-sand rounded-lg overflow-hidden shadow-lg transition-transform transform hover:scale-105 flex flex-col relative"
        >
        <div>
            <Image
              src={subCategoryImages[item.name] || '/placeholder-image.png'}
              alt={item.name}
              fill
              sizes='9/10'
              className="object-contain"
              />
        </div>    
          
          <h3 className="text-center text-ligth-brown bg-green font-semibold ">{item.name}</h3>
        </Link>
      ))}
    </div>
  );
}
