"use client";
import React from "react";
import { useCartStore } from "services/cartStore";

export function QuantityController({ item, className = " " }) {
  const cartStore = useCartStore((state) => state.cartStore);
  const addToCart = useCartStore((state) => state.addToCart);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  


  const getItemQuantity = (itemId) => {
    const existingProduct = cartStore.find((product) => product.id === itemId);
    return existingProduct ? existingProduct.quantity : 0;
  };
  let quantityItem = getItemQuantity(item.id);

  return (
    <>
      <button onClick={() => removeFromCart(item)} className={className}>
        -
      </button>
      <span className=" font-semibold text-color-brownn">{quantityItem}</span>
      <button onClick={() => addToCart(item)} className={className}>
        +
      </button>
    </>
  );
}
