import { useEffect, useState } from "react";
import { json, Link } from "react-router-dom";
import Error from "../Authen/Error";
import Hearder from "../Header/Header";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import MenuLeft_Employer from "./MenuLeft_Employer";

function Employer_CvApply() {
  const [inputs, setInputs] = useState("");
  const [getJob, setJob] = useState("");
  const [seekersApply, setSeekersApply] = useState("");
  useEffect(() => {
    var dataUser = localStorage.getItem("user");
    dataUser = JSON.parse(dataUser);
    setInputs(dataUser);
    axios
      .get(`http://localhost:8085/api/get-job?id=${dataUser.id}`)
      .then((res) => {
        console.log(res.data.data);
        setJob(res.data.data);
        if (res.data.data.length > 0) {
          let arr = res.data.data;
          arr.map((value, key) => {
            console.log(value.id);
            axios
              .get(`http://localhost:8085/api/get-job-byJob?id=${value.id}`)
              .then((res1) => {
                // console.log(res1.data.data);
                if (res1.data.data.length > 0) {
                  setSeekersApply(res1.data.data);
                  console.log(res1.data.data);
                }
              });
          });
        }
      });
  }, []);
  function renderCv() {
    if (seekersApply.length > 0) {
      return seekersApply.map((value, key) => {
        var date = value.seekerApplyData.birthday;
        return (
          <>
            <div className="job_has_cv d-inline-block">
              <div className="cv_top w-100 d-flex">
                <div className="cv_image">
                  <img
                    src={
                      value.seekerApplyData.gender == 1
                        ? "frontend/image/boy.jpg"
                        : "frontend/image/girl3.jpg"
                    }
                  />
                </div>
                <div className="cv_title d-block  ">
                  <div className="cv_location">
                    <p>
                      <i className="fa-duotone fa-input-text" />
                      &nbsp;{value.seekerData.fullname}
                    </p>
                  </div>
                  <div className="cv_email">
                    <p>
                      <i className="fa-solid fa-envelope" />
                      &nbsp;{value.seekerData.email}
                    </p>
                  </div>
                  <div className="cv_salary">
                    <p>
                      <i className="fa-solid fa-location-pin" />
                      &nbsp;{value.seekerApplyData.address}
                    </p>
                  </div>
                  <div className="cv_number">
                    <p>
                      <i className="fa-sharp fa-solid fa-phone-volume" />
                      &nbsp;{value.seekerData.numberphone}
                    </p>
                  </div>
                </div>
              </div>
              <div className="cv_content">
                {/* <div class="cv_info"> */}
                <div className="jcv_timeType">
                  <p>
                    <i className="fa-solid fa-venus-mars" />
                    &nbsp;Gender:{" "}
                    {value.seekerApplyData.gender == 1 ? (
                      <>Male</>
                    ) : (
                      <>Female</>
                    )}
                  </p>
                </div>
                <div className="cv_date">
                  <p>
                    <i className="fa-solid fa-cake-candles" />
                    &nbsp;Birthday: {date.slice(0, 10)}
                  </p>
                </div>
                {/* </div> */}
                <div className="cv_education">
                  <p>
                    <i className="fa-sharp fa-solid fa-school" />
                    &nbsp;Education: {value.seekerApplyData.education}
                  </p>
                </div>
                <div className="cv_certification">
                  <p>
                    <i className="fa-solid fa-graduation-cap" />
                    &nbsp;Certication: {value.seekerApplyData.certication}
                  </p>
                </div>
                <div className="cv_exp">
                  <p>
                    <i className="fa-solid fa-user-tie" />
                    &nbsp;Experience: {value.seekerApplyData.experience}
                  </p>
                </div>
                <div className="cv_skills">
                  <p>
                    <i className="fa-solid fa-lightbulb" />
                    &nbsp;Skill: {value.seekerApplyData.skills}
                  </p>
                </div>
                <div className="cv_career">
                  <p>
                    <i className="fa-solid fa-hand-fist" />
                    &nbsp;Career: {value.seekerApplyData.career}
                  </p>
                </div>
              </div>
            </div>
          </>
        );
      });
    }
  }
  return (
    <>
      <div className="page-employers">
        <div className="nav border-0">
          <MenuLeft_Employer />
          <div className="info">
            <div className="employer_info w-100 d-inline-block">
              <div className="news_management d-flex flex-col w-100 items-center ">
                <div className=" news_statistics">News statistics</div>
                <div className="news">
                  <div className="h-full d-flex align-items-center justify-content-center flex-column">
                    <span className="text-center">
                      Total posted information
                    </span>
                    <span className="">0</span>
                  </div>
                </div>
                <div className="news">
                  <div className="h-full d-flex align-items-center justify-content-center flex-column">
                    <span className="text-center">Paid news</span>
                    <span className="">0</span>
                  </div>
                </div>
                <div className="news">
                  <div className="h-full d-flex align-items-center justify-content-center flex-column">
                    <span className="text-center">Free news </span>
                    <span className="">0</span>
                  </div>
                </div>
              </div>
              <div className="manager_job_posted w-100">
                <div className="Cv_seeker w-100">
                  {" "}
                  <div className="w-100 d-inline-block ">
                    {" "}
                    <button className="btn btn-primary">
                      &larr;&nbsp; Back Job
                    </button>
                  </div>
                  {renderCv()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Employer_CvApply;
