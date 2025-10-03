import { SquarePen } from "lucide-react";
import Loader from "../../loader/Loader"; // Make sure this exists

import React, { useState } from "react";
import { FaStarOfDavid } from "react-icons/fa6";
import { useSelector } from "react-redux";
import axios from "axios"; // Make sure axios is imported

const Blog = () => {
  const userInfo = useSelector((store) => store.app.userInfo);
  const [textForAI, setTextforAI] = useState("");
  const [textResponseFromAI, setTextResponseFromAI] = useState("");
  const [isResponse, setIsResponse] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [categoryId, setCategoryId] = useState(0);

  const categories = [
    "General",
    "Technology",
    "Business",
    "Health",
    "Lifestyle",
    "Education",
    "Travel",
    "Food",
  ];

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
      alert("Please provide a keyword or topic.");
      return;
    }

    // Create your prompt with the category name as well
    const finalPrompt = `Suggest blog titles for "${textForAI}" (Category: ${categories[categoryId]}). Format the output as a numbered list.`;

    setIsLoading(true);
    setIsResponse(false);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_API}/ai/blog-title`,
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
      setTextResponseFromAI("❌ Failed to generate titles. Please try again.");
      setIsResponse(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="bg-blue-50 pt-10 flex pl-10 h-screen gap-4 items-start justify-start w-full">
        {/* Left panel */}
        <div className="bg-white p-8 flex flex-col items-center justify-center gap-6 w-1/2">
          <div className="flex items-center gap-2 justify-start">
            <FaStarOfDavid className="bg-blue-400 rounded-full text-white" />
            <h1 className="font-semibold">AI Title Generator</h1>
          </div>

          <div className="w-full">
            <label className="pb-4">Keyword</label>
            <input
              value={textForAI}
              onChange={(e) => setTextforAI(e.target.value)}
              className="border border-gray-300 outline-none rounded-xl py-1 px-8 w-full"
              placeholder="The future of AI..."
            />
          </div>

          <div className="w-full gap-2 flex flex-col">
            <p>Category</p>
            <div className="flex flex-wrap w-2/3 items-center w-full justify-center gap-3">
              {categories.map((item, index) => (
                <div
                  onClick={() => setCategoryId(index)}
                  className={`${
                    index === categoryId ? `bg-blue-400 text-white` : `bg-white`
                  } border border-gray-200 cursor-pointer py-1 px-3 rounded-2xl`}
                  key={index}
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={handleGenerate}
            disabled={isLoading}
            className="flex cursor-pointer text-white items-center justify-center gap-2 bg-blue-400 w-full py-2 rounded-3xl mt-4 disabled:opacity-50"
          >
            <SquarePen />
            <p>{isLoading ? <Loader /> : "Generate Titles"}</p>
          </button>
        </div>

        {/* Right panel for output */}
        <div className="bg-white p-8 flex flex-col items-start w-1/3 justify-start">
          <h2 className="font-semibold mb-4">Suggested Titles</h2>
          <div className="whitespace-pre-wrap text-gray-700 min-h-[300px] w-full overflow-auto">
            {isResponse ? (
              <pre>{textResponseFromAI}</pre>
            ) : (
              <p className="text-gray-400">
                Enter a topic and click "Generate Titles" to get started
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
