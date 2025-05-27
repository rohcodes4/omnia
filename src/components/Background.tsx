"use client";
import React from "react";

const Background = () => {
  return (
    <div className="fixed inset-0 h-screen w-screen xl:h-[120%] xl:w-[120%] 2xl:h-screen 2xl:w-screen overflow-hidden bg-[#161938] -z-10">
      {/* Gradient Layer */}
      <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(17,17,17,0.2)_0%,rgba(17,17,17,1)_100%)] bg-cover pointer-events-none z-[3]" />

      {/* Mathematics Layer */}
      <div
        className="absolute top-0 left-0 w-[200%] h-[200%] bg-[url('/images/Mathematics.png')] bg-repeat bg-left-top 
        opacity-100 pointer-events-none z-[2] origin-top-left scale-50 mix-blend-color-dodge"
      />

      {/* Dust Layer */}
      <div
        className="absolute top-0 left-0 w-[160%] h-[160%] bg-[url('/images/Dust.png')] bg-repeat bg-left-top 
        opacity-50 pointer-events-none z-[1] origin-top-left scale-[0.6246]"
      />
    </div>
  );
};

export default Background;
