"use client";
import React from "react";
import { IoTrashBin } from "react-icons/io5";
import { useCartStore } from "@/services/cartStore";

export function DeleteProductsSection({ item }) {
  const { deleteFromCart } = useCartStore();

  return (
    <>
      <button
        onClick={() => deleteFromCart(item)}
        className="hover:text-amber-100  transform ease-in text-green"
      >
        <IoTrashBin />
      </button>
    </>
  );
}


export function ClearCart() {
  const { clearCart } = useCartStore();

  return (
    <>
      <button
        onClick={() => clearCart()}
        className="hover:text-amber-100  transform ease-in text-green text-xl w-10 h-10 m-auto "
      >
        <IoTrashBin />
      </button>
    </>
  );
}
