"use client";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "actions/AuthContext";
import { FormUser } from "./FormUser";
import React, { useContext } from "react";



export function UserInformation() {
  
  const { currentUser} = useContext(AuthContext);

  

  return (
    <main className="bg-light-sand w-full min-h-screen p-8 flex flex-col items-center">
      <ToastContainer position="top-center" />

      <h2 className="text-green text-3xl font-bold mb-4">
        Welcome, {currentUser?.displayName || currentUser?.email}
      </h2>
      <p className="text-brownn text-lg">Please, check your information</p>

      <FormUser loggedIn={true} textButton="Save" />
      </main>
  );
}
