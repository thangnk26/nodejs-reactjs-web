import Logo from "../../asset/images/hiring.jpg";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Error from "../Authen/Error";
import Hearder from "../Header/Header";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import { json } from "react-router-dom";
import DatePicker from "react-datepicker";
function MenuLeft_Employer() {
  return (
    <>
      <div className="multi-level">
        <div className="item ">
          <input type="checkbox" id="A" />
          <img src="./frontend/image/Arrow.png" className="arrow" />
          <label className="d-block w-100" htmlFor="A">
            Overview
          </label>
          <ul>
            <li>
              <a href="#">
                <i className="fa-solid fa-headphones" />
                <span>&nbsp;</span>Customer care specialist
              </a>
            </li>
          </ul>
        </div>
        <div className="item">
          <input type="checkbox" id="B" />
          <img src="./frontend/image/Arrow.png" className="arrow" />
          <label className="d-block" htmlFor="B">
            Job posting manager
          </label>
          <ul>
            <li>
              <Link to="/Employer-PostJob">
                <i className="fa-solid fa-folder-plus" />
                <span>&nbsp;</span>Create job postings
              </Link>
            </li>
            <li>
              <Link to="/Employer-ListJob">
                <i className="fa-solid fa-list" />
                <span>&nbsp;</span>List of postings
              </Link>
            </li>
          </ul>
        </div>
        <div className="item">
          <input type="checkbox" id="C" />
          <img src="./frontend/image/Arrow.png" className="arrow" />
          <label className="d-block" htmlFor="C">
            Candidate Management
          </label>
          <ul>
            <li>
              <a href="#">
                <i className="fa-solid fa-users" />
                <span>&nbsp;</span>Curriculum vitae
              </a>
            </li>
            <li>
              <a href="#">
                <i className="fa-solid fa-heart" />
                <span>&nbsp;</span>Saved profile
              </a>
            </li>
            <li>
              <a href="#">
                <i className="fa-solid fa-magnifying-glass" />
                <span>&nbsp;</span>Find a new candidate
              </a>
            </li>
          </ul>
        </div>
        <div className="item">
          <input type="checkbox" id="D" />
          <img src="./frontend/image/Arrow.png" className="arrow" />
          <label className="d-block" htmlFor="D">
            Instructions and Notices
          </label>
          <ul>
            <li>
              <a href="#">
                <i className="fa-solid fa-question" />
                <span>&nbsp;</span>User manual
              </a>
            </li>
            <li>
              <a href="#">
                <i className="fa-solid fa-bell" />
                <span>&nbsp;</span>New notification
              </a>
            </li>
            <li>
              <a href="#">
                <i className="fa-solid fa-paper-plane" />
                <span>&nbsp;</span>Send require
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
export default MenuLeft_Employer;
