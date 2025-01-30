import React from "react";

export default function CartSummery() {
  return (
    <>
      <div className="w-9/10 bg-sand/50 rounded-2xl h-[500px] border-2 border-brownn/30 drop-shadow-2xl p-6 flex flex-col justify-between">
        <h3 className="bg-ligth-brown/70 text-green font-bold w-9/10 h-12 rounded-2xl text-center m-auto mt-3 text-3xl shadow-lg flex items-center justify-center">
          Purchase Summary
        </h3>

        {/* 📜 Información de la compra */}
        <div
          className="mt-6 text-lg text-green
            "
        >
          <div className="flex justify-between py-1">
            <p className="font-medium">Quantity of Items</p>
            <p className="font-bold">4</p>
          </div>
          <div className="flex justify-between py-1">
            <p className="font-medium">Total Price</p>
            <p className="font-bold">$120</p>
          </div>
          <div className="flex justify-between py-1">
            <p className="font-medium">Taxes</p>
            <p className="font-bold">$10</p>
          </div>
          <div className="flex justify-between py-1">
            <p className="font-medium text-green">Free Shipping</p>
          </div>
          <div className="flex justify-between border-t-2 border-color-brownn mt-3 pt-3 text-xl font-semibold">
            <p>Total Amount</p>
            <p>$130</p>
          </div>
        </div>

        {/*  Botón de pago */}
        <button className="w-40 h-12 rounded-2xl mt-5 bg-ligth-brown text-white text-2xl font-semibold hover:scale-95 transform transition-all shadow-lg hover:shadow-xl mx-auto">
          Pay
        </button>
      </div>
    </>
  );
}
