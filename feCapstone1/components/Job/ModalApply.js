import Logo from "../../asset/images/hiring.jpg";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Error from "../Authen/Error";
import Hearder from "../Header/Header";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import { json } from "react-router-dom";
import DatePicker from "react-datepicker";

function ModalApply({ closetModal, schedule, jobApply, props, jobHour }) {
  const [inputs, setInputs] = useState("");
  const [errors, setErrors] = useState("");
  const [getCvUser, setCvUser] = useState("");
  const [getIdApply, setIdApply] = useState("");
  const [getHourDuplicate, setHourDuplicate] = useState("");
  // console.log("data1", schedule);
  // console.log("data2", jobApply);
  // console.log("data3", jobHour.arrSchedule[0].timeType);
  useEffect(() => {
    // console.log("data3", props.jobHour);
    var dataUser = localStorage.getItem("user");
    dataUser = JSON.parse(dataUser);
    setInputs(dataUser);
    axios
      .get(`http://localhost:8085/api/get-cv-seekerByUser?id=${dataUser.id}`)
      .then((res) => {
        // console.log("cv", res.data.data);
        setCvUser(res.data.data);
      });
    axios
      .get(`http://localhost:8085/api/get-job-byJob?id=${jobApply.id}`)
      .then((res) => {
        console.log("duplice", res.data.data);
        setHourDuplicate(res.data.data);
      });
  }, []);
  const handleInput = (e) => {
    let nameInput = e.target.name;
    let value = e.target.value;
    setInputs((state) => ({ ...state, [nameInput]: value }));
  };
  // const IdApplyJob = (e) => {
  //   console.log(e.target.id);
  //   id = getIdApply;
  //   id.push(e.target.value);
  //   setIdApply(id);
  // };
  const handleSubmit = (e) => {
    e.preventDefault();
    let flag = true;
    let errorSubmit = {};
    if (inputs.email == "") {
      flag = false;
      errorSubmit.email = "Empty email";
    }
    if (inputs.email == undefined) {
      flag = false;
      errorSubmit.email = "Empty email";
    }
    if (inputs.fullname == "") {
      flag = false;
      errorSubmit.fullname = "Empty Fullname";
    }
    if (inputs.fullname == undefined) {
      flag = false;
      errorSubmit.fullname = "Empty Fullname";
    }
    if (inputs.address == "") {
      flag = false;
      errorSubmit.address = "Empty Address";
    }
    if (inputs.address == undefined) {
      flag = false;
      errorSubmit.address = "Empty Address";
    }
    if (inputs.numberphone == "") {
      flag = false;
      errorSubmit.numberphone = "Empty Number Phone";
    }
    if (inputs.numberphone == undefined) {
      flag = false;
      errorSubmit.numberphone = "Empty Number Phone";
    }
    if (inputs.cv == "") {
      flag = false;
      errorSubmit.cv = "Empty Cv";
    }
    if (inputs.cv == undefined) {
      flag = false;
      errorSubmit.cv = "Empty Cv";
    }
    if (!flag) {
      setErrors(errorSubmit);
    } else {
      setErrors({});
      if (schedule.length > 0) {
        // console.log("sc", schedule);
        let data = {};
        let result = [];
        // schedule.map((value, key) => {
        // jobHour.arrSchedule.map((value1, key1) => {
        // if (value.jobTitle == jobApply.title) {
        // let data = {};
        // data.email = inputs.email;
        // data.job_id = jobApply.id;
        // data.timeType = "T3";
        // data.date = value.date;
        // data.seekerName = inputs.fullname;
        // data.companyName = jobApply.company;
        // data.seekerApply_id = inputs.cv;
        // result.push(data);

        // const data2 = {
        //   arrApply: result,
        // };
        // console.log("data22", data2);
        //--------------//
        let flag = true;
        if (getHourDuplicate.length > 0) {
          getHourDuplicate.map((value, key) => {
            if (
              jobHour.arrSchedule[0].timeType == value.timeType &&
              value.seeker_id == inputs.id
            ) {
              flag = false;
            }
          });
        }
        if (!flag) {
          alert(
            "Your working hours have been duplicated, please choose another working hour"
          );
        } else {
          data = {
            email: inputs.email,
            job_id: jobApply.id,
            timeType: jobHour.arrSchedule[0].timeType,
            date: jobApply.job_expiration_date,
            seekerName: inputs.fullname,
            companyName: jobApply.company,
            seekerApply_id: inputs.cv,
          };
          axios
            .post("http://localhost:8085/api/postApplication", data)
            .then((res) => {
              console.log(res);
              if (res.data.errCode == 0) {
                alert("Job application successful, please check your email");
              }
            });
        }

        // }
        // });
        // });
      }
    }
  };
  // console.log("input cv", inputs.cv);

  function renderCv() {
    if (getCvUser.length > 0) {
      return getCvUser.map((value, key) => {
        return (
          <>
            <option value={value.id}>{value.cv_name}</option>
          </>
        );
      });
    } else {
      return null;
    }
  }
  return (
    <>
      <div className="modalBackground">
        <div className="modalContainer">
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col p-3">
                <label className="p-0" htmlFor>
                  Email
                </label>
                <input
                  onChange={handleInput}
                  type="text"
                  className="form-control"
                  id="email"
                  placeholder="Enter email"
                  name="email"
                  value={inputs.email}
                />
                <p style={{ color: "red", marginTop: "20px" }}>
                  {errors.email}
                </p>
              </div>

              <div className="col p-3">
                <label className="p-0" htmlFor>
                  Number Phone
                </label>
                <input
                  onChange={handleInput}
                  type="number"
                  className="form-control"
                  placeholder="Enter password"
                  name="numberphone"
                  value={inputs.numberphone}
                />
                <p style={{ color: "red", marginTop: "20px" }}>
                  {errors.numberphone}
                </p>
              </div>
            </div>
            <div className="row mb-4">
              <div className="col ">
                <label className="p-0" htmlFor>
                  Full Name
                </label>
                <input
                  onChange={handleInput}
                  type="text"
                  className="form-control"
                  id="email"
                  placeholder="Enter email"
                  name="fullname"
                  value={inputs.fullname}
                />
                <p style={{ color: "red", marginTop: "20px" }}>
                  {errors.fullname}
                </p>
              </div>
              <div className="col">
                <label className="p-0" htmlFor>
                  Address
                </label>
                <input
                  onChange={handleInput}
                  type="text"
                  className="form-control"
                  placeholder="Enter your address"
                  name="address"
                  value={inputs.address}
                />
                <p style={{ color: "red", marginTop: "20px" }}>
                  {errors.address}
                </p>
              </div>
            </div>

            <select
              onChange={handleInput}
              className="custom-select mb-3 "
              name="cv"
              value={inputs.cv}
            >
              {getCvUser.length > 0 ? (
                <option value="">Choose your Cv</option>
              ) : (
                <option value="">
                  You do not have cv, click on the link to create cv now
                </option>
              )}

              {renderCv()}
            </select>
            {getCvUser.length > 0 ? null : (
              <p>
                <Link to="/createcv">Create cv now</Link>
              </p>
            )}

            <div className="d-flex flex-row-reverse">
              <button
                className="btn btn-danger mt-3 ml-3"
                onClick={() => closetModal(false)}
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-primary mt-3">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
export default ModalApply;
