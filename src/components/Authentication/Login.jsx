import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { userLogin } from "../../store/userSlice";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import Loader from "../loader/Loader";
const Login = () => {
  const userInfo = useSelector((store) => store.app.userInfo);
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(null);
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_API}/user/login`,
        { email, password }
      );

      if (!data?.success) {
        toast.error(data?.message || "Login failed.");
        return;
      }

      // Save user info
      const userData = data.user;
      toast.success("Login successful!");
      localStorage.setItem("userInfo", JSON.stringify(userData));
      dispatch(userLogin(userData));
      navigate("/dashboard");
    } catch (error) {
      console.error("Login error:", error);
      const message =
        error.response?.data?.message || "Error occurred during login.";
      toast.error(message);
    } finally {
      setIsLoading(false);
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              className="border px-12 py-1 rounded-2xl outline-none border-gray-400"
              placeholder="Enter the name"
            />
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white px-12 cursor-pointer py-2 rounded-4xl border border-gray-300 "
          >
            {isLoading ? <Loader /> : "Login"}
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
