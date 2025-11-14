import React from "react";
import { useNavigate } from "react-router-dom";

export default function Start() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex  md:flex-row items-center mid:justify-between flex-col-reverse px-6 md:px-24 py-16 bg-white">
      <div className="flex-1 space-y-6 text-center md:text-left">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
          Move Freely with <span className="text-gray-700">MoveX</span>
        </h1>
        <p className="text-gray-600 text-lg md:text-xl max-w-md mx-auto md:mx-0">
          Book rides instantly, track your driver, and travel anywhere with
          ease.
        </p>
        <button
          onClick={() => navigate("/user-login")}
          className="px-6 py-3 bg-gray-900 cursor-pointer text-white rounded-xl text-lg font-semibold hover:bg-gray-700 transition-all shadow-md"
        >
          Get Started
        </button>
      </div>

      {/* Right Section */}
      <div className="flex-1 flex justify-center mt-10 md:mt-0">
        <img
          src="/assets/ride.png" // place image as public/assets/ride.png
          alt="Order Ride Illustration"
          className="w-72 md:w-96 drop-shadow-lg"
        />
      </div>
    </div>
  );
}
