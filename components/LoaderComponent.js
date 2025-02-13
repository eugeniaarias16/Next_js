"use client";
import React, { useEffect, useRef } from "react";
import anime from "animejs";

export const LoaderComponent=()=> {
  const textRef = useRef(null);

  useEffect(() => {
    anime({
      targets: textRef.current.children, // Aplica la animación a cada letra
      opacity: [0, 1],
      translateY: [-10, 0],
      easing: "easeInOutSine",
      duration: 500,
      delay: anime.stagger(150), // Retrasa cada letra
      loop: true,
    });
  }, []);

  return (
    <div className="flex justify-center items-center h-screen">
      <h1 className="text-5xl font-bold text-brownn flex">
        <span ref={textRef} className="flex space-x-1">
          {Array.from("Loading...").map((char, index) => (
            <span key={index} className="opacity-0">
              {char}
            </span>
          ))}
        </span>
      </h1>
    </div>
  );
}
