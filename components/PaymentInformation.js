"use client";

import React from "react";
import "react-toastify/dist/ReactToastify.css";
import { FormPay } from "./FormPay";

export function PaymentInformation() {
 

  return (
    <main className="w-full min-h-screen p-8 flex flex-col items-center">
      <FormPay/>
      
    </main>
  );
}