import React from "react";
import { AiToolsData, assets } from "../assets/assets";
import { dummyTestimonialData } from "../assets/assets";

const Testimonial = () => {
  return (
    <div className="w-full mt-25">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-medium">Loved by Creators</h1>
        <p className="font-normal text-center">
          Don't just take our word for it. Here's what our users are saying..
        </p>
      </div>

      <div className="flex flex-wrap items-center  justify-center gap-4 bg-white mt-10">
        {dummyTestimonialData?.map((item, index) => (
          <div
            key={index}
            className="border cursor-pointer w-1/4 p-4 rounded-3xl border-gray-300 shadow-xl  space-y-2"
          >
            <div className="flex">
              {[...Array(item?.rating)].map((rate, index) => (
                <img src={assets.star_icon} />
              ))}
            </div>

            <p className="text-sm font-light">{item.content}</p>
            <div className="  border border-gray-300"></div>
            <div className="flex gap-2 ">
              <img className="h-8" src={item.image} alt="" />
              <div className="flex flex-col">
                <p className="font-semibold text-[15px]">{item.name}</p>
                <p className="font-light text-[14px]">{item.title}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonial;
