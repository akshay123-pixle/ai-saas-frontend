import axios from "axios";
import { SquarePen, Image } from "lucide-react";
import React, { useState } from "react";
import { FaStarOfDavid } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Loader from "../../loader/Loader.jsx";
const Images = () => {
  const userInfo = useSelector((store) => store.app.userInfo?.plan);
  const userId = useSelector((store) => store.app.userInfo?.id);
  const [categoryId, setCategoryId] = useState(0);
  const [prompt, setPrompt] = useState("");
  const [style, setStyle] = useState("Realistic");
  const [shouldGenerate, setShouldGenerate] = useState(null);
  const [shouldGenerateMsg, setShouldGenerateMsg] = useState("");
  const [outputGeneratedImage, setOutputGeneratedImage] = useState("");
  const [trackLoading, setTrackLoading] = useState(null);
  const Catgories = ["Realistic", "Ghibli Style"];
  const navigate = useNavigate();

  async function handleImageGeneration(e) {
    e.preventDefault();
    if (prompt === " " || prompt === "" || !prompt || prompt === "undefined") {
      toast.error("please add promp to generate image");
      return;
    }
    try {
      console.log(`${prompt} in ${Catgories[categoryId]}`);

      console.log(prompt, style);
      if (userInfo === "Basic" && !shouldGenerate) {
        setShouldGenerate(true);
        let message = "Please upgrade your plan to access this feature";
        setShouldGenerate(message);
        return;
      } else {
        setTrackLoading(true);
        const response = await axios.post(
          `${import.meta.env.VITE_BACKEND_API}/ai/generate-image`,
          {
            userId: userId,
            prompt: `${prompt} in ${Catgories[categoryId]}`,
          }
        );

        if (!response.data.success) {
          console.log("Failed", response.data);
          toast.error(response.data.message || "Image failed while generating");
        }
        setOutputGeneratedImage(response.data.imageUrl);
        toast.success(response.data.message);
        setPrompt("");
      }
    } catch (error) {
      console.log(error);
      toast.error(
        error?.response?.data?.message || "something failed at backend"
      );
    } finally {
      setTrackLoading(null);
      setPrompt("");
    }
  }

  return (
    <div>
      <div className=" bg-blue-50 pt-10 flex pl-10 h-screen gap-4 items-start justify-start w-full">
        {/* 1st */}
        <form
          onSubmit={handleImageGeneration}
          className="bg-white p-8 flex flex-col items-center justify-center gap-6 w-1/2 "
        >
          <div className="flex items-center gap-2 justify-start">
            <FaStarOfDavid className="bg-blue-400 rounded-full text-white" />
            <h1 className="font-semibold">AI Image Generator</h1>
          </div>

          <div className="w-full">
            <label className="pb-4">Describe Your Image</label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="border  border-gray-300 outline-none rounded-xl py-4 px-8 w-full"
              placeholder="Describe what you want to see in the image..."
            />
          </div>

          <div className="w-full gap-2 flex flex-col">
            <p>Style</p>
            <div className="flex flex-wrap w-2/3 items-center w-full justify-start gap-3 ">
              {Catgories.map((item, index) => (
                <div
                  onClick={() => {
                    setCategoryId(index), setStyle(item);
                  }}
                  className={`${
                    index === categoryId ? `bg-blue-400` : `bg-white`
                  } border border-gray-200 cursor-pointer py-1 px-3 rounded-2xl `}
                  key={index}
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="flex cursor-pointer text-white items-center justify-center gap-2 bg-green-400 w-full py-2 rounded-3xl mt-4 ">
            <Image />
            <button type="submit" className="cursor-pointer">
              {!trackLoading && shouldGenerate
                ? "Please upgrade your plan to access this feature"
                : "Generate Image"}

              {trackLoading && <Loader />}
            </button>
          </div>
          {shouldGenerate && (
            <button
              className="text-red-400 cursor-pointer"
              onClick={() => navigate("/")}
            >
              Subscribe
            </button>
          )}
        </form>

        {/* 2nd */}
        <div className="bg-white p-8 flex flex-col items-center w-1/3 justify-center">
          <div className="flex items-start justify-start gap-2">
            <Image className="text-blue-400" />
            <p>Generate Image</p>
          </div>

          <div className="flex flex-col items-center justify-center p-9 h-96">
            <Image className="text-gray-300" />
            {outputGeneratedImage ? (
              <img className="w-full h-full" src={outputGeneratedImage} />
            ) : (
              <p className="text-sm text-gray-300">
                Enter a topic and click "Generate Image" to get started
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Images;
