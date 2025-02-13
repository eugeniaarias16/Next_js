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

  return (
    <main className="flex w-full">
      <ToastContainer />
      <form className="bg-blur w-1/2 h-full">
        {next ? (
          <UserInformation />
        ) : (
          <FormUser setNext={setNext} handleAction={false} textButton="Next" />
        )}
      </form>

      <form className="bg-blur w-1/2 h-full">
        {next ? (
          <FormPay setAbleToPay={setAbleToPay} />
        ) : (
          <FormPay disable setAbleToPay={setAbleToPay} />
        )}
      </form>
    </main>
  )
};
