"use client";
import React, { useEffect, useRef } from "react";
import anime from "animejs";

export const WelcomeLoader = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    anime
      .timeline({ loop: false })
      .add({
        targets: ".ml8 .circle-gold",
        scale: [0, 4.5], // 🔹 Aumenta el tamaño del círculo
        opacity: [1, 0],
        easing: "easeInOutExpo",
        rotateZ: 360,
        duration: 1100,
      })
      .add({
        targets: ".ml8 .circle-container",
        scale: [0, 1.5], // 🔹 Ajuste del tamaño del contenedor del círculo
        duration: 1100,
        easing: "easeInOutExpo",
        offset: "-=1000",
      })
      .add({
        targets: ".ml8 .circle-green",
        scale: [0, 1.3],
        duration: 1100,
        easing: "easeOutExpo",
        offset: "-=600",
      })
      .add({
        targets: ".ml8 .letters-left",
        scale: [0, 1],
        duration: 1200,
        offset: "-=550",
      })
      .add({
        targets: ".ml8 .bang",
        scale: [0, 1],
        rotateZ: [45, 15],
        duration: 1200,
        offset: "-=1000",
      })
      .add({
        targets: ".ml8",
        opacity: 0,
        duration: 1000,
        easing: "easeOutExpo",
        delay: 1400,
      });

    anime({
      targets: ".ml8 .circle-green-dashed",
      rotateZ: 360,
      duration: 8000,
      easing: "linear",
      loop: true,
    });
  }, []);

  return (
    <div className="flex justify-center items-center h-screen bg-[#d4d0c9]">
      <h1 ref={containerRef} className="ml8 relative text-6xl font-bold text-[#362e2c] flex items-center">
        <span className="letters-container relative flex items-center">
          <span className="letters letters-left">Hi Beauty</span>
          <span className="letters bang ml-2">!</span>
        </span>
        <span className="circle circle-gold absolute"></span>
        <span className="circle circle-green gradient-ligth absolute"></span>
        <span className="circle circle-container absolute">
          <span className="circle circle-green-dashed absolute"></span>
        </span>
      </h1>
    </div>
  );
};
