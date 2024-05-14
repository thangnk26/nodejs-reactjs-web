import { useState } from "react";
import { Link } from "react-router-dom";
import Error from "./Error";
import Hearder from "../Header/Header";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
const Register = () => {
  const [inputs, setInputs] = useState("");
  const [errors, setErrors] = useState("");
  const [roleId, setRoleId] = useState("");
  const navigate = useNavigate();
  const handleInput = (e) => {
    let nameInput = e.target.name;
    let value = e.target.value;
    setInputs((state) => ({ ...state, [nameInput]: value }));
  };
  const getRoleID = (e) => {
    setRoleId(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const re =
      /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    const vnf_regex = /((09|03|07|08|05)+([0-9]{8})\b)/g;
    let flag = true;
    let errorSubmit = {};

    if (inputs.fullname == undefined) {
      flag = false;
      errorSubmit.fullname = "Please enter your name";
    }
    if (inputs.name == "") {
      flag = false;
      errorSubmit.name = "Please enter your name";
    }
    if (!re.test(inputs.email)) {
      flag = false;
      errorSubmit.email = "Invalid email format";
    }
    if (inputs.email === undefined) {
      flag = false;
      errorSubmit.email = "Please enter your email";
    }
    if (inputs.email === "") {
      flag = false;
      errorSubmit.email = "Please enter your email";
    }
    if (inputs.password === undefined) {
      flag = false;
      errorSubmit.password = "Please enter your password";
    }
    if (inputs.password === "") {
      flag = false;
      errorSubmit.password = "Please enter your password";
    }
    if (inputs.repassword === undefined) {
      flag = false;
      errorSubmit.repassword = "Please confirm your password";
    }
    if (inputs.repassword === "") {
      flag = false;
      errorSubmit.repassword = "Please confirm your password";
    }
    if (inputs.password != inputs.repassword) {
      flag = false;
      errorSubmit.repassword = "Incorrect password";
    }
    if (inputs.username === undefined) {
      flag = false;
      errorSubmit.username = "Please enter your username";
    }
    if (inputs.username === "") {
      flag = false;
      errorSubmit.username = "Please enter your username";
    }
    if (!vnf_regex.test(inputs.numberphone)) {
      flag = false;
      errorSubmit.numberphone = "Invalid number format";
    }
    if (inputs.numberphone === undefined) {
      flag = false;
      errorSubmit.numberphone = "Please enter your phone number";
    }
    if (inputs.numberphone === "") {
      flag = false;
      errorSubmit.numberphone = "Please enter your phone number";
    }
    

    if (!flag) {
      setErrors(errorSubmit);
      console.log(roleId);
    } else {
      setErrors({});

      // console.log(roleId);
      const data = {
        fullname: inputs.fullname,
        email: inputs.email,
        username: inputs.username,
        password: inputs.password,
        numberphone: inputs.numberphone,
        roleId: roleId,
      };
      let url = "http://localhost:8085/api/create-new-user";
      axios
        .post(url, data)
        .then((res) => {
          console.log(res);
          if (res.data.errors) {
            setErrors(res.data.errors);
          } else {
            alert("Đăng kí thành công");
            navigate("/login");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  return (
    <>
      <div className="authentication">
        <div className="auth-form auth-form__signup">
          <div className="auth-form__container">
            <div className="auth-form__header">
              <h3 className="auth-form__heading">Sign Up</h3>
              <Link to="/login" style={{ textDecoration: "none" }}>
                <span className="auth-form__switch-btn auth-form__switch-btn1">
                  Login
                </span>
              </Link>
            </div>
            <form action="#" onSubmit={handleSubmit}>
              <div className="auth-form__form">
                <div className="auth-form__group">
                  <input
                    name="fullname"
                    type="text"
                    className="auth-form__input"
                    placeholder="Name "
                    value={inputs.fullname}
                    onChange={handleInput}
                  />
                  <p className="uemail" />
                  <p style={{ color: "red" }}>{errors.fullname}</p>
                </div>
                <div className="auth-form__group">
                  <input
                    name="email"
                    type="text"
                    className="auth-form__input"
                    placeholder="Email "
                    value={inputs.email}
                    onChange={handleInput}
                  />
                  <p className="uemail" />
                  <p style={{ color: "red" }}>{errors.email}</p>
                </div>

                <div className="auth-form__group">
                  <input
                    name="username"
                    type="text"
                    className="auth-form__input"
                    placeholder="UseName "
                    value={inputs.username}
                    onChange={handleInput}
                  />
                  <p className="uemail" />
                  <p style={{ color: "red" }}>{errors.username}</p>
                </div>
                <div className="auth-form__group">
                  <input
                    name="password"
                    type="password"
                    className="auth-form__input"
                    placeholder="Password "
                    value={inputs.password}
                    onChange={handleInput}
                  />
                  <p className="upass" />
                  <p style={{ color: "red" }}>{errors.password}</p>
                </div>
                <div className="auth-form__group">
                  <input
                    type="password"
                    className="auth-form__input"
                    placeholder="Confirm password"
                    value={inputs.repassword}
                    onChange={handleInput}
                  />
                  <p className="uconfirm" />
                  <p style={{ color: "red" }}>{errors.repassword}</p>
                </div>
                <div className="auth-form__group">
                  <input
                    name="numberphone"
                    type="number"
                    className="auth-form__input"
                    placeholder="Number "
                    value={inputs.numberphone}
                    onChange={handleInput}
                  />
                  <p className="uconfirm" />
                  <p style={{ color: "red" }}>{errors.numberphone}</p>
                </div>

                <div className="auth-form__group">
                  <select onChange={getRoleID}>
                    <option value="">Chọn Phân quyền</option>
                    <option value="R1">Admin</option>
                    <option value="R2">Seeker</option>
                    <option value="R3">Employer</option>
                  </select>
                </div>
              </div>
              {/* <Error errors={errors} /> */}
              <div className="auth-form__aside">
                <p className="auth-form__policy-text">
                  By registering, you agree to WildGuy about
                  <a href className="auth-form__text-link">
                    Terms of Service
                  </a>
                  &amp;
                  <a href className="auth-form__text-link">
                    Privacy Policy
                  </a>
                </p>
              </div>
              <div className="auth-form__controls">
                <button type="submit" className="btn btn--primary ">
                  SIGN UP
                </button>
              </div>
            </form>
          </div>
          <div className="auth-form__socials">
            <a
              href
              className="auth-form__socials--facebook btn btn--size-s btn--with-icon"
            >
              <i className="auth-form__socials-icon fa-brands fa-facebook-square" />
              Connect with Facebook
            </a>
            <a
              href
              className="auth-form__socials--google btn btn--size-s btn--with-icon"
            >
              <i className="auth-form__socials-icon fa-brands fa-google" />
              Connect with Google
            </a>
          </div>
        </div>
        {/* Login form */}
      </div>
    </>
  );
};

export default Register;
