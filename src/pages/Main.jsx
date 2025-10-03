import React from "react";
import { AiToolsData } from "../assets/assets.js";
const Main = () => {
  return (
    <div className="w-full">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-medium">Powerful AI Tools</h1>
        <p className="font-normal text-center">
          Everything you need to create, enhance, and optimize your content with
          cutting-edge AI technology.
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-4 bg-white mt-8">
        {AiToolsData?.map((item, index) => (
          <div
            key={index}
            className="border cursor-pointer  w-1/4 p-5 rounded-3xl border-gray-300 shadow-xl  space-y-2"
          >
            <item.Icon
              style={{
                backgroundImage: `linear-gradient(to right, ${item.bg.from}, ${item.bg.to})`,
              }}
              className="w-8 h-8 border-none rounded-lg"
            />

            <p className="text-lg font-medium">{item.title}</p>
            <p className="text-sm font-normal">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Main;
