import Logo from "../../asset/images/hiring.jpg";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Error from "../Authen/Error";
import Hearder from "../Header/Header";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import { json } from "react-router-dom";
import DatePicker from "react-datepicker";

function Employer_EditJob(dataJob) {
  const [inputs, setInputs] = useState("");
  const [errors, setErrors] = useState("");
  const [user, setUser] = useState("");
  const [next, setNext] = useState(false);
  const [getTime, setTime] = useState("");
  const [getLocation, setLocation] = useState("");
  const [getHour, setHour] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [getSchedule, setSchedule] = useState("");
  const handleToggleClick = () => {
    setNext(next ? false : true);
  };
  console.log(dataJob);
  useEffect(() => {
    var dataUser = localStorage.getItem("user");
    dataUser = JSON.parse(dataUser);
    console.log(dataUser);
    setUser(dataUser);
    setInputs(dataJob.dataJob);
    axios
      // .get("http://localhost:8085/api/allcodetype", location_id)
      .get("http://localhost:8085/api/allcodetype?type=PROVINCE")
      .then((res) => {
        setLocation(res.data.data);
      });
    axios
      .get(`http://localhost:8085/api/get-schedule-id?id=${dataUser.id}`)
      .then((res) => {
        console.log("schedule", res.data.data);
        setSchedule(res.data.data);
      });
    axios
      // .get("http://localhost:8085/api/allcodetype", location_id)
      .get("http://localhost:8085/api/allcodetype?type=TIME")
      .then((res) => {
        let data = res.data.data;
        data = data.map((item) => ({ ...item, isSelected: false }));
        setTime(data);
      });
    // console.log(inputs.locationData.value);
  }, []);
  const handleInput = (e) => {
    let nameInput = e.target.name;
    let value = e.target.value;
    setInputs((state) => ({ ...state, [nameInput]: value }));
    setUser((state) => ({ ...state, [nameInput]: value }));
  };
  useEffect(() => {
    const location_id = {
      type: "PROVINCE",
    };
  }, []);
  useEffect(() => {}, []);
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
        {/* <div className="title-employer">
          <img src={Logo} alt="" />
        </div> */}
        <form
          action="#"
          method="post"
          onSubmit={handleSubmit}
          className="form-CV"
        >
          <div className="form-group">
            <label
              className="inputForm d-block p-0"
              style={{ color: "black" }}
              htmlFor="inputAddress"
            >
              Full Name
            </label>
            <input
              onChange={handleInput}
              type="text"
              className="form-control"
              name="fullName"
              placeholder="Name...."
              value={user.fullname}
            />
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
          </div>
          <div className="form-group">
            <label className="inputForm d-block p-0" htmlFor="inputAddress">
              Phone Number
            </label>
            <input
              onChange={handleInput}
              type="text"
              className="form-control"
              name="numberphone"
              placeholder="Phone"
              value={user.numberphone}
            />
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
          </div>
          <div className="form-group">
            <label className="inputForm d-block p-0" htmlFor="inputCity">
              Company Location
            </label>
            <select
              name="location_id"
              value={inputs.location_id}
              onChange={handleInput}
            >
              <option className="w-100" value="">
                Choose Location
              </option>
              {ShowLocation()}
            </select>
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
    var date = inputs.job_expiration_date;

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
                name="title"
                value={inputs.title}
              />
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
              name="job_position"
              placeholder="Position ..."
              value={inputs.job_position}
            />
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
          </div>
          <div className="form-group">
            <label className="inputForm d-block p-0" htmlFor="inputAddress">
              Job Category{" "}
            </label>
            <input
              onChange={handleInput}
              type="text"
              className="form-control"
              name="jobCategory_id"
              // placeholder="Location..."
              value={inputs.jobCategory_id}
            />
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
          </div>
          <div className="form-group">
            <label className="inputForm d-block p-0" htmlFor="inputAddress">
              Requirement
            </label>
            <textarea
              onChange={handleInput}
              className="form-control"
              name="job_requirement"
              placeholder
              rows={4}
              value={inputs.job_requirement}
            />
          </div>
          <div>
            <label className="inputForm d-block p-0" htmlFor="inputAddress">
              Salary Range
            </label>
            <div className="form-row">
              <div className="form-group col-md-6">
                <input
                  onChange={handleInput}
                  type="text"
                  className="form-control"
                  placeholder="Minimum"
                  name="minSalary"
                  value={inputs.minSalary}
                />
              </div>
              <div className="form-group col-md-6">
                <input
                  onChange={handleInput}
                  type="text"
                  className="form-control"
                  placeholder="Maximum"
                  name="job_salary"
                  value={inputs.job_salary}
                />
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
              name="job_skill"
              placeholder="Skill..."
              value={inputs.job_skill}
            />
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
              value={inputs.job_expiration_date.slice(0, 10)}
              // minDate={d.getDate()}
            />
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
          <Error errors={errors} />
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
    if (user.fullname == "") {
      flag = false;
      errorSubmit.fullname = "Empty Fullname";
    }
    if (user.fullname == undefined) {
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
    if (user.numberphone == "") {
      flag = false;
      errorSubmit.numberphone = "Empty Phone Number";
    }
    if (user.numberphone == undefined) {
      flag = false;
      errorSubmit.numberphone = "Empty Phone Number";
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
    if (inputs.title == "") {
      flag = false;
      errorSubmit.title = "Empty Job title";
    }
    if (inputs.title == undefined) {
      flag = false;
      errorSubmit.title = "Empty Job title";
    }
    if (inputs.jobtype == "") {
      flag = false;
      errorSubmit.jobtype = "Empty Job type";
    }
    if (inputs.jobtype == undefined) {
      flag = false;
      errorSubmit.jobtype = "Empty Job type";
    }
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
    if (inputs.job_position == "") {
      flag = false;
      errorSubmit.job_position = "Empty position";
    }
    if (inputs.job_position == undefined) {
      flag = false;
      errorSubmit.job_position = "Empty position";
    }
    if (inputs.levels == "") {
      flag = false;
      errorSubmit.levels = "Empty Level";
    }
    if (inputs.levels == undefined) {
      flag = false;
      errorSubmit.levels = "Empty Level";
    }
    if (inputs.jobCategory_id == "") {
      flag = false;
      errorSubmit.jobCategory_id = "Empty jobCategory";
    }
    if (inputs.jobCategory_id == undefined) {
      flag = false;
      errorSubmit.jobCategory_id = "Empty jobCategory";
    }
    if (inputs.description == "") {
      flag = false;
      errorSubmit.description = "Empty description";
    }
    if (inputs.description == undefined) {
      flag = false;
      errorSubmit.description = "Empty description";
    }
    if (inputs.job_requirement == "") {
      flag = false;
      errorSubmit.job_requirement = "Empty requirement";
    }
    if (inputs.job_requirement == undefined) {
      flag = false;
      errorSubmit.job_requirement = "Empty requirement";
    }
    if (inputs.minSalary == "") {
      flag = false;
      errorSubmit.minSalary = "Empty minSalary";
    }
    if (inputs.minSalary == undefined) {
      flag = false;
      errorSubmit.minSalary = "Empty minSalary";
    }
    if (inputs.job_salary == "") {
      flag = false;
      errorSubmit.job_salary = "Empty maxSalary";
    }
    if (inputs.job_salary == undefined) {
      flag = false;
      errorSubmit.job_salary = "Empty maxSalary";
    }
    if (inputs.job_skill == "") {
      flag = false;
      errorSubmit.job_skill = "Empty skill";
    }
    if (inputs.job_skill == undefined) {
      flag = false;
      errorSubmit.job_skill = "Empty skill";
    }
    // if (inputs.time == "") {
    //   flag = false;
    //   errorSubmit.job_shift = "Empty application";
    // }
    // if (inputs.time == undefined) {
    //   flag = false;
    //   errorSubmit.job_shiftcation = "Empty application";
    // }
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
      console.log(inputs.id);
    } else {
      setErrors({});
      // console.log(roleId);
      let StringDate = "" + inputs.location_id;
      const data = {
        id: inputs.id,
        company: inputs.company,
        title: inputs.title,
        description: inputs.description,
        jobCategory_id: inputs.jobCategory_id,
        location_id: inputs.location_id,
        employer_id: user.id,
        job_type: inputs.jobtype,
        job_salary: inputs.job_salary,
        job_skill: inputs.job_skill,
        job_requirement: inputs.job_requirement,
        job_start_date: "" + inputs.job_start_date,
        job_finish_date: "" + inputs.job_finish_date,
        job_position: inputs.job_position,
        job_expiration_date: "" + inputs.job_expiration_date,
        job_shift: "" + getHour,
        quality: inputs.quality,
        job_status: 1,
      };
      let er = {};
      let url = "http://localhost:8085/api/edit-job";
      axios
        .put(url, data)
        .then((res) => {
          console.log(res);

          if (res.data.errCode != 0) {
            er = "" + res.data.message;
            setErrors({ er });
          } else {
            alert("Update job sucessfull");
          }
        })
        .catch((error) => {
          console.log(error);
        });
      if (inputs.jobtype == "TY3") {
        if (getSchedule.length > 0) {
          let deleted = 1;
          getSchedule.map((value, key) => {
            axios
              .delete(
                `http://localhost:8085/api/delete-Schedule?id=${value.id}`
              )
              .then((res) => {
                console.log(res.data);
              });
          });
          // if (deleted == 0) {

          // }
          let result = [];
          let selectTime = getTime.filter((item) => item.isSelected === true);
          if (selectTime && selectTime.length > 0) {
            selectTime.map((schedule, index) => {
              let obj = {};
              obj.jobTitle = inputs.title;
              obj.employer_id = user.id;
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
        let result = [];
        let selectTime = getTime.filter((item) => item.isSelected === true);
        if (selectTime && selectTime.length > 0) {
          selectTime.map((schedule, index) => {
            let obj = {};
            obj.jobTitle = inputs.title;
            obj.employer_id = user.id;
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
  return <>{renderNav()}</>;
}
export default Employer_EditJob;
