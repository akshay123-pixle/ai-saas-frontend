import { FileText } from "lucide-react";
import React from "react";
import { FaStarOfDavid } from "react-icons/fa6";

const ReviewResume = () => {
  return (
    <div>
      <div className=" bg-blue-50 pt-10 flex pl-10 h-screen gap-4 items-start justify-start w-full">
        {/* 1st */}
        <div className="bg-white p-8 flex flex-col items-center justify-center gap-6 w-1/2 ">
          <div className="flex items-center gap-2 justify-start">
            <FaStarOfDavid className="bg-blue-400 rounded-full text-white" />
            <h1 className="font-semibold">Resume Review</h1>
          </div>

          <div className="w-full">
            <label className="pb-4">Upload Resume</label>
            <input
              type="file"
              className="border text-sm border-gray-300 outline-none rounded-xl py-1 px-8 w-full"
              placeholder="Remove Object..."
            />
          </div>

          <div className="flex cursor-pointer text-white items-center justify-center gap-2 bg-blue-400 w-full py-2 rounded-3xl mt-4 ">
            <FileText />
            <p>Review Resume</p>
          </div>
        </div>

        {/* 2nd */}
        <div className="bg-white p-8 flex flex-col items-center w-1/3 justify-center">
          <div className="flex items-start justify-start gap-2">
            <FileText className="text-blue-400" />
            <p>Analyse result</p>
          </div>

          <div className="flex flex-col items-center justify-center p-9 h-96">
            <FileText className="text-gray-300" />
            <p className="text-sm text-gray-300">
              Upload an image and click "Review Resume" to get started
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewResume;
