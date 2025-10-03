import { Scissors, SquarePen } from "lucide-react";
import React from "react";
import { FaStarOfDavid } from "react-icons/fa6";

const ObjectRemove = () => {
  return (
    <div>
      <div className=" bg-blue-50 pt-10 flex pl-10 h-screen gap-4 items-start justify-start w-full">
        {/* 1st */}
        <div className="bg-white p-8 flex flex-col items-center justify-center gap-6 w-1/2 ">
          <div className="flex items-center gap-2 justify-start">
            <FaStarOfDavid className="bg-blue-400 rounded-full text-white" />
            <h1 className="font-semibold">Object Removal</h1>
          </div>

          <div className="w-full">
            <label className="pb-4">Upload image</label>
            <input
              type="file"
              className="border text-sm border-gray-300 outline-none rounded-xl py-1 px-8 w-full"
              placeholder="Remove Object..."
            />
          </div>
          <div className="w-full">
            <label className="pb-4">Describe object to remove</label>
            <textarea
              className="border text-sm border-gray-300 outline-none rounded-xl py-4 px-8 w-full"
              placeholder="e.g car in background, tree from the image.."
            />
            <p className="text-sm font-normal">Be specific about what you want to remove</p>
          </div>

          <div className="flex cursor-pointer text-white items-center justify-center gap-2 bg-blue-400 w-full py-2 rounded-3xl mt-4 ">
            <Scissors />
            <p>Remove Object</p>
          </div>
        </div>

        {/* 2nd */}
        <div className="bg-white p-8 flex flex-col items-center w-1/3 justify-center">
          <div className="flex items-start justify-start gap-2">
            <Scissors className="text-blue-400" />
            <p>Processed Image</p>
          </div>

          <div className="flex flex-col items-center justify-center p-9 h-96">
            <Scissors className="text-gray-300" />
            <p className="text-sm text-gray-300">
              Upload an image and click "Remove Object" to get started
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ObjectRemove;
