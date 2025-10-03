import { useDispatch, useSelector } from "react-redux";
import { assets } from "../assets/assets.js";
import { useNavigate } from "react-router-dom";
import { userLogin } from "../store/userSlice.js";
import toast from "react-hot-toast";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userInfo = useSelector((state) => state.app.userInfo);

  const handleLogout = () => {
    localStorage.removeItem("userInfo");        // clear from localStorage
    dispatch(userLogin(null));                 // clear from Redux
    navigate("/login");
    toast.success("Logged Out")                        // redirect to login (optional)
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between max-w-screen-xl py-4 mx-auto">
        <img
          onClick={() => navigate("/")}
          src={assets.logo}
          alt="Logo"
          className="h-10 cursor-pointer"
        />

        <div className="flex items-center gap-3">
          {userInfo ? (
            <>
              <button
                onClick={handleLogout}
                className="text-sm text-white px-5 py-2.5 rounded-full bg-red-600 hover:bg-red-700 transition-all"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => navigate("/login")}
                className="text-sm text-white px-5 py-2.5 rounded-full bg-blue-700 hover:bg-blue-800 transition-all"
              >
                Get Started
              </button>
            </>
          )}

          <img
            src={assets.arrow_icon}
            alt="Arrow"
            className="h-2"
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
