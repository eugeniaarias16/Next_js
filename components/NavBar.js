import Link from 'next/link'
import React from 'react';
import { categoriesMap } from '@/services/categoriesMap';

export default function NavBar() {



    return (
        <nav className="flex categorys-center w-screen bg-light-brown/80 h-15 text-sand font-bold backdrop-blur-2xl z-10 fixed top-0">
            <div className="w-2/10 ml-1 flex justify-categorys-start text-3xl">
                <Link href="/">LOGO</Link>
            </div>
            <div className="w-6/10 flex justify-around categorys-center h-full">
                {categoriesMap.map((category) => (
                    <Link key={category.name} href={category.link} className="hover:text-light-sand">
                        {category.name}
                    </Link>
                ))}
            </div>
            <div className="w-2/10 flex justify-evenly mr-1 border-l-1 border-light-sand">
                <Link href="/cart">Cart</Link>
                <Link href="/login">Login</Link>
            </div>
        </nav>

    )
}
