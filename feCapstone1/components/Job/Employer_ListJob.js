import Logo from "../../asset/images/hiring.jpg";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Error from "../Authen/Error";
import Hearder from "../Header/Header";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import { json } from "react-router-dom";
import DatePicker from "react-datepicker";
import MenuLeft_Employer from "./MenuLeft_Employer";
import Employer_Postjob from "./Employer_Postjob";
import Employer_EditJob from "./Employer_EditJob";

function Employer_ListJob() {
  const [inputs, setInputs] = useState("");
  const [errors, setErrors] = useState("");
  const [getJob, setJob] = useState("");
  const [jobOrcv, setJobOrCv] = useState(false);
  const [getCv, setCv] = useState("");
  const [seekersApply, setSeekersApply] = useState({});
  const [showEdit, setShowEdit] = useState(false);
  const [JobEdit, setJobEdit] = useState("");
  const [getTime, setTime] = useState("");
  useEffect(() => {
    var dataUser = localStorage.getItem("user");
    dataUser = JSON.parse(dataUser);
    setInputs(dataUser);
    const today = new Date();
    console.log(today);
    axios
      .get(`http://localhost:8085/api/get-job?id=${dataUser.id}`)
      .then((res) => {
        setJob(res.data.data);
        if (res.data.data.length > 0) {
          let arr = res.data.data;
          arr.map((value, key) => {
            var date = value.job_expiration_date.slice(0, 10);
            // console.log(date < today.toJSON().slice(0, 10));
            if (date < today.toJSON().slice(0, 10)) {
              console.log(value.id);
              console.log(dataUser.id);
              const update = {
                id: value.id,
                employer_id: dataUser.id,
                job_status: 0,
              };
              axios
                .put("http://localhost:8085/api/edit-job", update)
                .then((res) => {
                  console.log(res.data);
                });
            }
            axios
              .get(`http://localhost:8085/api/get-job-byJob?id=${value.id}`)
              .then((res1) => {
                setSeekersApply((state) => ({
                  ...state,
                  [key]: res1.data.data,
                }));
                // console.log(res1.data.data);
                // }
              });
          });
        }
      });
    axios
      // .get("http://localhost:8085/api/allcodetype", location_id)
      .get("http://localhost:8085/api/allcodetype?type=TIME")
      .then((res) => {
        console.log("time", res.data.data);
        setTime(res.data.data);
      });
  }, []);
  useEffect(() => {
    var dataUser = localStorage.getItem("user");
    dataUser = JSON.parse(dataUser);
    axios
      .get(`http://localhost:8085/api/get-job?id=${dataUser.id}`)
      .then((res) => {
        console.log("render2", res.data.data);
        setJob(res.data.data);
      });
  }, []);
  function renderJob() {
    console.log(seekersApply);
    if (getJob.length > 0) {
      return getJob.map((value, key) => {
        var date = value.job_expiration_date;
        if (Object.keys(seekersApply).length > 0) {
          for (var key in seekersApply) {
            if (seekersApply[key].length > 0) {
              if (value.id == seekersApply[key][0].job_id) {
                return (
                  <>
                    {/* <div className="manager_job_posted w-100"> */}
                    <div className="job_posted d-inline-block ">
                      <div className="job_title d-inline-block w-100 ">
                        <h2>{value.title}</h2>
                      </div>
                      <div className="job_info">
                        <div className="job_location">
                          <p>
                            <i className="fa-solid fa-map-location-dot" />
                            &nbsp;{value.locationData.value}
                          </p>
                        </div>
                        <p>
                          <i className="fa-solid fa-earth-americas" />
                          &nbsp;Viet Nam
                        </p>
                        <div className="job_salary">
                          <p>
                            <i className="fa-solid fa-money-check-dollar" />
                            &nbsp;{value.job_salary},000,000 VND a month
                          </p>
                        </div>
                        <div className="job_timeType">
                          <p>
                            <i className="fa-solid fa-business-time" />
                            &nbsp;{value.jobtypeData.value}
                          </p>
                        </div>
                        <div className="job_date">
                          <p>
                            <i className="fa-sharp fa-solid fa-clock" />
                            &nbsp;{date.slice(0, 10)}
                          </p>
                        </div>
                      </div>
                      <div className="job_content">
                        <div className="company">
                          <p>Company: {value.company}</p>
                        </div>
                        <div className="job_position">
                          <p>Position: {value.job_position}</p>
                        </div>
                        <div className="job_description">
                          <p>Description: {value.description}</p>
                        </div>
                        <div className="job_requirement">
                          <p>Requirement: {value.job_requirement}</p>
                        </div>
                        <div className="job_skill">
                          <p>Skill: {value.job_skill}</p>
                        </div>
                        <div className="quality">
                          <p>Hiring {value.job_salary} </p>
                        </div>
                        {value.job_status == "0" ? (
                          <>
                            {" "}
                            <div className="expired">
                              <p>
                                The job has expired, please update or delete
                              </p>
                            </div>
                          </>
                        ) : null}
                        <div className="cv">
                          <button
                            className="btn btn-primary"
                            // id={value.id}
                            onClick={() => WhatJobEdit(value)}
                          >
                            Update
                          </button>
                          <button
                            className="btn btn-danger"
                            // id={value.id}
                            onClick={() => WhatJobDelete(value)}
                          >
                            Delete
                          </button>
                          <button
                            className="btn btn-primary"
                            // id={value.id}
                            // onClick={() => setJobOrCv(true)}
                            onClick={() => WhatCv(value)}
                          >
                            {seekersApply[key].length}
                            &nbsp;Applying&nbsp;&nbsp;→
                          </button>
                        </div>
                      </div>
                    </div>
                    {/* </div> */}
                  </>
                );
              }
            } else {
              return (
                <>
                  {/* <div className="manager_job_posted w-100"> */}
                  <div className="job_posted d-inline-block ">
                    <div className="job_title d-inline-block w-100 ">
                      <h2>{value.title}</h2>
                    </div>
                    <div className="job_info">
                      <div className="job_location">
                        <p>
                          <i className="fa-solid fa-map-location-dot" />
                          &nbsp;{value.locationData.value}
                        </p>
                      </div>
                      <p>
                        <i className="fa-solid fa-earth-americas" />
                        &nbsp;Viet Nam
                      </p>
                      <div className="job_salary">
                        <p>
                          <i className="fa-solid fa-money-check-dollar" />
                          &nbsp;{value.job_salary},000,000 VND a month
                        </p>
                      </div>
                      <div className="job_timeType">
                        <p>
                          <i className="fa-solid fa-business-time" />
                          &nbsp;{value.jobtypeData.value}
                        </p>
                      </div>
                      <div className="job_date">
                        <p>
                          <i className="fa-sharp fa-solid fa-clock" />
                          &nbsp;{date.slice(0, 10)}
                        </p>
                      </div>
                    </div>
                    <div className="job_content">
                      <div className="company">
                        <p>Company: {value.company}</p>
                      </div>
                      <div className="job_position">
                        <p>Position: {value.job_position}</p>
                      </div>
                      <div className="job_description">
                        <p>Description: {value.description}</p>
                      </div>
                      <div className="job_requirement">
                        <p>Requirement: {value.job_requirement}</p>
                      </div>
                      <div className="job_skill">
                        <p>Skill: {value.job_skill}</p>
                      </div>
                      <div className="quality">
                        <p>Hiring {value.job_salary} </p>
                      </div>
                      {value.job_status == "0" ? (
                        <>
                          {" "}
                          <div className="expired">
                            <p>The job has expired, please update or delete</p>
                          </div>
                        </>
                      ) : null}
                      <div className="cv">
                        <button
                          className="btn btn-primary"
                          // id={value.id}
                          onClick={() => WhatJobEdit(value)}
                        >
                          Update
                        </button>
                        <button
                          className="btn btn-danger"
                          // id={value.id}
                          onClick={() => WhatJobDelete(value)}
                        >
                          Delete
                        </button>
                        <button
                          className="btn btn-primary"
                          // id={value.id}
                          // onClick={() => setJobOrCv(true)}
                          onClick={() => WhatCv(value)}
                        >
                          {seekersApply[key].length}
                          &nbsp;Applying&nbsp;&nbsp;→
                        </button>
                      </div>
                    </div>
                  </div>
                  {/* </div> */}
                </>
              );
            }
          }
        }
      });
    }
  }
  const WhatCv = (e) => {
    setJobOrCv(true);
    console.log("cv", e);
    axios
      .get(`http://localhost:8085/api/get-job-byJob?id=${e.id}`)
      .then((res) => {
        // if (res1.data.data.length > 0) {
        setCv(res.data.data);
        console.log(res.data.data);
        // }
      });
  };
  function renderCv() {
    if (getCv.length > 0) {
      // getTime.map((value2, key2) => {
      return getCv.map((value, key) => {
        console.log(value);
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
                  <div className="cv_location d-flex">
                    <p>
                      <i className="fa-duotone fa-input-text" />
                      {value.seekerData.fullname}
                    </p>
                    {value.statusId == "S2" ? (
                      <>
                        {" "}
                        <div className="verify">
                          &nbsp;&nbsp;<i class="fa-solid fa-user-check"></i>
                        </div>
                      </>
                    ) : null}
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
                <div className="cv_time_apply">
                  <p>
                    <i class="fa-solid fa-briefcase"></i>
                    &nbsp;Time Apply:{" "}
                    {getTime.map((value2, key2) => {
                      if (value2.keyMap == value.timeType) {
                        return <>{value2.value}</>;
                      }
                    })}
                  </p>
                </div>
                <div className="info_verify">
                  {value.statusId == "S2" ? (
                    <div className="verified" onClick={() => Accept(value)}>
                      <p>Accept</p>
                    </div>
                  ) : value.statusId == "S3" ? (
                    <div className="accepted">
                      <p>Accepted</p>
                    </div>
                  ) : (
                    <>
                      <div className="not_verify">
                        <p>Information has not been verified!</p>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </>
        );
      });
      // });
    } else {
      return (
        <>
          <div className="job_has_cv d-inline-block text-center">
            <h1>No cv</h1>
          </div>
        </>
      );
    }
  }
  const WhatJobEdit = (e) => {
    console.log(e);
    setShowEdit(true);
    setJobEdit(e);
  };
  const EditJob = (e) => {
    // getShowEdit(true);
    console.log(e);
    return (
      <>
        <div className="Cv_seeker w-100">
          <div className="w-100 d-inline-block ">
            <button
              className="btn btn-primary"
              onClick={() => setShowEdit(false)}
            >
              &larr;&nbsp; Back Job
            </button>
          </div>
          <Employer_EditJob dataJob={JobEdit} />
        </div>
      </>
    );
  };
  function render() {
    if (jobOrcv) {
      return (
        <div className="Cv_seeker w-100">
          <div className="w-100 d-inline-block ">
            <button
              className="btn btn-primary"
              onClick={() => setJobOrCv(false)}
            >
              &larr;&nbsp; Back Job
            </button>
          </div>
          {renderCv()}
        </div>
      );
    } else if (showEdit) {
      return <>{EditJob()}</>;
    } else {
      return <>{renderJob()}</>;
    }
  }
  const Accept = (e) => {
    console.log(e);
    const data = {
      email: e.seekerData.email,
      job_id: e.job_id,
      seekerApply_id: e.seekerApplyData.id,
      timeType: e.timeType,
      statusId: e.statusId,
      seekerName: e.seekerData.fullname,
    };
    axios.post("http://localhost:8085/api/send-accept", data).then((res) => {
      console.log(res.data);
    });
  };
  const WhatJobDelete = (e) => {
    console.log(e.id);
    var dataUser = localStorage.getItem("user");
    dataUser = JSON.parse(dataUser);

    axios
      .delete(`http://localhost:8085/api/delete-job?id=${e.id}`)
      .then((res) => {
        console.log(res.data);
        if (res.data.errCode == 0) {
          axios
            .get(`http://localhost:8085/api/get-job?id=${dataUser.id}`)
            .then((res) => {
              console.log("render2", res.data.data);
              setJob(res.data.data);
            });
          alert("Delete Successfully");
        }
      });
  };
  return (
    <>
      <div className="page-employers">
        <div className="nav border-0">
          <div className="container_home_employer">
            <MenuLeft_Employer />
            <div className="info">
              <div className="employer_info w-100 d-inline-block">
                <div className="news_management d-flex flex-col w-100 items-center ">
                  <div className="news">
                    <div className="h-full d-flex align-items-center justify-content-center flex-column">
                      <span className="text-center">
                        Total posted information
                      </span>
                      <span className="">{getJob.length}</span>
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

                <div className="manager_job_posted w-100 ">
                  {/* {renderJob()} */}
                  {render()}
                  {/* {EditJob()} */}
                </div>
              </div>

              {/* <div className="account_infomation">{renderNav()}</div> */}
            </div>
          </div>
        </div>
        {/* <div className="container ">{renderNav()}</div> */}
      </div>
    </>
  );
}
export default Employer_ListJob;
