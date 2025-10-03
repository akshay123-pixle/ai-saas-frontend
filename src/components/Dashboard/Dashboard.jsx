import React, { useEffect, useState } from "react";
import { assets } from "../../assets/assets";
import { Article } from "../Dashboard/SubElements/Article.jsx";
import Blog from "../Dashboard/SubElements/Blog.jsx";
import Images from "../Dashboard/SubElements/Images.jsx";
import ObjectRemove from "../Dashboard/SubElements/ObjectRemove.jsx";
import { BackgroundRemove } from "../Dashboard/SubElements/BackgroundRemove.jsx";
import ReviewResume from "../Dashboard/SubElements/ReviewResume.jsx";
import { useDispatch, useSelector } from "react-redux";
import { MdDelete } from "react-icons/md";
import {
  Hash,
  Eraser,
  Scissors,
  FileText,
  House,
  Pen,
} from "lucide-react";
import Dash from "./SubElements/Dash.jsx";
import { getDashboardContent } from "../../store/allContent.js";
import axios from "axios";

const Dashboard = () => {
  const userInfo = useSelector((store) => store.app.userInfo);
  const allContent = useSelector((store) => store.allContent.allContent);
  const dispatch = useDispatch();

  const [componentId, setComponentId] = useState(0);
  const [componentRender, setComponentRender] = useState(<Dash />);

  const dashboardRoutes = [
    {
      id: 0,
      path: "dashboard",
      name: "Dashboard",
      element: <Dash />,
      icon: <House />,
    },
    {
      id: 1,
      path: "write-article",
      type: "write-article",
      name: "Write Article",
      element: <Article />,
      icon: <House />,
    },
    {
      id: 2,
      path: "blog-title",
      type: "blog-title",
      name: "Blog Title",
      element: <Blog />,
      icon: <Pen />,
    },
    {
      id: 3,
      path: "generate-images",
      type: "generate-images",
      name: "Generate Images",
      element: <Images />,
      icon: <Hash />,
    },
    {
      id: 4,
      path: "remove-bg",
      type: "remove-bg",
      name: "Remove Background",
      element: <BackgroundRemove />,
      icon: <Eraser />,
    },
    {
      id: 5,
      path: "remove-object",
      type: "remove-object",
      name: "Remove Object",
      element: <ObjectRemove />,
      icon: <Scissors />,
    },
    {
      id: 6,
      path: "review-resume",
      name: "Review Resume",
      element: <ReviewResume />,
      icon: <FileText />,
    },
  ];

  useEffect(() => {
    // Set the selected component
    const route = dashboardRoutes.find((item) => item.id === componentId);
    if (route) {
      setComponentRender(route.element);
    }

    // Fetch user's dashboard content
    fetchDashboardData();
  }, [componentId]);

  const fetchDashboardData = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_API}/user/getAllData`,
        { userId: userInfo?.id } // <-- fixed from id to _id
      );
      dispatch(getDashboardContent(response.data.allContent));
      // console.log("Fetched Dashboard Content:", response.data.allContent);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    }
  };

  return (
    <div className="w-full grid grid-cols-[1fr_4fr] justify-between">
      {/* Sidebar */}
      <div className="border border-gray-300 px-10 h-screen py-5 space-y-4 bg-white">
        <div className="space-y-1">
          <img className="h-10" src={assets.profile_img_1} alt="Profile" />
          <p>{userInfo?.name || "User"}</p>
        </div>

        {dashboardRoutes.map((item, index) => (
          <div
            key={index}
            className={`flex gap-2 p-3 cursor-pointer rounded-xl ${
              componentId === item.id ? "bg-blue-500 text-white" : ""
            }`}
            onClick={() => setComponentId(item.id)}
          >
            {item.icon}
            <span>{item.name}</span>
            
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="p-5">
        {componentRender}
      </div>
    </div>
  );
};

export default Dashboard;
