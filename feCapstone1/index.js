import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
// import "@fortawesome/fontawesome-free/css/all.min.css";
import "boxicons";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import Login from "./components/Authen/Login";
import Register from "./components/Authen/Register";
import PageCV from "./components/Job/pageCV";
import Fjob from "./components/Job/Fjob";
import Postjob from "./components/Job/postjob";
import Admin from "./components/Authen/Admin";
import AdminUpdateUser from "./components/Authen/AdminUpdateUser";
import HomeCreateCv from "./components/Job/HomeCreateCv";
import Employer_Postjob from "./components/Job/Employer_Postjob";
import Employer_ListJob from "./components/Job/Employer_ListJob";
import Adminchart from "./components/Authen/Adminchart";
import Chart from "chart.js";
import Employer_CvApply from "./components/Job/Employer_CvApply";
import Verify from "./components/Job/Verify";
import Profile from "./components/Job/Profile";
import Seeker_calendar from "./components/Job/Seeker_calendar";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <App>
        <Routes>
          <Route index path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/createcv" element={<PageCV />} />
          <Route path="/findjob" element={<Fjob />} />
          <Route path="/postjob" element={<Postjob />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/chart" element={<Adminchart />} />
          <Route path="/admin&Update-user" element={<AdminUpdateUser />} />
          <Route path="/SeekerHome" element={<HomeCreateCv />} />
          <Route path="/Employer-PostJob" element={<Employer_Postjob />} />
          <Route path="/Employer-ListJob" element={<Employer_ListJob />} />
          <Route path="/CvApply" element={<Employer_CvApply />} />
          <Route path="/myprofile" element={<Profile />} />
          <Route path="/verify-application" element={<Verify />} />
          <Route path="/calendar" element={<Seeker_calendar />} />
        </Routes>
      </App>
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
