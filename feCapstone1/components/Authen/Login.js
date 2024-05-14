import { useState } from "react";
import { Link } from "react-router-dom";
import Error from "../Authen/Error";
import Hearder from "../Header/Header";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
const Login = () => {
  const [inputs, setInputs] = useState("");
  const [errors, setErrors] = useState("");
  const navigate = useNavigate();
  const handleInput = (e) => {
    let nameInput = e.target.name;
    let value = e.target.value;
    setInputs((state) => ({ ...state, [nameInput]: value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const re =
      /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    let flag = true;
    let errorSubmit = {};
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
    // pass
    if (inputs.password === undefined) {
      flag = false;
      errorSubmit.password = "Please enter your password";
    }
    if (inputs.password === "") {
      flag = false;
      errorSubmit.password = "Please enter your passwword";
    }

    if (!flag) {
      setErrors(errorSubmit);
      console.log(inputs.email);
    } else {
      let user = {
        email: inputs.email,
        password: inputs.password,
      };
      let url = "http://localhost:8085/api/login";
      axios
        .post(url, user)
        .then((res) => {
          let er = {};
          // nếu res tồn tại báo lỗi
          if (res.data.message) {
          }
          //else {
          //   setInputs({
          //     email: "",
          //     password: "",
          //   });
          localStorage.setItem("user", JSON.stringify(res.data.user));
          // }
          // console.log(res.data);
          // console.log(res.data.user);
          if (res.data.message != "Ok") {
            // er = "Email or password is incorrect";
            // setErrors({ er });
            er = "" + res.data.message;
            setErrors({ er });
          } else {
            localStorage.setItem("login", JSON.stringify(true));
            er = "Login successful";
            alert("Login successful");

            if (res.data.user.roleId == "R1") {
              navigate("/admin");
            } else if (res.data.user.roleId == "R2") {
              navigate("/SeekerHome");
            } else if (res.data.user.roleId == "R3") {
              navigate("/postjob");
            }
          }
        })
        .catch((error) => {
          console.log(error);
        });

      setErrors({});
    }
  };

  return (
    <>
      <div className="authentication">
        {/* Login form */}
        {/* <Error errors={errors} /> */}
        <div className="auth-form auth-form__login">
          <div className="auth-form__container">
            <div className="auth-form__header">
              <h3 className="auth-form__heading">Login</h3>
            </div>

            <form encType="multipart/form-data" onSubmit={handleSubmit}>
              <div className="auth-form__form">
                <div className="auth-form__group">
                  <input
                    type="text"
                    className="auth-form__input"
                    placeholder="Email... "
                    name="email"
                    onChange={handleInput}
                  />
                </div>
                <div className="auth-form__group">
                  <input
                    type="password"
                    name="password"
                    className="auth-form__input"
                    placeholder="Password "
                    onChange={handleInput}
                  />
                </div>
                {/* <p>{errors.password}</p> */}
              </div>
              <Error errors={errors} />
              <div className="auth-form__aside">
                <div className="auth-form__help">
                  <a href className="auth-form__link auth-form__help">
                    Forgot password
                  </a>
                  <span className="auth-form__help--separate" />
                  <Link to="/register" style={{ textDecoration: "none" }}>
                    <a href className="auth-form__link auth-form__help">
                      Sign Up
                    </a>
                  </Link>
                </div>
              </div>
              <div className="auth-form__controls">
                <button type="submit" className="btn btn--primary ">
                  LOGIN
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
              Sign in with Facebook
            </a>
            <a
              href
              className="auth-form__socials--google btn btn--size-s btn--with-icon"
            >
              <i className="auth-form__socials-icon fa-brands fa-google" />
              Sign in with Google
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
