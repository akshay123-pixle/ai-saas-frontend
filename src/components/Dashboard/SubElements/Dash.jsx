import axios from "axios";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { MdDelete } from "react-icons/md";
import { useSelector } from "react-redux";

const Dash = () => {
  const allContent = useSelector((store) => store.allContent.allContent);
  const [allData, setAllData] = useState([]);

  const handleDelete = async (id) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_API}/user/delete`,
        { deleteId: id }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        // Remove deleted item from UI without refresh
        setAllData((prev) => prev.filter((item) => item._id !== id));
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error("Delete failed:", error);
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    if (allContent?.length > 0) {
      setAllData(allContent);
    } else {
      setAllData([]); // clear if user has no content
    }
  }, [allContent]);

  return (
    <div>
      <div className="flex bg-blue-50 pt-10 pb-10 rounded-2xl flex-col pl-10 min-h-[600px] max-w-full items-start justify-start">
        <div className="ml-6 font-bold text-lg">Recent Creations</div>

        <div>
          {allData?.map((item) => (
            <div
              key={item._id}
              className="border flex flex-col p-4 items-start justify-center border-gray-300 gap-1 mt-6 ml-6 bg-white rounded-lg shadow-sm relative"
            >
              <p className="font-medium text-gray-800">{item.input}</p>
              <p className="text-sm text-gray-600">
                {item.type} — {new Date(item.createdAt).toLocaleString()}
              </p>

              <MdDelete
                onClick={() => handleDelete(item._id)}
                className="text-red-500 cursor-pointer absolute top-2 right-2 hover:text-red-700 transition-colors"
                title="Delete item"
              />
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
