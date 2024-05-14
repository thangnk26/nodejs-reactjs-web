import Logo from "../../asset/images/hiring.jpg";
import { useEffect, useState } from "react";
// import { style } from "@mui/system";
import { Link } from "react-router-dom";
import MenuLeft_Employer from "./MenuLeft_Employer";
function Postjob() {
  const [next, setNext] = useState(false);
  const [showEmployer, setShowEmployer] = useState(false);
  const [getUser, setUser] = useState("");
  const handleToggleClick = () => {
    setNext(next ? false : true);
  };
  useEffect(() => {
    var user = localStorage.getItem("user");
    user = JSON.parse(user);
    setUser(user);
    console.log(user);
  }, []);
  const profile = () => {
    return (
      <div className="row infoEmployer d-inline-block">
        <div className="title-employer">
          <img src={Logo} alt="" />
        </div>
        <form action="/post-crud" method="post" className="form-CV">
          <div className="form-group">
            <label class="inputForm" htmlFor="inputAddress">
              Full Name
            </label>
            <input
              type="text"
              className="form-control"
              name="fullName"
              placeholder="Name...."
            />
          </div>
          <div className="form-group">
            <label class="inputForm" htmlFor="inputAddress">
              Address
            </label>
            <input
              type="text"
              className="form-control"
              name="address"
              placeholder="Address"
            />
          </div>
          <div className="form-group">
            <label class="inputForm" htmlFor="inputAddress">
              Phone Number
            </label>
            <input
              type="text"
              className="form-control"
              name="phoneNumber"
              placeholder="Phone"
            />
          </div>
          <div className="form-group">
            <label class="inputForm" htmlFor="inputCompany">
              Company Name
            </label>
            <input
              type="text"
              className="form-control"
              name="company"
              placeholder="Company name..."
            />
          </div>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label class="inputForm" htmlFor="inputEmail4">
                Company industry{" "}
              </label>
              <input
                type="email"
                className="form-control"
                placeholder="Industry"
                name="industry"
              />
            </div>
            <div className="form-group col-md-6">
              <label class="inputForm" htmlFor="inputCity">
                Company location
              </label>
              <input
                type="text"
                className="form-control"
                name="locationCompany"
                placeholder="Location company"
              />
            </div>
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
      <div className="row infoEmployer-two">
        {/* <div>Post a job</div> */}
        <form action="/post-crud" method="post" className="form-CV">
          <div className="form-row">
            <div className="form-group col-md-6">
              <label class="inputForm" htmlFor="inputEmail4">
                Job title
              </label>
              <input
                type="email"
                className="form-control"
                id="inputEmail4"
                name="titleJob"
              />
            </div>
            <div className="form-group col-md-6">
              <label class="inputForm" htmlFor="inputCity">
                Job type
              </label>
              <select name="jobtype" className="form-control">
                <option value={1}>full-time</option>
                <option value={0}>part-time</option>
                <option value={0}>freelancer</option>
              </select>
            </div>
          </div>
          <div className="form-group">
            <label class="inputForm" htmlFor="inputAddress">
              What position(s) are you hiring?{" "}
            </label>
            <input
              type="text"
              className="form-control"
              name="position"
              placeholder="Position ..."
            />
          </div>
          <div className="form-group">
            <label class="inputForm" htmlFor="inputAddress">
              What level(s) are you hiring?{" "}
            </label>
            <input
              type="text"
              className="form-control"
              name="levels"
              placeholder="Level..."
            />
          </div>
          <div className="form-group">
            <label class="inputForm" htmlFor="inputAddress">
              Working location?{" "}
            </label>
            <input
              type="text"
              className="form-control"
              name="location"
              placeholder="Location..."
            />
          </div>
          <div className="form-group">
            <label class="inputForm" htmlFor="inputAddress">
              Description
            </label>
            <textarea
              className="form-control"
              name="description"
              placeholder
              rows={4}
              defaultValue={""}
            />
          </div>
          <div className="form-group">
            <label class="inputForm" htmlFor="inputAddress">
              Requirement
            </label>
            <textarea
              className="form-control"
              name="requirement"
              placeholder
              rows={4}
              defaultValue={""}
            />
          </div>
          <div>
            <label class="inputForm" htmlFor="inputAddress">
              Salary Range
            </label>
            <div className="form-row">
              <div className="form-group col-md-6">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Minimum"
                  name="minSalary"
                />
              </div>
              <div className="form-group col-md-6">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Maximum"
                  name="maxSalary"
                />
              </div>
            </div>
          </div>
          <div className="form-group">
            <label class="inputForm" htmlFor="inputAddress">
              Skill Tags
            </label>
            <input
              type="text"
              className="form-control"
              name="skill"
              placeholder="Skill..."
            />
          </div>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label class="inputForm" htmlFor="inputEmail4">
                Contact Person
              </label>
              <input
                type="text"
                className="form-control"
                placeholder
                name="contact"
              />
            </div>
            <div className="form-group col-md-6">
              <label class="inputForm" htmlFor="inputCity">
                Email For Applications
              </label>
              <input type="text" className="form-control" name="application" />
            </div>
          </div>
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

  const RenderAccoutEmployer = () => {
    return (
      <>
        {showEmployer ? (
          <div className="text_account">
            <h6>Company Information</h6>
            <form>
              <div className="form-group row">
                <label
                  htmlFor="staticEmail"
                  className="col-sm-2 col-form-label"
                >
                  User Name
                </label>
                <div className="col-sm-10">
                  <input
                    name="fullname"
                    type="text"
                    className="form-control-plaintext"
                    id="staticEmail"
                    value={getUser.username}
                  />
                </div>
              </div>
              <div className="form-group row">
                <label
                  htmlFor="staticEmail"
                  className="col-sm-2 col-form-label"
                >
                  Full Name
                </label>
                <div className="col-sm-10">
                  <input
                    name="fullname"
                    type="text"
                    className="form-control-plaintext"
                    id="staticEmail"
                    value={getUser.fullname}
                  />
                </div>
              </div>
              <div className="form-group row">
                <label
                  htmlFor="inputPassword"
                  className="col-sm-2 col-form-label"
                >
                  Phone Number
                </label>
                <div className="col-sm-10">
                  <input
                    type="number"
                    name="numberphone"
                    className="form-control"
                    id="inputPassword"
                    value={getUser.numberphone}
                  />
                </div>
              </div>
            </form>
          </div>
        ) : (
          <div className="text_account">
            <h6>Account Information</h6>
            <form>
              <div className="form-group row">
                <label
                  htmlFor="staticEmail"
                  className="col-sm-2 col-form-label"
                >
                  Email
                </label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    readOnly=""
                    className="form-control-plaintext"
                    id="staticEmail"
                    value={getUser.email}
                  />
                </div>
              </div>
              <div className="form-group row">
                <label
                  htmlFor="inputPassword"
                  className="col-sm-2 col-form-label"
                >
                  Password
                </label>
                <div className="col-sm-10">
                  <input
                    type="password"
                    className="form-control"
                    id="inputPassword"
                    placeholder="Password"
                  />
                </div>
              </div>
            </form>
          </div>
        )}
      </>
    );
  };
  return (
    <div className="page-employers">
      <div className="nav  border-0">
        {/* <input type="checkbox" id="menu" />
        <label htmlFor="menu" id="nav-icon">
          <span className="employer_account">Employer Account</span>
        </label> */}
        <div className="container_home_employer">
          <MenuLeft_Employer />
          <div className="info">
            <div className="employer_info">
              <h5 onClick={() => setShowEmployer(false)}>Account Information</h5>
              <h5 onClick={() => setShowEmployer(true)}>Company Information</h5>
            </div>
            <div className="account_infomation">{RenderAccoutEmployer()}</div>
          </div>
        </div>
        
      </div>

      {/* <div className="container ">{renderNav()}</div> */}
    </div>
  );
}
export default Postjob;
