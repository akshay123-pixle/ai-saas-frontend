import { Eraser } from "lucide-react";
import React, { useEffect, useId, useState } from "react";
import { FaStarOfDavid } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { removeBg } from "../../../store/bgRemoval";
import Loader from "../../loader/Loader";
import toast from "react-hot-toast";

export const BackgroundRemove = () => {
  const { bgData, loading, error } = useSelector((store) => store.bg);
  const userInfo = useSelector((store) => store.app.userInfo);
  const dispatch = useDispatch();
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

const handleRemoveBackground = async () => {
  if (!selectedFile) {
    toast.error("Please upload a file first.");
    return;
  }

  if (!userInfo?.id) {
    toast.error("User not found. Please log in again.");
    return;
  }

  try {
    const result = await dispatch(
      removeBg({ userId: userInfo.id, image: selectedFile })
    ).unwrap();

    toast.success(result.message);
    dispatch(removeBg({useId}))
  } catch (err) {
    toast.error(err?.message || "Failed to remove background.");
  }
};


  return (
    <div className="bg-blue-50 pt-10 flex pl-10 h-screen gap-4 items-start justify-start w-full">
      {/* Upload Section */}
      <div className="bg-white p-8 flex flex-col items-center justify-center gap-6 w-1/2">
        <div className="flex items-center gap-2 justify-start">
          <FaStarOfDavid className="bg-blue-400 rounded-full text-white" />
          <h1 className="font-semibold">Background Removal</h1>
        </div>

        <div className="w-full">
          <label className="pb-4">Upload image</label>
          <input
            onChange={handleFileChange}
            type="file"
            className="border text-sm border-gray-300 outline-none rounded-xl py-1 px-8 w-full"
          />
        </div>

        <button
          onClick={handleRemoveBackground}
          disabled={loading}
          className="flex cursor-pointer text-white items-center justify-center gap-2 bg-blue-400 w-full py-2 rounded-3xl mt-4 disabled:opacity-50"
        >
          {loading ? <Loader /> : <Eraser />}
          <p>{loading ? "Processing..." : "Remove Background"}</p>
        </button>
      </div>

      {/* Output Section */}
      <div className="bg-white p-8 flex flex-col items-center w-1/3 justify-center">
        <div className="flex items-center gap-2">
          <Eraser className="text-blue-400" />
          <p>Processed Image</p>
        </div>

        <div className="flex flex-col items-center justify-center p-9 h-96">
          {loading ? (
            <Loader />
          ) : bgData?.imageUrl ? (
            <img
              src={bgData.imageUrl}
              alt="Processed"
              className="max-h-80 object-contain"
            />
          ) : (
            <>
              <Eraser className="text-gray-300" />
              <p className="text-sm text-gray-300 text-center">
                Upload an image and click "Remove Background" to get started
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
