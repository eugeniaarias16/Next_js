"use client";
import React from "react";
import { useCartStore } from "@/services/cartStore";

export function QuantityController({ item, className = " " }) {
  const cartStore = useCartStore((state) => state.cartStore);
  const addToCart = useCartStore((state) => state.addToCart);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  
 

  const getItemQuantity = (itemId) => {
    const existingProduct = cartStore.find((product) => product.id === itemId);
    return existingProduct ? existingProduct.quantity : 0;
  };
  let quantityItem = getItemQuantity(item.id);
  
  const getTotalPrice = (itemId) => {
    const existingProduct = cartStore.find((product) => product.id === itemId);
    return existingProduct ? existingProduct.price * existingProduct.quantity : 0;
  } 
  let totalPrice= getTotalPrice(item.id);

  return (
    <>
           <div className="flex flex-col gap-1 lg:2/3 xl:w-1/2 ">
            <div className="flex justify-between">
              <span className="text-sm text-brownn font-medium">
                Unitary Price:
              </span>
              <span className="text-sm bg-gold text-brownn font-bold px-2 py-1 rounded-md shadow-md">
                ${item.price}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-brownn font-medium">
                Total Price:
              </span>
              <span className="text-sm bg-gold text-brownn font-bold px-2 py-1 rounded-md shadow-md">
                ${totalPrice.toFixed(2)}
              </span>
            </div>
          </div>

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
