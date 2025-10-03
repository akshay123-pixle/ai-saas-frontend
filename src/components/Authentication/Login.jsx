import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { userLogin } from "../../store/userSlice";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
const Login = () => {
  const userInfo = useSelector((store) => store.app.userInfo);
  const dipatch = useDispatch();
  const [email, setEmail] = useState("test@gmail.com");
  const [password, setPassword] = useState("123456");
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_API}/user/login`,
        {
          email,
          password,
        }
      );
      // console.log(response.data.user);
      const userData = await response.data.user;
      toast.success("success");
      localStorage.setItem("userInfo", JSON.stringify(userData));
      dipatch(userLogin(userData));
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
      toast.error("Erro occured");
    }
  };

  return (
    <div className="w-full h-screen bg-blue-50">
      <div className="flex items-center justify-center ">
        <form
          onSubmit={handleLogin}
          className="flex flex-col items-center border border-gray-400 rounded-3xl shadow-2xl p-6 space-y-8  m-40 max-w-1/2 justify-center "
        >
          <div className="flex flex-col ">
            <label htmlFor="">Email</label>
            <input
              required={true}
              value={email}
              onChange={() => setEmail((e) => e.target.value)}
              type="email"
              className="border px-12 py-1 rounded-2xl outline-none border-gray-400"
              placeholder="Enter the name"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="">Password</label>
            <input
              required={true}
              value={password}
              onChange={() => setPassword((e) => e.target.value)}
              type="password"
              className="border px-12 py-1 rounded-2xl outline-none border-gray-400"
              placeholder="Enter the name"
            />
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white px-12 cursor-pointer py-2 rounded-4xl border border-gray-300 "
          >
            Login
          </button>
          <button
            type="button"
            onClick={() => navigate("/register")}
            className="bg-blue-500 cursor-pointer text-white px-8 cursor-pointe rounded-4xl border border-gray-300 "
          >
            Please register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
