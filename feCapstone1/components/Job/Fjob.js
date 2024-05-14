import { inputClasses } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import ModalApply from "./ModalApply";
function Fjob({ closetModal }, props) {
  const [inputs, setInputs] = useState("");
  const [getJob, setJob] = useState("");
  const [getJobApply, setJobApply] = useState("");
  const [getSchedule, setSchedule] = useState("");
  const [show, setShow] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [isSelected, setIsSelected] = useState(false);
  const [getShowSchedule, setShowSchdule] = useState(false);
  const [getHour, setHour] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8085/api/get-all-job").then((res) => {
      setJob(res.data.data);
    });
    var dataUser = localStorage.getItem("user");
    dataUser = JSON.parse(dataUser);
    setInputs(dataUser);
  }, []);
  // useEffect(() => {
  //   var dataUser = localStorage.getItem("user");
  //   dataUser = JSON.parse(dataUser);
  //   setInputs(dataUser);
  // }, []);
  function setStickied() {
    let timViec = document.getElementById("table-jobright");
    let navPos = timViec.getBoundingClientRect().top;
    navPos = 190;
    window.addEventListener("scroll", (e) => {
      let scrollPos = window.scrollY;
      if (scrollPos > navPos) {
        timViec.classList.add("sticky");
      } else {
        timViec.classList.remove("sticky");
      }
    });
  }
  window.addEventListener("scroll", setStickied);
  function Content_Job() {
    const day = new Date();
    const today = day.toJSON().slice(0, 10);
    if (getJob.length > 0) {
      return getJob.map((value, key) => {
        var date = value.job_expiration_date;
        // if (value.employer_id == inputs.id) {
        return (
          <>
            <div className="table-contentjob ">
              <div className="infoCompany">
                <h3>{value.title}</h3>
                <p>{value.company}</p>
                <p>{value.locationData.value}</p>
                <div className="salaryJob">
                  <i className="fa-solid fa-money-bill-1" />
                  <p>{value.job_salary},000,000 VNĐ a mounth</p>
                </div>
              </div>
              <div className="infoGist">
                <div>
                  <i
                    style={{ color: "#237ea3" }}
                    className="fa-solid fa-paper-plane"
                  />
                  <p>{value.jobtypeData.value}</p>
                </div>
                <div>
                  <i
                    style={{ color: "#237ea3" }}
                    className="fa-solid fa-bomb"
                  />
                  <div>{date.slice(0, 10)}</div>
                </div>
                <div>
                  <p className="shortDescrip">
                    {" "}
                    Lưu trữ,lọc CV và sắp xếp lịch phỏng vấn.
                  </p>
                </div>
                {date.slice(0, 10) < today ? (
                  <>
                    {" "}
                    <div className="experiedJob_cvApply">
                      <p> Expired</p>
                    </div>
                  </>
                ) : null}
                <button
                  className="btn btn-primary "
                  id={value.id}
                  onClick={HandleClick_ContentJob}
                >
                  More
                </button>
              </div>
            </div>
          </>
        );
        // }
      });
    }
  }
  const HandleClick_ContentJob = (e) => {
    setShow(false);
    console.log(e.target.id);
    axios
      .get(`http://localhost:8085/api/get-job-byIdJob?id=${e.target.id}`)
      .then((res) => {
        console.log("Job", res.data.data);
        setJobApply(res.data.data);
      });
  };

  const handleGetSchedule = (e) => {
    setShowSchdule(!getShowSchedule);
    let scheduleId = e.target.id;
    console.log(e.target.id);
    axios
      .get(`http://localhost:8085/api/get-schedule-id?id=${scheduleId}`)
      .then((res) => {
        console.log("schedule", res.data.data);
        setSchedule(res.data.data);
      });
  };

  // const Pick_hour = () => {
  //   if (getTime.length > 0) {
  //     return getTime.map((value, index) => {
  //       return (
  //         <button
  //           key={index}
  //           name="time"
  //           class={
  //             value.isSelected == true
  //               ? "btn btn-schedule active_button"
  //               : "btn btn-schedule"
  //           }
  //           type="button"
  //           onClick={() => HandleClick_PickHour(value)}
  //           // value={value.keyMap}
  //           // id={value}
  //         >
  //           {value.value}
  //         </button>
  //       );
  //     });
  //   }
  // };
  const HandleClick_PickHour = (e) => {
    if (getSchedule && getSchedule.length > 0) {
      let data = getSchedule;
      data = data.map((value) => {
        // if (value.id === e.id) value.isSelected = !value.isSelected; //chuẩn

        //Thử 1
        if (value.id === e.id) {
          value.isSelected = true;
        } else {
          value.isSelected = false;
        }

        //   if (value.isSelected == true) {
        //     var valueHour = getHour;
        //     valueHour.push(value.timeType);
        //     setHour(valueHour);
        //     // if (getHour.length > 1) {
        //     //   getHour.splice(0, 1);
        //     // }
        //     // setHour(valueHour);
        //   } else {
        //     setHour(valueHour);
        //   }
        // let valueHour = getSchedule.filter((item) => item.isSelected == true);
        // console.log("true", valueHour);
        // valueHour.map((value1, key1) => {
        //   let hour = [value1.timeType];
        //   hour.push(value1.timeType);
        //   console.log("tt", hour);
        //   setHour(hour);
        // });
        // console.log("get", getHour);

        return value;
      });
      setSchedule(data);
      let result = [];
      let selectTime = getSchedule.filter((item) => item.isSelected === true);
      if (selectTime && selectTime.length > 0) {
        selectTime.map((schedule, index) => {
          let obj = {};
          obj.jobTitle = getJobApply.titleJob;
          obj.employer_id = getJobApply.employer_id;
          obj.timeType = schedule.timeType;
          obj.date = getJobApply.job_expiration_date;
          result.push(obj);
        });
      }
      const data2 = {
        arrSchedule: result,
      };
      console.log("data2", data2);
      setHour(data2);
    }
  };

  const showSchedule = (e) => {
    console.log("sc1", getSchedule);
    if (getSchedule.length > 0) {
      return getSchedule.map((value, key) => {
        // return getJobApply.map((value2, key2) => {
        if (getShowSchedule) {
          // if (value.jobTitle == getJobApply.title) {
          // dataModal.timeType = value.timeType;
          // dataModal.job_id = getJobApply.id;
          // console.log(dataModal);
          return (
            <>
              <button
                style={{ margin: "10px 10px 10px 0px" }}
                name="time"
                type="button"
                className={
                  value.isSelected == true
                    ? "btn btn-schedule active_button"
                    : "btn btn-schedule"
                }
                onClick={() => HandleClick_PickHour(value)}
              >
                {value.timeTypeData.value}
              </button>
            </>
          );
          // }
        } else {
          return null;
        }
        // });
      });
    }
  };

  function Content_Job_Apply() {
    if (
      Object.keys(getJobApply) == "" ||
      Object.keys(getJobApply) == undefined ||
      Object.keys(getJobApply) == null
    ) {
      // var obj = {};
      // obj = getJob;
      return <></>;
    } else if (Object.keys(getJobApply).length > 0) {
      var date = getJobApply.job_expiration_date;
      const day = new Date();
      const today = day.toJSON().slice(0, 10);
      return (
        <>
          <div id="table-jobright">
            <div className="titleJob">
              <h3>{getJobApply.title}</h3>{" "}
              {date.slice(0, 10) < today ? (
                <>
                  {" "}
                  <div className="experiedJob_cvApply">
                    <p> Expired</p>
                  </div>
                </>
              ) : null}
              <p>{getJobApply.company}</p>
              <p>{getJobApply.locationData.value}</p>
              <p>{getJobApply.job_salary},000,000 VNĐ a mounth</p>
              {date.slice(0, 10) < today ? (
                <>
                  <button
                    className="button-apply none_apply"
                    // onClick={() => setOpenModal(true)}
                  >
                    Apply
                  </button>
                </>
              ) : (
                <>
                  {" "}
                  <button
                    className="button-apply"
                    onClick={() => setOpenModal(true)}
                  >
                    Apply
                  </button>
                  {openModal && (
                    <ModalApply
                      schedule={getSchedule}
                      jobApply={getJobApply}
                      jobHour={getHour}
                      closetModal={setOpenModal}
                    />
                  )}
                </>
              )}
            </div>
            <div className="jobDetail">
              <div className="jobDescript">
                <p>{getJobApply.jobtypeData.value}</p>

                {getJobApply.jobtypeData.value == "TEMPORARY" ? (
                  <>
                    <button
                      className="button-schedule"
                      id={getJobApply["employer_id"]}
                      onClick={handleGetSchedule}
                    >
                      Xem lịch làm
                    </button>
                  </>
                ) : null}
                <div>{showSchedule()}</div>
                <p>{getJobApply.description}</p>

                <p>Salary from {getJobApply.job_salary},000,000 a month</p>
                <p>Job application deadline: {date.slice(0, 10)}</p>
              </div>
              <div className="jobDes-one">
                <h3>Hiring Insights</h3>
                <div>
                  <i className="fa-solid fa-reply" />
                  <p>Response rate of this job</p>
                </div>
                <div>
                  <i className="fa-solid fa-user-plus" />
                  <p>Hiring {getJobApply.quality} members for this position</p>
                </div>
              </div>
            </div>
          </div>
        </>
      );
    }
  }
  return (
    <div className="page-job">
      {/* <div
        className="container-fluid"
        style={{
          background: "white",
          marginBottom: 20,
          paddingTop: 50,
          //   marginBottom: 0,
          borderBottom: "1px solid rgb(212, 212, 212)",
        }}
      > */}
      <div className="form-search_job">
        <input
          type="text"
          id="myInputSearchJob"
          onkeyup="myFunction()"
          placeholder="Search the jobs"
          title="Type in a name"
        />
        <input
          type="text"
          id="myInputLocation"
          onkeyup="myFunction()"
          placeholder="Location"
          title="Type in a name"
        />
        <button type="submit" placeholder="Search" id="btnSearchJob">
          Search
        </button>
      </div>

      <div className="container ">
        <div className="tjob">
          <div className="table-jobleft">{Content_Job()}</div>
          {Content_Job_Apply()}
        </div>
      </div>
    </div>
    // </div>
  );
}

export default Fjob;
