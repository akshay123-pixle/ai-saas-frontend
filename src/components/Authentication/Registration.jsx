import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "../loader/Loader";
import toast from "react-hot-toast";
import axios from "axios";

const Registration = () => {
  const userInfo = useSelector((store) => store.app.userInfo);
  const dipatch = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(null);
  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_API}/user/register`,
        {
          name,
          email,
          password,
        }
      );
      const userData = response.data.user;
      toast.success("Registered is successful!");
      localStorage.setItem("userInfo", JSON.stringify(userData));
      dipatch(userLogin(userData));
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      toast.error("Error occurred during registration");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="w-full h-screen bg-blue-50">
      <div className="flex items-center justify-center ">
        <form onSubmit={handleLogin} className="flex flex-col items-center border border-gray-400 rounded-3xl shadow-2xl p-6 space-y-8  m-40 max-w-1/2 justify-center ">
          <div className="flex flex-col">
            <label htmlFor="">Name</label>
            <input
              type="text"
              required={true}
              onChange={(e) => setName(e.target.value)}
              className="border px-12 py-1 rounded-2xl outline-none border-gray-400"
              placeholder="Enter the name"
            />
          </div>
          <div className="flex flex-col ">
            <label htmlFor="">Email</label>
            <input
              required={true}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              className="border px-12 py-1 rounded-2xl outline-none border-gray-400"
              placeholder="Enter the name"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="">Password</label>
            <input
              required={true}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              className="border px-12 py-1 rounded-2xl outline-none border-gray-400"
              placeholder="Enter the name"
            />
          </div>

          <button className="bg-blue-500 text-white px-12 cursor-pointer py-2 rounded-4xl border border-gray-300 ">
            {isLoading? <Loader/>:"Register"}
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
