'use client'
import { useRouter } from 'next/navigation'
import React from 'react'

export const ButtonNavigation = () => {
    const router=useRouter();
    return (
    <>
     <button onClick={()=>router.back()}
        className="w-full md:w-1/2 lg:w-1/4 xl:w-1/5 py-3 bg-green/70 rounded-2xl text-sand hover:bg-ligth-brown hover:text-green hover:scale-95 transition-transform">
          Go Back
        </button>
        <button onClick={() => router.push("/cart")}
        className="w-full md:w-1/2 lg:w-1/4 xl:w-1/5 py-3 bg-green/70 rounded-2xl text-sand hover:bg-ligth-brown hover:text-green hover:scale-95 transition-transform">
          Go Pay
        </button>
    </>
  )
}
