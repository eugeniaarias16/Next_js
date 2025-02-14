"use client";

import { AuthContext } from "actions/AuthContext";
import React, { useState, useContext } from "react";
import { ToastContainer } from "react-toastify";
import { UserInformation } from "./UserInformation";
import { FormUser } from "./FormUser";
import { FormPay } from "./FormPay";

export const CheckUserData = () => {
  const { loggedIn, currentUser } = useContext(AuthContext);
  console.log("Login?", loggedIn);
  console.log("currentUser:", currentUser);

  // 🔹 Estado `next` para controlar la transición entre `FormUser` y `FormPay`
  const [next, setNext] = useState(false);
  const [ableToPay, setAbleToPay] = useState(false);

  const handlePay = () => {
    console.log("Payment completed");
    setTimeout(() => {
       toast.success("✅ Pay Succes!", {
                position: "top-center",
                autoClose: 8000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });

    }, 3000);
    
  }

  return (
    <main className="flex w-full flex-col gap-8 mt-3 p-8">
      <ToastContainer />
      <form className="bg-blur w-full h-full ">
        <h2 className="text-green text-3xl font-bold mt-4 mb-4 text-center">
          Buyer Information
        </h2>
        {loggedIn ? (
          <FormUser loggedIn={true} setNext={setNext} textButton="Next" />
        ) : (
          <FormUser setNext={setNext} handleAction={false} textButton="Next" />
        )}
      </form>
        {next?( <form className="bg-blur w-full h-full">
          <FormPay textButton="Validate" setAbleToPay={setAbleToPay}/>      
      </form>):null}
      <div className="flex justify-center w-8/10 h-auto p-10 m-auto">
  {ableToPay ? (
    <button 
      onClick={handlePay}
      className="cursor-pointer text-green font-bold text-2xl bg-gold rounded-2xl w-[350px] h-[50px] shadow-2xl 
                 hover:scale-95 transition-transform duration-200 active:scale-90"
    >
      Pay
    </button>
  ) : (
    <button 
      type="button" 
      className="bg-brownn/30 text-white opacity-50 cursor-not-allowed rounded-2xl w-[350px] h-[50px] shadow-md"
      disabled
    >
      Pay
    </button>
  )}
</div>

    </main>
  );
};
