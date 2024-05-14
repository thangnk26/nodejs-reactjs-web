import Logo from "../../asset/images/hiring.jpg";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Error from "../Authen/Error";
import Hearder from "../Header/Header";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import { json } from "react-router-dom";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import MenuLeft_Employer from "./MenuLeft_Employer";
function Employer_Postjob() {
  const [inputs, setInputs] = useState("");
  const [errors, setErrors] = useState("");
  const [next, setNext] = useState(false);
  const [getTime, setTime] = useState("");
  const [getLocation, setLocation] = useState("");
  const [getHour, setHour] = useState([]);
  const [getDateStart, setDateStart] = useState(new Date());
  const [getDateFinish, setDateFinish] = useState(new Date());
  const handleToggleClick = () => {
    setNext(next ? false : true);
  };
  useEffect(() => {
    var dataUser = localStorage.getItem("user");
    dataUser = JSON.parse(dataUser);
    console.log(dataUser);
    setInputs(dataUser);
  }, []);
  const handleInput = (e) => {
    let nameInput = e.target.name;
    let value = e.target.value;
    setInputs((state) => ({ ...state, [nameInput]: value }));
  };
  useEffect(() => {
    const location_id = {
      type: "PROVINCE",
    };
    axios
      // .get("http://localhost:8085/api/allcodetype", location_id)
      .get("http://localhost:8085/api/allcodetype?type=PROVINCE")
      .then((res) => {
        setLocation(res.data.data);
      });
  }, []);
  useEffect(() => {
    axios
      // .get("http://localhost:8085/api/allcodetype", location_id)
      .get("http://localhost:8085/api/allcodetype?type=TIME")
      .then((res) => {
        let data = res.data.data;
        data = data.map((item) => ({ ...item, isSelected: false }));
        setTime(data);
      });
  }, []);
  const ShowLocation = () => {
    if (getLocation.length > 0) {
      return getLocation.map((value, key) => {
        return (
          <>
            <option className="w-100" value={value.keyMap}>
              {value.value}
            </option>
          </>
        );
      });
    }
  };
  const HandleClick_PickHour = (e) => {
    console.log(e);
    var valueHour = getHour;
    valueHour.push(e.keyMap);
    setHour(valueHour);
    if (getHour.length > 1) {
      getHour.splice(0, 1);
    }

    if (getTime && getTime.length > 0) {
      let data = getTime;
      data = data.map((value) => {
        if (value.id === e.id) value.isSelected = !value.isSelected;
        return value;
      });
      setTime(data);
    }
  };

  const Pick_hour = () => {
    if (getTime.length > 0) {
      return getTime.map((value, index) => {
        return (
          <button
            key={index}
            name="time"
            class={
              value.isSelected == true
                ? "btn btn-schedule active_button"
                : "btn btn-schedule"
            }
            type="button"
            onClick={() => HandleClick_PickHour(value)}
            // value={value.keyMap}
            // id={value}
          >
            {value.value}
          </button>
        );
      });
    }
  };
  const profile = () => {
    return (
      <div className="row infoEmployer w-75 d-inline-block">
        <div className="title-employer">
          <img src={Logo} alt="" />
        </div>
        <form
          action="#"
          method="post"
          onSubmit={handleSubmit}
          className="form-CV"
        >
          <div className="form-group">
            <label className="inputForm d-block p-0" htmlFor="inputAddress">
              Full Name
            </label>
            <input
              onChange={handleInput}
              type="text"
              className="form-control"
              name="fullName"
              placeholder="Name...."
              value={inputs.fullname}
            />
            <p className="uemail" />
            <p style={{ color: "red" }}>{errors.fullname}</p>
          </div>
          <div className="form-group">
            <label className="inputForm d-block p-0" htmlFor="inputAddress">
              Address
            </label>
            <input
              onChange={handleInput}
              type="text"
              className="form-control"
              name="address"
              placeholder="Address"
              value={inputs.address}
            />
            <p className="uemail" />
            <p style={{ color: "red" }}>{errors.address}</p>
          </div>
          <div className="form-group">
            <label className="inputForm d-block p-0" htmlFor="inputAddress">
              Phone Number
            </label>
            <input
              onChange={handleInput}
              type="text"
              className="form-control"
              name="phoneNumber"
              placeholder="Phone"
              value={inputs.phoneNumber}
            />
            <p className="uemail" />
            <p style={{ color: "red" }}>{errors.phoneNumber}</p>
          </div>
          <div className="form-group">
            <label className="inputForm d-block p-0" htmlFor="inputCompany">
              Company Name
            </label>
            <input
              onChange={handleInput}
              type="text"
              className="form-control"
              name="company"
              placeholder="Company name..."
              value={inputs.company}
            />
            <p className="uemail" />
            <p style={{ color: "red" }}>{errors.company}</p>
          </div>
          <div className="form-row"></div>
          <div className="form-group ">
            <label className="inputForm d-block p-0" htmlFor="inputEmail4">
              Company industry{" "}
            </label>
            <input
              onChange={handleInput}
              type="email"
              className="form-control"
              placeholder="Industry"
              name="industry"
              value={inputs.industry}
            />
            <p className="uemail" />
            <p style={{ color: "red" }}>{errors.industry}</p>
          </div>
          <div className="form-group">
            <label className="inputForm d-block p-0" htmlFor="inputCity">
              Company Location
            </label>
            <select
              value={inputs.location_id}
              name="location_id"
              onChange={handleInput}
            >
              <option className="w-100" value="">
                Choose Location
              </option>
              {ShowLocation()}
            </select>
            <p className="uemail" />
            <p style={{ color: "red" }}>{errors.location_id}</p>
          </div>

          <button
            type="button"
            className="btn btn-primary employeer"
            onClick={handleToggleClick}
          >
            Next
          </button>
        </form>
      </div>
    );
  };
  const file = () => {
    return (
      <div className="row infoEmployer-two d-inline-block">
        {/* <div>Post a job</div> */}
        <form
          action="#"
          onSubmit={handleSubmit}
          method="post"
          className="form-CV"
        >
          <div className="form-row">
            <div className="form-group col-md-6">
              <label className="inputForm d-block p-0" htmlFor="inputEmail4">
                Job title
              </label>
              <input
                onChange={handleInput}
                type="text"
                className="form-control"
                id="inputEmail4"
                name="titleJob"
                value={inputs.titleJob}
              />
              <p className="uemail" />
              <p style={{ color: "red" }}>{errors.titleJob}</p>
            </div>
            <div className="form-group col-md-6">
              <label className="inputForm d-block p-0" htmlFor="inputCity">
                Job type
              </label>
              <select
                onChange={handleInput}
                name="jobtype"
                value={inputs.jobtype}
                className="form-control"
              >
                <option value="">Please choose working style</option>
                <option value="TY2">Full-time</option>
                <option value="TY1">Part-time</option>
                <option value="TY3">Temporary</option>
              </select>
              <p className="uemail" />
              <p style={{ color: "red" }}>{errors.jobtype}</p>
            </div>
          </div>
          {inputs.jobtype == "TY3" ? (
            <>
              {" "}
              <div className="form-group pick-hour-container ">
                <label className="inputForm d-block p-0" htmlFor="inputEmail4">
                  Job Shift
                </label>
                {/* <input
              onChange={handleInput}
              type="text"
              className="form-control"
              placeholder
              name="job_shift"
              value={inputs.job_shift}
            /> */}
                <div className="pick-hour-container">{Pick_hour()}</div>
              </div>
              <div className="calendar form-row w-100">
                <div className="form-group col-md-6">
                  <label
                    className="inputForm d-block p-0"
                    htmlFor="inputEmail4"
                  >
                    Start Date
                  </label>
                  <input
                    onChange={handleInput}
                    type="date"
                    className="form-control"
                    name="job_start_date"
                    value={inputs.job_start_date}
                  />
                  <p className="uemail" />
                  <p style={{ color: "red" }}>{errors.job_start_date}</p>
                </div>

                <div className="form-group col-md-6">
                  <label className="inputForm d-block p-0" htmlFor="inputCity">
                    End Date
                  </label>
                  <input
                    onChange={handleInput}
                    type="date"
                    className="form-control"
                    name="job_finish_date"
                    value={inputs.job_finish_date}
                  />
                  <p className="uemail" />
                  <p style={{ color: "red" }}>{errors.job_finish_date}</p>
                </div>
              </div>
            </>
          ) : null}

          <div className="form-group">
            <label className="inputForm d-block p-0" htmlFor="inputAddress">
              What position(s) are you hiring?{" "}
            </label>
            <input
              onChange={handleInput}
              type="text"
              className="form-control"
              name="position"
              placeholder="Position ..."
              value={inputs.position}
            />
            <p className="uemail" />
            <p style={{ color: "red" }}>{errors.position}</p>
          </div>
          <div className="form-group">
            <label className="inputForm d-block p-0" htmlFor="inputAddress">
              What level(s) are you hiring?{" "}
            </label>
            <input
              onChange={handleInput}
              type="text"
              className="form-control"
              name="levels"
              placeholder="Level..."
              value={inputs.levels}
            />
            <p className="uemail" />
            <p style={{ color: "red" }}>{errors.levels}</p>
          </div>
          <div className="form-group">
            <label className="inputForm d-block p-0" htmlFor="inputAddress">
              Job Category{" "}
            </label>
            <input
              onChange={handleInput}
              type="text"
              className="form-control"
              name="jobCategory"
              // placeholder="Location..."
              value={inputs.jobCategory}
            />
            <p className="uemail" />
            <p style={{ color: "red" }}>{errors.jobCategory}</p>
          </div>
          <div className="form-group">
            <label className="inputForm d-block p-0" htmlFor="inputAddress">
              Description
            </label>
            <textarea
              onChange={handleInput}
              className="form-control"
              name="description"
              placeholder
              rows={4}
              value={inputs.description}
            />
            <p className="uemail" />
            <p style={{ color: "red" }}>{errors.description}</p>
          </div>
          <div className="form-group">
            <label className="inputForm d-block p-0" htmlFor="inputAddress">
              Requirement
            </label>
            <textarea
              onChange={handleInput}
              className="form-control"
              name="requirement"
              placeholder
              rows={4}
              value={inputs.requirement}
            />
            <p className="uemail" />
            <p style={{ color: "red" }}>{errors.requirement}</p>
          </div>
          <div>
            <label className="inputForm d-block p-0" htmlFor="inputAddress">
              Salary Range
            </label>
            <div className="form-row">
              <div className="form-group col-md-6">
                <input
                  onChange={handleInput}
                  type="number"
                  className="form-control"
                  placeholder="Minimum"
                  name="minSalary"
                  value={inputs.minSalary}
                />
                <p className="uemail" />
                <p style={{ color: "red" }}>{errors.minSalary}</p>
              </div>
              <div className="form-group col-md-6">
                <input
                  onChange={handleInput}
                  type="number"
                  className="form-control"
                  placeholder="Maximum"
                  name="maxSalary"
                  value={inputs.maxSalary}
                />
                <p className="uemail" />
                <p style={{ color: "red" }}>{errors.maxSalary}</p>
              </div>
            </div>
          </div>
          <div className="form-group">
            <label className="inputForm d-block p-0" htmlFor="inputAddress">
              Skill Tags
            </label>
            <input
              onChange={handleInput}
              type="text"
              className="form-control"
              name="skill"
              placeholder="Skill..."
              value={inputs.skill}
            />
            <p className="uemail" />
            <p style={{ color: "red" }}>{errors.skill}</p>
          </div>
          <div className="form-group">
            <label className="inputForm d-block p-0" htmlFor="inputEmail4">
              Quality
            </label>
            <input
              onChange={handleInput}
              type="text"
              className="form-control"
              placeholder
              name="quality"
              value={inputs.quality}
            />
            <p className="uemail" />
            <p style={{ color: "red" }}>{errors.quality}</p>
          </div>
          <div className="form-group">
            <label className="inputForm d-block p-0" htmlFor="inputCity">
              Expiration Date
            </label>
            <input
              onChange={handleInput}
              type="date"
              className="form-control"
              name="job_expiration_date"
              value={inputs.job_expiration_date}
              // minDate={d.getDate()}
            />
            <p className="uemail" />
            <p style={{ color: "red" }}>{errors.job_expiration_date}</p>
            {/* <DatePicker onChange={HandleOnchageDatePicker} /> */}
          </div>

          {/* <div className="form-row">
            <div className="form-group col-md-6">
              <label className="inputForm d-block p-0" htmlFor="inputEmail4">
                Contact Person
              </label>
              <input onChange={handleInput}
                type="text"
                className="form-control"
                placeholder
                name="contact"
              />
            </div>
            <div className="form-group col-md-6">
              <label className="inputForm d-block p-0" htmlFor="inputCity">
                Email For Applications
              </label>
              <input onChange={handleInput} type="text" className="form-control" name="application" />
            </div>
          </div> */}
          {/* <Error errors={errors} /> */}
          <button
            type="button"
            className="btn btn-primary-prior"
            onClick={handleToggleClick}
          >
            Prior
          </button>
          <button type="submit" className="btn btn-primary btn-infoEmployer ">
            Submit
          </button>
        </form>
      </div>
    );
  };
  const renderNav = () => {
    let code;
    next ? (code = file()) : (code = profile());
    return <>{code}</>;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    let flag = true;
    let errorSubmit = {};
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
    if (inputs.phoneNumber == "") {
      flag = false;
      errorSubmit.phoneNumber = "Empty Phone Number";
    }
    if (inputs.phoneNumber == undefined) {
      flag = false;
      errorSubmit.phoneNumber = "Empty Phone Number";
    }
    if (inputs.company == "") {
      errorSubmit.company = "Empty Company";
      flag = false;
    }
    if (inputs.company == undefined) {
      flag = false;
      errorSubmit.company = "Empty Company";
    }
    if (inputs.industry == "") {
      errorSubmit.industry = "Empty Industry";
      flag = false;
    }
    if (inputs.industry == undefined) {
      flag = false;
      errorSubmit.industry = "Empty Industry";
    }
    if (inputs.location_id == "") {
      errorSubmit.location_id = "Empty Location Company";
      flag = false;
    }
    if (inputs.location_id == undefined) {
      flag = false;
      errorSubmit.location_id = "Empty Location Company";
    }
    if (inputs.titleJob == "") {
      flag = false;
      errorSubmit.titleJob = "Empty Job title";
    }
    if (inputs.titleJob == undefined) {
      flag = false;
      errorSubmit.titleJob = "Empty Job title";
    }
    if (inputs.jobtype == "") {
      flag = false;
      errorSubmit.jobtype = "Empty Job type";
    }
    if (inputs.jobtype == undefined) {
      flag = false;
      errorSubmit.jobtype = "Empty Job type";
    }
    if (inputs.jobtype == "TY3") {
      if (inputs.job_start_date == "") {
        flag = false;
        errorSubmit.job_start_date = "Empty Start Date";
      }
      if (inputs.job_start_date == undefined) {
        flag = false;
        errorSubmit.job_start_date = "Empty  Start Date ";
      }
      if (inputs.job_finish_date == "") {
        flag = false;
        errorSubmit.job_finish_date = "Empty End Date";
      }
      if (inputs.job_finish_date == undefined) {
        flag = false;
        errorSubmit.job_finish_date = "Empty  End Date ";
      }
    }

    if (inputs.position == "") {
      flag = false;
      errorSubmit.position = "Empty position";
    }
    if (inputs.position == undefined) {
      flag = false;
      errorSubmit.position = "Empty position";
    }
    if (inputs.jobCategory == "") {
      flag = false;
      errorSubmit.jobCategory = "Empty jobCategory";
    }
    if (inputs.jobCategory == undefined) {
      flag = false;
      errorSubmit.jobCategory = "Empty jobCategory";
    }
    if (inputs.description == "") {
      flag = false;
      errorSubmit.description = "Empty description";
    }
    if (inputs.description == undefined) {
      flag = false;
      errorSubmit.description = "Empty description";
    }
    if (inputs.requirement == "") {
      flag = false;
      errorSubmit.requirement = "Empty requirement";
    }
    if (inputs.requirement == undefined) {
      flag = false;
      errorSubmit.requirement = "Empty requirement";
    }
    if (inputs.minSalary == "") {
      flag = false;
      errorSubmit.minSalary = "Empty minSalary";
    }
    if (inputs.minSalary == undefined) {
      flag = false;
      errorSubmit.minSalary = "Empty minSalary";
    }
    if (inputs.maxSalary == "") {
      flag = false;
      errorSubmit.maxSalary = "Empty maxSalary";
    }
    if (inputs.maxSalary == undefined) {
      flag = false;
      errorSubmit.maxSalary = "Empty maxSalary";
    }
    if (inputs.skill == "") {
      flag = false;
      errorSubmit.skill = "Empty skill";
    }
    if (inputs.skill == undefined) {
      flag = false;
      errorSubmit.skill = "Empty skill";
    }

    if (inputs.job_expiration_date == "") {
      flag = false;
      errorSubmit.job_expiration_date = "Empty job_expiration_date";
    }
    if (inputs.job_expiration_date == undefined) {
      flag = false;
      errorSubmit.job_expiration_date = "Empty job_expiration_date";
    }
    if (inputs.quality == "") {
      flag = false;
      errorSubmit.quality = "Empty quality";
    }
    if (inputs.quality == undefined) {
      flag = false;
      errorSubmit.quality = "Empty quality";
    }
    if (!flag) {
      setErrors(errorSubmit);
      console.log(inputs.time);
      console.log(getHour);
    } else {
      setErrors({});
      console.log(errors);

      // console.log(roleId);
      let StringDate = "" + inputs.location_id;
      const data = {
        company: inputs.company,
        title: inputs.titleJob,
        description: inputs.description,
        jobCategory_id: inputs.jobCategory,
        location_id: inputs.location_id,
        employer_id: inputs.id,
        job_type: inputs.jobtype,
        job_salary: inputs.maxSalary,
        job_skill: inputs.skill,
        job_requirement: inputs.requirement,
        job_position: inputs.position,
        job_start_date: "" + inputs.job_start_date,
        job_finish_date: "" + inputs.job_finish_date,
        job_expiration_date: "" + inputs.job_expiration_date,
        // job_shift: "" + getHour,
        job_shift:
          inputs.jobtype == "TY2" || inputs.jobtype == "TY1"
            ? null
            : "" + getHour,

        quality: inputs.quality,
        job_status: 1,
      };

      let url = "http://localhost:8085/api/post-job";
      axios
        .post(url, data)
        .then((res) => {
          console.log(res);
          if (res.data.errCode == 0) {
            alert("Job posting successful");
          }
        })
        .catch((error) => {
          console.log(error);
        });
      if (inputs.jobtype == "TY3") {
        let result = [];
        let selectTime = getTime.filter((item) => item.isSelected === true);
        if (selectTime && selectTime.length > 0) {
          selectTime.map((schedule, index) => {
            let obj = {};
            obj.jobTitle = inputs.titleJob;
            obj.employer_id = inputs.id;
            obj.timeType = schedule.keyMap;
            obj.date = inputs.job_expiration_date;
            result.push(obj);
          });
        }
        const data2 = {
          arrSchedule: result,
        };
        console.log(typeof arrSchedule);
        axios
          .post("http://localhost:8085/api/bulk-create-schedule", data2)
          .then((res) => {
            console.log(res);
          });
      }
    }
  };

  return (
    <div className="page-employers">
      <div className="nav border-0">
        <div className="container_home_employer">
          <MenuLeft_Employer />
          <div className="info">
            <div className="employer_info">
              {/* <h5 onClick={() => setShowEmployer(false)}>Account Information</h5>
          <h5 onClick={() => setShowEmployer(true)}>Company Information</h5> */}
              {/* {renderNav()} */}
            </div>
            <div className="account_infomation">{renderNav()}</div>
          </div>
        </div>
      </div>
      {/* <div className="container ">{renderNav()}</div> */}
    </div>
  );
}
export default Employer_Postjob;
