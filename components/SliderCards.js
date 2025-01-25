import Link from "next/link";
import Image from "next/image";
import { normalizeImageUrl } from "@/services/normalizeImageUrl";

export default function SliderCards({ products, title }) {
  const generateStars = (rating) => {
    const fullStars = Math.floor(rating);
    const emptyStars = 5 - fullStars;
    return (
      <span className="text-gold text-xl">
        {'★'.repeat(fullStars)}
        {'☆'.repeat(emptyStars)}
      </span>
    );
  };

 

  return (
    <div className="w-full flex flex-wrap mt-20">
      <h2 className="w-full text-center text-4xl text-light-brown">{title}</h2>
      <div className="w-full p-6 bg-light-brown/50 backdrop-blur-lg rounded-xl shadow-lg flex overflow-x-auto gap-4 custom-scrollbar">
        {products.map((product) => (
          <Link
            key={product.id}
            href={`/product-detail/${product.id}`}
            className="slider-card bg-white rounded-xl shadow-md w-[200px] flex-none h-[300px] flex flex-col items-center overflow-hidden transition-transform transform hover:scale-105 hover:shadow-2xl"
          >
            {/* Imagen del Producto */}
            <div className="image-container relative w-[150px] h-[150px] overflow-hidden flex items-center justify-center">
              <Image
                src={normalizeImageUrl(product.api_featured_image)}
                alt={product.name || 'Producto'}
                fill
                sizes="200px" 
                className="object-contain"
              />
            </div>

            {/* Contenido de la Tarjeta */}
            <div className="card-content bg-white w-full mt-2 px-3 py-1 text-center text-brown flex flex-col items-center">
              <h3 className="text-md mb-1 w-full capitalize truncate">{product.name}</h3>
              <p className="text-sm text-green font-medium italic">{product.brand}</p>
              <span className="text-sm bg-brownn/50 text-center w-auto rounded-md text-light-sand font-semibold mt-2">
                ${product.price}
              </span>

              {/* Puntuación con Estrellas */}
              <div className="stars-container mt-2 flex items-center justify-center">
                <div className="bg-brown/30 rounded-full px-2 py-1 flex items-center gap-1">
                  <span className="text-gold text-sm">{generateStars(product.rating)}</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
