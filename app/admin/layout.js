import Link from 'next/link'
import React from 'react'

import { redirect } from "next/navigation";

export default function AdminLayout({ children }) {


  return (
    <div className="w-full h-[calc(100vh-4rem)] m-auto mt-[4rem] bg-sand/30 flex flex-wrap content-between items-center">
      {/* Aquí iría la barra de navegación de admin */}
      <aside className="w-full bg-light-brown/30 h-[80px]">
        <section className="w-8/10 m-auto h-full flex gap-3 justify-around">
          <NavLinks />
        </section>
      </aside>

      <main className="h-[calc(100%-80px)] w-full">{children}</main>
    </div>
  );
}

function NavLinks() {
  const adminRoot = [
    { name: "User Information", link: "/admin/userInformation" },
    { name: "Purchase History", link: "/admin/purchaseHistory" },
    { name: "Member Ship", link: "/admin/memberShip" },
    { name: "Payment Information", link: "/admin/paymentInformation" },
  ];

  return (
    <>
      {adminRoot.map((page) => (
        <div
          key={page.name}
          className="border-b-2 w-1/4 border-light-brown/30 text-brownn/70 hover:text-green/70 hover:border-green/70 hover:drop-shadow-xl h-15 flex justify-center items-center text-xl"
        >
          <Link href={page.link}>{page.name}</Link>
        </div>
      ))}
    </>
  );
}


