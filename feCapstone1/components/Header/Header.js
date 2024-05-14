import { Link } from "react-router-dom";
import Logo from "../../asset/images/iconTjob.png";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
function Hearder(props) {
  const [header, setHeader] = useState(false);
  const navigate = useNavigate();
  const handleToggleClick = () => {
    setHeader(header ? false : true);
  };
  function RenderLogin() {
    var login = localStorage.getItem("login");
    login = JSON.parse(login);
    if (login) {
      return (
        <li className="login" onClick={Logout}>
          <a>
            <a href="">Log Out</a>
          </a>
        </li>
      );
    } else {
      return (
        <li className="login">
          <Link to="login">
            <a href="">Sign In</a>
          </Link>
        </li>
      );
    }
  }
  function Logout() {
    localStorage.removeItem("login");
    navigate("/login");
  }
  function HandleClickEmployer() {
    var login = localStorage.getItem("login");
    login = JSON.parse(login);
    if (login) {
      alert("You are not Employer");
    } else {
      alert("You are not logged in");
    }
  }
  function RenderEmployer_login() {
    var login = localStorage.getItem("login");
    login = JSON.parse(login);
    var dataUser = localStorage.getItem("user");
    dataUser = JSON.parse(dataUser);
    if (login) {
      if (dataUser.roleId == "R3") {
        return (
          <li className="employers" onClick={handleToggleClick}>
            <Link to="Employer-PostJob">Employers / Post job</Link>
            {/* <a href="">Employers / Post job</a> */}
          </li>
        );
      } else {
        return (
          // <li className="employers" onClick={HandleClickEmployer}>
          //   <a href="">Employers / Post job</a>
          //   {/* <a href="">Employers / Post job</a> */}
          // </li>
          <></>
        );
      }
    } else {
      return (
        <li className="employers" onClick={HandleClickEmployer}>
          <a href="">Employers / Post job</a>
        </li>
      );
    }
  }
  function RenderSeeker() {
    var login = localStorage.getItem("login");
    login = JSON.parse(login);
    var dataUser = localStorage.getItem("user");
    dataUser = JSON.parse(dataUser);
    if (login) {
      if (dataUser.roleId == "R2") {
        return (
          <>
            <li className="createcv">
              <Link to="createcv">Create your CV</Link>
            </li>
            <li className="myProfile">
              <Link to="myprofile">My Profile</Link>
              <ul className="menu_profile">
                <li>
                  <a href>Choose CV</a>
                </li>
                <li>
                  <Link to="calendar">Việc làm day</Link>
                </li>
                <li>
                  <a href>Thông báo</a>
                </li>
              </ul>
            </li>
          </>
        );
      } else {
        return (
          // <li className="createcv" onClick={HandleClickSeeker}>
          //   <a href="">Create your CV</a>
          // </li>
          <></>
        );
      }
    } else {
      return (
        <li className="createcv" onClick={HandleClickSeeker}>
          <a href="">Create your CV</a>
        </li>
      );
    }
  }
  function HandleClickSeeker() {
    var login = localStorage.getItem("login");
    login = JSON.parse(login);
    var dataUser = localStorage.getItem("user");
    dataUser = JSON.parse(dataUser);
    if (login) {
      if (dataUser.roleId != "R2") {
        alert("You are not Seeker");
      }
    } else {
      alert("You are not logged in");
    }
  }
  const renderEmployee = (props) => {
    return (
      <ul className="navigation-first_right">
        {RenderSeeker()}
        {RenderLogin()}
        {RenderEmployer_login()}
      </ul>
    );
  };
  const renderEmployer = (props) => {
    // return (
    //   <ul className="navigation-right">
    //     <li onClick={handleToggleClick}>
    //       <Link to="findjob">
    //         <p>Back to hiring</p>
    //       </Link>
    //     </li>
    //     <li className>
    //       Help center <i className="fa-regular fa-circle-question" />
    //     </li>
    //     <li>
    //       <i className="fa-regular fa-user" />
    //     </li>
    //   </ul>
    // );
  };
  function RenderFindjob() {
    var login = localStorage.getItem("login");
    login = JSON.parse(login);
    var dataUser = localStorage.getItem("user");
    dataUser = JSON.parse(dataUser);
    if (login) {
      if (dataUser.roleId == "R2") {
        return (
          <>
            <li className="findjob">
              <Link to="findjob">Jobs</Link>
              {/* <a href="fjob.html">Jobs</a> */}
            </li>
          </>
        );
      } else {
        return (
          // <li className="findjob">
          //   <a href="" to="findjob" onClick={HandleClickSeeker}>
          //     Jobs
          //   </a>
          //   {/* <a href="fjob.html">Jobs</a> */}
          // </li>
          <></>
        );
      }
    } else {
      return (
        <li className="findjob">
          <a href="" to="findjob" onClick={HandleClickSeeker}>
            Jobs
          </a>
          {/* <a href="fjob.html">Jobs</a> */}
        </li>
      );
    }
  }
  const renderNav = () => {
    let code;
    header ? (code = renderEmployer()) : (code = renderEmployee());
    return <>{code}</>;
  };
  function RenderHome() {
    var login = localStorage.getItem("login");
    login = JSON.parse(login);
    var dataUser = localStorage.getItem("user");
    dataUser = JSON.parse(dataUser);
    if (login) {
      if (dataUser.roleId == "R2") {
        return (
          <li className="image">
            <Link to="/SeekerHome">
              <img src={Logo} alt="" />
            </Link>
          </li>
        );
      } else if (dataUser.roleId == "R3") {
        return (
          <li className="image">
            <Link to="/postjob">
              <img src={Logo} alt="" />
            </Link>
          </li>
        );
      }
    } else {
      return (
        <li className="image">
          <Link to="login">
            <img src={Logo} alt="" />
          </Link>
        </li>
      );
    }
  }

  return (
    <>
      <div className="header">
        <div className="navigation-web">
          <ul className="navigation-first_left">
            {/* <li className="image">
              <Link to="login">
                <img src={Logo} alt="" />
              </Link>
            </li> */}
            {RenderHome()}
            {RenderFindjob()}
            <li className="employee">
              <a href="review.html">TJOB reviews</a>
            </li>
          </ul>
          {renderNav()}
        </div>
      </div>
    </>
  );
}
export default Hearder;
