import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { categoriesMap } from '@/services/categoriesMap';

export default function ByCategory() {
  

  return (
    <div className="grid grid-cols-2 gap-5 p-5 bg-color-light-sand">
      {categoriesMap.map((category) => (
        <div
          key={category.id}
          className="relative group w-full h-[250px] rounded-lg overflow-hidden shadow-lg bg-color-sand transition-transform transform hover:scale-105"
        >
          <Link href={`/category/${category.name}`}>
            <Image
              src={category.image}
              alt={category.name}
              className="w-full h-full object-cover rounded-lg"
              width={300}
              height={300}
              quality={100} 
              priority
            />
            <h3 className="absolute inset-0 bg-color-green bg-opacity-60 flex justify-center items-center text-white text-2xl font-bold opacity-0 group-hover:opacity-100 transition-opacity">
              {category.name}
            </h3>
          </Link>
        </div>
      ))}
    </div>
  );
}

