"use client";
import React from "react";
import { useCartStore } from "@/services/cartStore";
import CartItems from "@/components/CartItems";

export function CartClient() {
  const { cartStore } = useCartStore(); // Estado global con persistencia

  if (cartStore.length === 0) {
    return <div className="text-center text-2xl text-brownn/50 h-screen mt-20">Your Cart is Empty</div>;
  }

  return (
    <>
      {/* 🛒 Items en el carrito */}
      <section className="xs:w-full  flex flex-wrap gap-2 justify-center">
        <div className="w-full flex flex-wrap gap-2 justify-center pt-5 ">
          {cartStore.map((item) => (
            <CartItems item={item} key={item.id} />
          ))}
        </div>
      </section>
    </>
  );
}
