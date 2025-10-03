import React, { useState } from "react";
import { FaStarOfDavid } from "react-icons/fa6";
import { SquarePen } from "lucide-react";
import Loader from "../../loader/Loader"; // Make sure this exists
import axios from "axios";
import { useSelector } from "react-redux";
import ReactMarkdown from "react-markdown";

export const Article = () => {
  const userInfo = useSelector((store) => store.app.userInfo);
  const [textForAI, setTextforAI] = useState("");
  const [textResponseFromAI, setTextResponseFromAI] = useState("");
  const [isResponse, setIsResponse] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [clickId, setClickid] = useState(0);

  const lengths = ["200-400", "400-800", "800-1000"];

  const cleanAIResponse = (raw) => {
    let content = "";

    if (Array.isArray(raw)) {
      content = raw.join("\n\n"); // join paragraphs with spacing
    } else if (typeof raw === "string") {
      content = raw;
    } else {
      console.warn("Unexpected AI response format:", raw);
      return "⚠️ Invalid response format from AI.";
    }

    return content
      .replace(/```[a-z]*\n?/gi, "") // remove markdown code fences
      .replace(/```/g, "")
      .trim();
  };

  const handleGenerate = async () => {
    if (!textForAI.trim()) {
      console.log("Please provide a topic");
      return;
    }

    const finalPrompt = `Write an article about "${textForAI}" in a length of ${lengths[clickId]} words. Format the output in markdown.`;

    setIsLoading(true);
    setIsResponse(false);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_API}/ai/write-article`,
        {
          userId: userInfo?.id,
          text: finalPrompt,
        }
      );

      const aiText = response.data?.text || response.data;
      const cleanedText = cleanAIResponse(aiText);
      setTextResponseFromAI(cleanedText);
      setIsResponse(true);
    } catch (error) {
      console.error("❌ API Error:", error);
      setTextResponseFromAI("❌ Failed to generate article. Try again.");
      setIsResponse(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="bg-blue-50 pt-10 flex pl-10 h-screen gap-4 items-start justify-start w-full">
        {/* Left Panel */}
        <form className="bg-white p-8 flex flex-col items-center justify-center gap-4">
          <div className="flex items-center gap-2 justify-start">
            <FaStarOfDavid className="bg-blue-400 rounded-full text-white" />
            <h1 className="font-semibold">AI Article Writer</h1>
          </div>

          {/* Input Field */}
          <div className="w-full">
            <label htmlFor="topic">Article Topic</label>
            <input
              id="topic"
              className="border border-gray-300 outline-none rounded-xl py-1 px-8 w-full"
              placeholder="The future of AI..."
              value={textForAI}
              onChange={(e) => setTextforAI(e.target.value)}
            />
          </div>

          {/* Length Selection */}
          <div className="w-full flex flex-wrap gap-2">
            <p className="w-full">Article Length</p>
            {lengths.map((item, index) => (
              <a
                onClick={() => setClickid(index)}
                key={index}
                className={`${
                  index === clickId
                    ? "bg-blue-600 text-white"
                    : "bg-blue-50 text-blue-300"
                } border cursor-pointer border-gray-200 py-1 px-6 rounded-2xl text-[10px]`}
              >
                Short ({item})
              </a>
            ))}
          </div>

          {/* Generate Button */}
          <div
            className="flex cursor-pointer text-white items-center justify-center gap-2 bg-blue-400 w-full py-2 rounded-3xl mt-4"
            onClick={handleGenerate}
          >
            <SquarePen />
            {isLoading ? (
              <Loader />
            ) : (
              <button type="button">Generate article</button>
            )}
          </div>
        </form>

        {/* Right Panel */}
        <div className="bg-white p-8 flex flex-col items-start justify-start w-full max-w-[600px] min-h-[400px]">
          <div className="flex items-center gap-2 mb-4">
            <SquarePen className="text-blue-400" />
            <p className="font-semibold">Generated Article</p>
          </div>

          <div className="flex flex-col items-start justify-start p-4 w-full">
            {isLoading ? (
              <Loader />
            ) : isResponse ? (
              <div className="prose max-w-full text-gray-700">
                <ReactMarkdown>{textResponseFromAI}</ReactMarkdown>
              </div>
            ) : (
              <p className="text-sm text-gray-300">
                Enter a topic and click "Generate Article" to get started.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
