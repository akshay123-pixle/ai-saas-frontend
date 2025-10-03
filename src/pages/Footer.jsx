import React from "react";
import { assets } from "../assets/assets";

function Footer() {
  return (
    <div className=" mb-5 mt-20 flex flex-col items-center justify-between gap-4 w-full">
      <div className="flex items-center justify-around w-full space-x-24">
        {/* 1st */}
        <div className="w-64">
          <img src={assets.logo} alt="Logo" className="cursor-pointer h-10" />
          <p className="text-sm ">
            Experience the power of AI with QuickAi. Transform your content
            creation with our suite of premium AI tools . Write articles,
            generate images, and enhance your workflow.
          </p>
        </div>

        {/* 2nd */}

        <div className="  w-64 flex flex-col gap-2 font-normal items-center justify-center">
          <h2 className="font-bold">Company</h2>
          <div className="text-sm">Home</div>
          <div className="text-sm">About Us</div>
          <div className="text-sm">Contact Us</div>
          <div className="text-sm">Privacy policy</div>
        </div>

        {/* 3rd */}
        <div className=" w-64 flex flex-col items-center justify-start gap-4">
          <h2 className="font-bold">Subscribe to our newsletter</h2>
          <div className="text-sm font-normal">
            The latest news, articles, and resources, sent to your inbox weekly.
          </div>
          <div className=" flex gap-2">
            <input type="text" className="border outline-none px-4 rounded-2xl placeholder:text-sm placeholder:text-center" placeholder="Enter your email" />
            <a href="" className="bg-blue-700 text-white px-6 py-1 rounded-full">Subscribe</a>
          </div>
        </div>
      </div>

      <div className="border border-gray-300 bg-gray-200 w-[1400px]"></div>
      <p className="font-normal text-sm">Copyright 2025 © QuickAi. All Right Reserved.</p>
    </div>
  );
}

export default Footer;
