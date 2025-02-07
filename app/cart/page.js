import { CartClient } from "components/CartClient";
import React from "react";
import CartSummery from "components/CartSummery";
import { IoTrashBin } from "react-icons/io5";
import { ClearCart } from "components/DeleteProducts";

export default function CartPage() {
  return (
    <>
      <div className="flex mt-20 w-screen h-[calc(100vh-4.5rem)] justify-between px-10">
        <section className="w-full overflow-y-scroll custom-scrollbar ">
          <div className="flex justify-around">
            <h2 className="w-8/10 h-auto text-center text-4xl font-semibold mt-5 mb-5 text-green">
              Your Shopping Cart
            </h2>
            <ClearCart />
          </div>
          <CartClient />
        </section>

        <section className="w-1/4 min-w-[450px] flex justify-center">
          <CartSummery />
        </section>
      </div>
    </>
  );
}
