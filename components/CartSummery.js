"use client";
import React, { useEffect, useState } from "react";
import { useCartStore } from "services/cartStore";

export default function CartSummery() {
  const { cartStore } = useCartStore();

  /* Estado para los totales */
  const [totals, setTotals] = useState({
    totalProducts: 0,
    totalPrice: 0,
    totalTaxes: 0,
    totalPriceWithTaxes: 0,
    totalPriceWithShipping: 0,
  });

  // Función que devuelve el costo del envío como número
  const getShippingCost = (amount) => {
    return amount >= 100 ? 0 : 70; // Si es mayor o igual a $100, el envío es gratis (0), sino cuesta $70
  };

  useEffect(() => {
    if (!cartStore.length) {   // carrito vacío, devolver 0
      setTotals({ 
        totalProducts: 0, 
        totalPrice: 0, 
        totalTaxes: 0, 
        totalPriceWithTaxes: 0,
        totalPriceWithShipping: 0, 
      });
      return;
    }

    const taxesRate = 0.10; // 10% de impuestos
    const totalProducts = cartStore.reduce((sum, product) => sum + product.quantity, 0);
    const totalPrice = cartStore.reduce((sum, product) => sum + (product.price * product.quantity), 0);
    const totalTaxes = totalPrice * taxesRate;
    const totalPriceWithTaxes = totalPrice + totalTaxes;
    const totalShippingCost = getShippingCost(totalPrice); 
    const totalPriceWithShipping = totalPriceWithTaxes + totalShippingCost; // 🔹 Se suma el envío

    setTotals({ totalProducts, totalPrice, totalTaxes, totalPriceWithTaxes, totalPriceWithShipping });

    console.log("Total de productos en el carrito:", totalProducts);
    console.log("Total sin impuestos: $", totalPrice);
    console.log("Impuestos (10%): $", totalTaxes);
    console.log("Total con impuestos: $", totalPriceWithTaxes);
    console.log("Costo de Envío: $", totalShippingCost);
    console.log("Total con Envío: $", totalPriceWithShipping);
  }, [cartStore]);

  // Función que devuelve JSX con el mensaje de envío
  const freeShipping = (amount) => {
    return (
      <div className="flex justify-between py-1">
        <p className="font-medium">{amount >= 100 ? "Free Shipping" : "Shipping"}</p>
        <p className="font-bold">${amount >= 100 ? 0 : 70}</p>
      </div>
    );
  };

  return (
    <div className="w-full max-w-[450px] bg-sand/50 rounded-2xl h-[500px] border-2 border-brownn/30 drop-shadow-2xl p-6 flex flex-col justify-between m-auto">
      {/* Título */}
      <h3 className="bg-ligth-brown/70 text-green font-bold w-9/10 h-min-12 h-auto rounded-2xl text-center m-auto mt-3 text-3xl shadow-lg flex items-center justify-center">
        Purchase Summary
      </h3>

      {/* Información de la compra */}
      <div className="mt-6 text-lg text-green ">
        <div className="flex justify-between py-1">
          <p className="font-medium">Quantity of Items</p>
          <p className="font-bold">{totals.totalProducts}</p>
        </div>
        <div className="flex justify-between py-1">
          <p className="font-medium">Total Price</p>
          <p className="font-bold">${totals.totalPrice.toFixed(2)}</p>
        </div>
        <div className="flex justify-between py-1">
          <p className="font-medium">Taxes <span className="font-light">-10%</span></p>
          <p className="font-bold">${totals.totalTaxes.toFixed(2)}</p>
        </div>
        {freeShipping(totals.totalPrice)}
        <div className="flex justify-between border-t-2 border-color-brownn mt-3 pt-3 text-xl font-semibold">
          <p>Total Amount</p>
          <p>${totals.totalPriceWithShipping.toFixed(2)}</p>
        </div>
      </div>

      {/* Botón de pago */}
      <button className="w-40 h-12 rounded-2xl mt-5 bg-ligth-brown text-white text-2xl font-semibold hover:scale-95 transform transition-all shadow-lg hover:shadow-xl mx-auto">
        Pay
      </button>
    </div>
  );
}
