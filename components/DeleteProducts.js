'use client'
import React from 'react';
import { IoTrashBin } from "react-icons/io5";
import { useCartStore } from '@/services/cartStore';


export default function DeleteProductsSection({item}) {
  const{deleteFromCart}=useCartStore();
  
  
  
    return (
    <>
    <button onClick={()=>deleteFromCart(item)} className='hover:text-amber-100  transform ease-in text-green'><IoTrashBin /></button>
    </>
  )
}
