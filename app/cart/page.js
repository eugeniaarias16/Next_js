import { CartClient } from "components/CartClient";
import React from "react";
import CartSummery from "components/CartSummery";


export default function CartPage() {

return (
  < >
  <div className="flex mt-20 w-screen h-screen justify-between px-10">
  <section className="w-full">
  <h2 className="w-full h-auto text-center text-4xl font-semibold mt-5 mb-5 text-green">Your Shopping Cart</h2>
  <CartClient/>
  </section>

  <section className="w-1/4 min-w-[450px] flex justify-center">
    <CartSummery />
  </section>
  </div>
 
  </>
)

}