import Link from 'next/link'
import React from 'react';
import { categoriesMap } from 'services/categoriesMap';
import { HiMiniShoppingCart } from "react-icons/hi2";
import { FaUserCircle } from "react-icons/fa";

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
        <div className="w-7/10 flex justify-around items-center h-full">
          {categoriesMap.map((category) => (
            <Link
              key={category.name}
              href={category.link}
              className="hover:text-white hover:scale-115 transition duration-300"
            >
              {category.name}
            </Link>
          ))}
        </div>
      
        {/* 🛒 Carrito y Login */}
        <div className="w-1/10 flex justify-evenly items-center mr-4 border-l-2 border-light-sand/50 h-full">
          <Link href="/cart" className="hover:text-white hover:scale-115 transition duration-300 text-2xl">
          <HiMiniShoppingCart />
          </Link>
          <Link href="/login" className="hover:text-white hover:scale-115 transition duration-300 text-2xl">
          <FaUserCircle />
          </Link>
        </div>
      </nav>
      
    )
}
