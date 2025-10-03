import React from "react";
import { assets } from "../assets/assets.js";
import { useNavigate } from "react-router-dom";
const Hero = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full h-full  text-center">
      <div className="flex flex-col items-center justify-center  h-96">
        <h1 className="text-black font-bold text-5xl mb-4">
          Create amazing content with
          <span className="text-blue-500 text-5xl"> AI tools</span>
        </h1>
        <p className="text-gray-400">
          Transform your content creation with our suite of premium AI tools.
          Write articles, generate images, and enhance your workflow.
        </p>
        <div className="my-6  space-x-2 ">
          <a
            onClick={() => navigate("/dashboard")}
            className="text-white text-sm  cursor-pointer font-normal bg-blue-600 px-5 py-3 rounded-4xl"
          >
            Start Creating now
          </a>
          <a className="text-black text-sm font-normal bg-white px-4 py-3 rounded-4xl border border-gray-400">
            Watch Demo
          </a>
        </div>

        <div className=" ">
          <img
            className="h-8 text-center inline-block"
            src={assets.user_group}
            alt=""
          />
          <span className="text-gray-400 pl-2">Trusted by 10k+ people</span>
        </div>
      </div>
    </div>
  );
};

export default Hero;
