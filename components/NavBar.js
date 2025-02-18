'use client'
import Link from "next/link"; 
import React, { useState } from "react";
import { categoriesMap } from "services/categoriesMap";
import { HiMiniShoppingCart } from "react-icons/hi2";
import { FaUserCircle } from "react-icons/fa";
import { PiBehanceLogoFill } from "react-icons/pi";
import { IoMdMenu, IoMdClose } from "react-icons/io"; // Íconos de menú

export default function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="gradient flex items-center w-full h-16 text-sand font-semibold text-[20px] shadow-md z-10 fixed top-0 justify-between px-4 scroll-auto">
      
      {/*  Logo */}
      <div className="w-1/5 flex justify-start text-3xl">
        <Link href="/" className="hover:text-light-sand transition duration-300 hidden md:block">
          LOGO
        </Link>
        <Link href="/" className="hover:text-light-sand transition duration-300 md:hidden">
          <PiBehanceLogoFill />
        </Link>
      </div>

      {/*  Menú en Escritorio - Se oculta en móviles */}
      <div className="hidden md:flex w-3/5 justify-around items-center h-full text-lg">
        {categoriesMap.map((category) => (
          <Link
            key={category.name}
            href={category.link}
            className="hover:text-white hover:scale-110 transition duration-300"
          >
            {category.name}
          </Link>
        ))}
      </div>

      {/* 🛒 Carrito y Login */}
      <div className="w-1/5 flex justify-end items-center space-x-2 text-2xl">
        <Link href="/cart" className="hover:text-white transition duration-300">
          <HiMiniShoppingCart />
        </Link>
        <Link href="/login" className="hover:text-white transition duration-300">
          <FaUserCircle />
        </Link>

        {/*  Botón para abrir/cerrar el menú en móviles */}
        <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <IoMdClose size={28} /> : <IoMdMenu size={28} />}
        </button>
      </div>

      {/* Menú Móvil  */}
      {menuOpen && (
        <div className="absolute top-16 left-0 w-full opacity-100 bg-ligth-brown  text-white flex flex-col items-center space-y-4 py-4 md:hidden">
          {categoriesMap.map((category) => (
            <Link
              key={category.name}
              href={category.link}
              className="hover:text-light-sand transition duration-300"
              onClick={() => setMenuOpen(false)} // Cierra el menú al hacer clic
            >
              {category.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
