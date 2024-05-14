import Logo from "../../asset/images/hiring.jpg";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Error from "../Authen/Error";
import Hearder from "../Header/Header";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import { json } from "react-router-dom";
import DatePicker from "react-datepicker";
import React from "react";
import dayjs, { Dayjs } from "dayjs";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import Badge from "@mui/material/Badge";
import { PickersDay } from "@mui/x-date-pickers";
function Seeker_calendar() {
  const [value, setValue] = React.useState(new Date());
  const [getS3, setS3] = useState("");
  const [inputs, setInputs] = useState("");
  const [getTime, setTime] = useState("");
  const [getJob, setJob] = useState("");
  // console.log("date", value.toJSON().slice(0, 10));
  useEffect(() => {
    var dataUser = localStorage.getItem("user");
    dataUser = JSON.parse(dataUser);
    setInputs(dataUser);
    axios
      .get("http://localhost:8085/api/get-status-apply?statusId=s3")
      .then((res) => {
        console.log("s3", res.data.data);
        setS3(res.data.data);
        let s3 = res.data.data;
        s3.map((value, key) => {
          axios
            .get(`http://localhost:8085/api/get-job-byIdJob?id=${value.job_id}`)
            .then((res) => {
              console.log("job", res.data.data);
              setJob(res.data.data);
            });
        });
      });
    axios
      // .get("http://localhost:8085/api/allcodetype", location_id)
      .get("http://localhost:8085/api/allcodetype?type=TIME")
      .then((res) => {
        console.log("time", res.data.data);
        setTime(res.data.data);
      });
  }, []);
  function work() {
    if (Object.keys(getJob).length > 0) {
      const date = value.toJSON().slice(0, 10);
      const startdate = getJob.job_start_date.slice(0, 10);
      const enddate = getJob.job_finish_date.slice(0, 10);
      console.log(date >= startdate && date <= enddate);

      // Object.keys(getJob).map((value, key) => {
      if (date >= startdate && date <= enddate) {
        return (
          <div className="work_content">
            <div className="work_company">
              <p>
                <i class="fa-solid fa-building"></i>&emsp;{getJob.company}
              </p>
            </div>
            <div className="work_address">
              <p>
                <i class="fa-solid fa-map-location"></i>&emsp;
                {getJob.locationData.value}
              </p>
            </div>
            <div className="work_phone">
              <p>
                <i class="fa-solid fa-phone"></i>&emsp;
                {getJob.jobtypeData.value}
              </p>
            </div>
            {workHour()}
          </div>
        );
      } else {
        return (
          <div className="work_content">
            <p>NO</p>
          </div>
        );
      }

      // });
    }
  }
  function workHour() {
    return getS3.map((value, key) => {
      return (
        <>
          <div className="work_schedule">
            <p>
              <i class="fa-solid fa-clock"></i>&emsp;
              {getTime.map((value2, key2) => {
                if (value2.keyMap == value.timeType) {
                  return <>{value2.value}</>;
                }
              })}
            </p>
          </div>
        </>
      );
    });
  }
  return (
    <>
      <div className="container">
        <div className="schedule w-100">
          <div className="calendar">
            {/* <div className="calender_header_text w-100">
              <h1>Calendar</h1>
            </div> */}
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <StaticDatePicker
                orientation="portrait"
                openTo="day"
                value={value}
                onChange={(newValue) => {
                  setValue(newValue);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </div>
          <div className="work">
            <div className="work_header_text w-100">
              <p>Work</p>
            </div>
            {/* <div className="work_content">
              <div className="work_company">
                <p>
                  <i class="fa-solid fa-building"></i>&emsp;Company
                </p>
              </div>
              <div className="work_address">
                <p>
                  <i class="fa-solid fa-map-location"></i>&emsp;Address
                </p>
              </div>
              <div className="work_phone">
                <p>
                  <i class="fa-solid fa-phone"></i>&emsp;Phone
                </p>
              </div>
              <div className="work_schedule">
                <p>
                  <i class="fa-solid fa-clock"></i>&emsp;Time
                </p>
              </div>
            </div> */}
            {work()}
          </div>
        </div>
      </div>
    </>
  );
}
export default Seeker_calendar;
