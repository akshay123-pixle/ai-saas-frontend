import React, { useState, useEffect } from "react";
import { MdDelete } from "react-icons/md";
import { useSelector } from "react-redux";

const Dash = () => {
  const allContent = useSelector((store) => store.allContent.allContent);
  const [allData, setAllData] = useState([]);

  useEffect(() => {
    if (allContent && allContent.length > 0) {
      setAllData(allContent);
      // console.log(allData);
    }
  }, [allContent]);

  return (
    <div>
      <div className="flex bg-blue-50 pt-10 pb-10 rounded-2xl flex-col pl-10 h-max-[1000px] max-w-full items-start justify-start">
        <div className="ml-6 font-bold text-lg">Recent Creations</div>
        <div className="">
          {allData?.map((item, index) => (
            <div
              key={index}
              className="border flex flex-col p-4 items-start justify-center border-gray-300 gap-1 mt-6 ml-6 bg-white rounded-lg shadow-sm"
            >
              <p className="font-medium text-gray-800">{item.input}</p>
              <p className="text-sm text-gray-600">
                {item.type} - {new Date(item.createdAt).toLocaleString()}
              </p>
              <MdDelete className="text-red-500 cursor-pointer" />

            </div>
          ))}

          {allData?.length === 0 && (
            <p className="ml-6 mt-10 text-gray-500">No content created yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dash;
