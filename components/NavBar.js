import Link from 'next/link'
import React from 'react';
import { categoriesMap } from 'services/categoriesMap';

export default function NavBar() {



    return (
        <nav className="gradient flex items-center w-screen h-16 text-sand font-semibold text-[20px] shadow-md z-10 fixed top-0">
        {/* 🔹 Logo */}
        <div className="w-2/10 ml-4 flex justify-start text-3xl">
          <Link href="/" className="hover:text-light-sand transition duration-300">
            LOGO
          </Link>
        </div>
      
        {/* 📌 Categorías */}
        <div className="w-6/10 flex justify-around items-center h-full">
          {categoriesMap.map((category) => (
            <Link
              key={category.name}
              href={category.link}
              className="hover:text-light-sand hover:scale-105 transition duration-300"
            >
              {category.name}
            </Link>
          ))}
        </div>
      
        {/* 🛒 Carrito y Login */}
        <div className="w-2/10 flex justify-evenly items-center mr-4 border-l-2 border-light-sand/50 h-full">
          <Link href="/cart" className="hover:text-light-sand hover:scale-105 transition duration-300">
            Cart
          </Link>
          <Link href="/login" className="hover:text-light-sand hover:scale-105 transition duration-300">
            Login
          </Link>
        </div>
      </nav>
      
    )
}
