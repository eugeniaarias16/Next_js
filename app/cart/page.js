import { CartClient } from "components/CartClient";
import React from "react";
import CartSummery from "components/CartSummery";
import { IoTrashBin } from "react-icons/io5";
import { ClearCart } from "components/DeleteProducts";

export default function CartPage() {
  return (
    <>
      <div className="flex xs:flex-wrap lg:flex-nowrap mt-20 w-screen h-[calc(100vh-4.5rem)] justify-between px-1 xxl:px-10">
      <section
          className="xs:w-full xs:mt-10
          min-w-[300px] 
          lg:w-2/5 lg:px-5
          xxl:w-2/5
          flex justify-center"
        >
          <CartSummery />
        </section>
        
        <section
          className="overflow-y-scroll custom-scrollbar 
          xs:w-full
          xl:w-3/5 xxl:w-4/5 
        "
        >
          <div className="flex justify-around">
            <h2 className="xs:w-8/10  h-auto text-center text-4xl font-semibold mt-5 mb-5 text-green">
              Your Shopping Cart
            </h2>
            <ClearCart />
          </div>
          <CartClient />
        </section>

       
      </div>
    </>
  );
}
