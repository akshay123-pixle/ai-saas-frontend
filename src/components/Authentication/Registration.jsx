import React from "react";
import { useNavigate } from "react-router-dom";

const Registration = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full h-screen bg-blue-50">
      <div className="flex items-center justify-center ">
        <form className="flex flex-col items-center border border-gray-400 rounded-3xl shadow-2xl p-6 space-y-8  m-40 max-w-1/2 justify-center ">
          <div className="flex flex-col">
            <label htmlFor="">Name</label>
            <input
              type="text"
              required={true}
              className="border px-12 py-1 rounded-2xl outline-none border-gray-400"
              placeholder="Enter the name"
            />
          </div>
          <div className="flex flex-col ">
            <label htmlFor="">Email</label>
            <input
              required={true}

              type="email"
              className="border px-12 py-1 rounded-2xl outline-none border-gray-400"
              placeholder="Enter the name"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="">Password</label>
            <input
              required={true}

              type="password"
              className="border px-12 py-1 rounded-2xl outline-none border-gray-400"
              placeholder="Enter the name"
            />
          </div>

          <button className="bg-blue-500 text-white px-12 cursor-pointer py-2 rounded-4xl border border-gray-300 ">
            Register
          </button>
          <button
          type="button"
            onClick={() => navigate("/login")}
            className="bg-blue-500 cursor-pointer text-white px-8 cursor-pointe rounded-4xl border border-gray-300 "
          >
            Already Login?
          </button>
        </form>
      </div>
    </div>
  );
};

export default Registration;
