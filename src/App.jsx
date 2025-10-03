import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./pages/Navbar.jsx";
import Hero from "./pages/Hero.jsx";
import Main from "./pages/Main.jsx";
import Testimonial from "./pages/Testimonial.jsx";
import Subscription from "./pages/Subscription.jsx";
import Footer from "./pages/Footer.jsx";
import Dashboard from "./components/Dashboard/Dashboard.jsx";
import { Article } from "./components/Dashboard/SubElements/Article.jsx";
import Blog from "./components/Dashboard/SubElements/Blog.jsx";
import Images from "./components/Dashboard/SubElements/Images.jsx";
import ObjectRemove from "./components/Dashboard/SubElements/ObjectRemove.jsx";
import { BackgroundRemove } from "./components/Dashboard/SubElements/BackgroundRemove.jsx";
import ReviewResume from "./components/Dashboard/SubElements/ReviewResume.jsx";
import Registration from "./components/Authentication/Registration.jsx";
import Toaster from "react-hot-toast";
import Login from "./components/Authentication/Login.jsx";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "./store/userSlice.js";
import Success from "./components/Status/Success.jsx";
import Failure from "./components/Status/Failure.jsx";

function App() {
  const userInfo = useSelector((store) => store.app.userInfo);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!userInfo && localStorage.getItem("userInfo")) {
      const data = JSON.parse(localStorage.getItem("userInfo"));
      dispatch(userLogin(data));
    }
  }, [userInfo]);

  return (
    <>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Hero />
              <Main />
              <Testimonial />
              <Subscription />
              <Footer />
            </>
          }
        />
        <Route path="/success"element={<Success/>}/>
        <Route path="/failure"element={<Failure/>}/>
        <Route path="/dashboard" element={userInfo? <Dashboard/>:<Login/>}>
          <Route path="dashboard" element={<Article />} />
          <Route path="write-article" element={<Article />} />
          <Route path="blog-title" element={<Blog />} />
          <Route path="generate-images" element={<Images />} />
          <Route path="remove-bg" element={<BackgroundRemove />} />
          <Route path="remove-object" element={<ObjectRemove />} />
          <Route path="review-resume" element={<ReviewResume />} />
        </Route>
        <Route
          path="/register"
          element={userInfo ? <Dashboard /> : <Registration />}
        />
        <Route path="/login" element={userInfo ? <Dashboard /> : <Login />} />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
