import axios from "axios";
import { useEffect, useState } from "react";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import { Navigate, useNavigate } from "react-router-dom";
import Error from "../Authen/Error";

function Profile() {
  const [inputs, setInputs] = useState("");
  const [getCvUser, setCvUser] = useState("");
  const [getAllCv, setAllCv] = useState("");
  const [errors, setErrors] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    var dataUser = localStorage.getItem("user");
    dataUser = JSON.parse(dataUser);
    console.log(dataUser);
    setInputs(dataUser);
    axios
      .get(`http://localhost:8085/api/get-cv-seekerByUser?id=${dataUser.id}`)
      .then((res) => {
        console.log(res.data.data[0]);
        setCvUser(res.data.data[0]);
        setAllCv(res.data.data);
      });
  }, []);
  const handleInput = (e) => {
    let nameInput = e.target.name;
    let value = e.target.value;
    setInputs((state) => ({ ...state, [nameInput]: value }));
    setCvUser((state) => ({ ...state, [nameInput]: value }));
  };

  const renderCvDetail = () => {
    if (getAllCv.length > 0) {
      // console.log("render", getCvUser["education"]);
      // return getCvUser.map((value, key) => {
      if (Object.keys(getCvUser).length > 0) {
        return (
          <>
            <div className="profile ">
              <select
                onChange={handleInput}
                className="custom-select mb-3 col-md-4 "
                name="cv"
                value={inputs.cv}
                onClick={getIdCv}
              >
                {getAllCv.length > 0 ? (
                  <option value="">Choose your Cv</option>
                ) : (
                  <option value="">
                    You do not have cv, click on the link to create cv now
                  </option>
                )}

                {renderCv()}
              </select>
              <form action="#" onSubmit={handleSubmit} method="post">
                <div className="form-profile">
                  <div className="profile-name">
                    <h2>{inputs.fullname}</h2>
                    <i
                      style={{ fontSize: "30px" }}
                      class="fa-regular fa-pen-to-square"
                    ></i>
                  </div>
                  <div>
                    <p>Da Nang</p>
                  </div>
                  <div>
                    <p>{inputs.email}</p>
                  </div>
                  <div>
                    <p>{inputs.numberphone}</p>
                  </div>
                  <div>
                    <p>{getCvUser.birthday.slice(0, 10)}</p>
                  </div>
                  <div>
                    Gender:
                    <select
                      name="gender"
                      onChange={handleInput}
                      id
                      value={getCvUser["gender"]}
                    >
                      <option value="1">Nam</option>
                      <option value="0">Nu</option>
                    </select>
                  </div>
                  <div className="education">
                    <h2>
                      Cv{" "}
                      <i
                        style={{ float: "right" }}
                        class="fa-sharp fa-solid fa-circle-plus"
                      ></i>
                    </h2>
                    <div className="education-text">
                      <input
                        style={{
                          margin: "10px 5px 10px 0px",
                          fontSize: "20px",
                        }}
                        name="cv_name"
                        value={getCvUser.cv_name}
                        onChange={handleInput}
                      />
                      <i
                        style={{ fontSize: "20px" }}
                        class="fa-regular fa-pen-to-square"
                      ></i>
                      {/* <h4>{getCvUser["education"]}</h4> */}
                      {/* <p>{getCvUser["education"]} - VIET NAM</p>
                      <p>Present</p> */}
                    </div>
                  </div>
                  <div className="education">
                    <h2>
                      Address{" "}
                      <i
                        style={{ float: "right" }}
                        class="fa-sharp fa-solid fa-circle-plus"
                      ></i>
                    </h2>
                    <div className="education-text">
                      <input
                        style={{
                          margin: "10px 5px 10px 0px",
                          fontSize: "20px",
                        }}
                        name="address"
                        value={getCvUser.address}
                        onChange={handleInput}
                      />
                      <i
                        style={{ fontSize: "20px" }}
                        class="fa-regular fa-pen-to-square"
                      ></i>
                      {/* <h4>{getCvUser["education"]}</h4> */}
                      {/* <p>{getCvUser["education"]} - VIET NAM</p>
                      <p>Present</p> */}
                    </div>
                  </div>
                  <div className="education">
                    <h2>
                      Education{" "}
                      <i
                        style={{ float: "right" }}
                        class="fa-sharp fa-solid fa-circle-plus"
                      ></i>
                    </h2>
                    <div className="education-text">
                      <input
                        style={{
                          margin: "10px 5px 10px 0px",
                          fontSize: "20px",
                        }}
                        name="education"
                        value={getCvUser.education}
                        onChange={handleInput}
                      />
                      <i
                        style={{ fontSize: "20px" }}
                        class="fa-regular fa-pen-to-square"
                      ></i>
                      {/* <h4>{getCvUser["education"]}</h4> */}
                      <p>{getCvUser["education"]} - VIET NAM</p>
                      <p>Present</p>
                    </div>
                  </div>
                  <div className="experience">
                    <h2>
                      Experience{" "}
                      <i
                        style={{ float: "right" }}
                        class="fa-sharp fa-solid fa-circle-plus"
                      ></i>
                    </h2>
                    <div className="experience-text">
                      <input
                        style={{
                          margin: "10px 5px 10px 0px",
                          fontSize: "20px",
                        }}
                        name="experience"
                        value={getCvUser.experience}
                        onChange={handleInput}
                      />
                      <i
                        style={{ fontSize: "20px" }}
                        class="fa-regular fa-pen-to-square"
                      ></i>

                      <p>
                        {getCvUser["experience"]} kinh nghiệm làm việc thực tế
                      </p>
                    </div>
                  </div>
                  <div className="skill">
                    <h2>
                      Skill{" "}
                      <i
                        style={{ float: "right" }}
                        class="fa-sharp fa-solid fa-circle-plus"
                      ></i>
                    </h2>
                    <div className="skill-text">
                      <input
                        style={{
                          margin: "10px 5px 10px 0px",
                          fontSize: "20px",
                        }}
                        name="experience"
                        value={getCvUser.skills}
                        onChange={handleInput}
                      />
                      <i
                        style={{ fontSize: "20px" }}
                        class="fa-regular fa-pen-to-square"
                      ></i>
                      <p>{getCvUser["skills"]}</p>
                    </div>
                  </div>
                  <div className="certication">
                    <h2>
                      Certication{" "}
                      <i
                        style={{ float: "right" }}
                        class="fa-sharp fa-solid fa-circle-plus"
                      ></i>
                    </h2>
                    <div className="certication-text">
                      <input
                        style={{
                          margin: "10px 5px 10px 0px",
                          fontSize: "20px",
                        }}
                        name="experience"
                        value={getCvUser.certication}
                        onChange={handleInput}
                      />
                      <i
                        style={{ fontSize: "20px" }}
                        class="fa-regular fa-pen-to-square"
                      ></i>
                      <p> {getCvUser["certication"]}</p>
                    </div>
                  </div>
                  <div className="career">
                    <h2>
                      Career{" "}
                      <i
                        style={{ float: "right" }}
                        class="fa-sharp fa-solid fa-circle-plus"
                      ></i>
                    </h2>
                    <div className="career-text">
                      <input
                        style={{
                          margin: "10px 5px 10px 0px",
                          fontSize: "20px",
                        }}
                        name="experience"
                        value={getCvUser.career}
                        onChange={handleInput}
                      />
                      <i
                        style={{ fontSize: "20px" }}
                        class="fa-regular fa-pen-to-square"
                      ></i>
                      <p>{getCvUser.career}</p>
                      {/* <p>Mua lại công ty trong tương lai</p> */}
                    </div>
                  </div>
                  <div className="button1 d-flex">
                    <button
                      type="submit"
                      style={{ marginRight: "10px" }}
                      className="btn btn-primary"
                    >
                      Update
                    </button>
                    <div className="deleteCv"></div>
                    <div
                      onClick={() => DeleteCv(getCvUser)}
                      className="btn btn-danger"
                    >
                      Delete
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </>
        );
      }

      // });
    }
  };
  function renderCv() {
    if (getAllCv.length > 0) {
      return getAllCv.map((value, key) => {
        return (
          <>
            <option value={value.cv_name}>{value.cv_name}</option>
          </>
        );
      });
    } else {
      return null;
    }
  }
  const getIdCv = (e) => {
    // console.log(e.target.value);
    {
      getAllCv.map((value, key) => {
        if (e.target.value == value.cv_name) {
          console.log(value);
          setCvUser(value);
        }
      });
    }
    // if()
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    let flag = true;
    let errorSubmit = {};
    if (getCvUser.cv_name == "") {
      flag = false;
      errorSubmit.cv_name = "Empty Name CV";
    }
    if (getCvUser.cv_name == undefined) {
      flag = false;
      errorSubmit.cv_name = "Empty Name CV";
    }
    if (getCvUser.address == "") {
      flag = false;
      errorSubmit.address = "Empty address";
    }
    if (getCvUser.address == undefined) {
      flag = false;
      errorSubmit.address = "Empty address";
    }
    if (getCvUser.education == "") {
      flag = false;
      errorSubmit.education = "Empty education";
    }
    if (getCvUser.education == undefined) {
      flag = false;
      errorSubmit.education = "Empty education";
    }
    if (getCvUser.experience == "") {
      flag = false;
      errorSubmit.experience = "Empty experience";
    }
    if (getCvUser.experience == undefined) {
      flag = false;
      errorSubmit.experience = "Empty experience";
    }
    if (getCvUser.skills == "") {
      flag = false;
      errorSubmit.skills = "Empty skills";
    }
    if (getCvUser.skills == undefined) {
      flag = false;
      errorSubmit.skills = "Empty skills";
    }
    if (getCvUser.certication == "") {
      flag = false;
      errorSubmit.certication = "Empty certication";
    }
    if (getCvUser.certication == undefined) {
      flag = false;
      errorSubmit.certication = "Empty certication";
    }
    if (getCvUser.career == "") {
      flag = false;
      errorSubmit.career = "Empty career";
    }
    if (getCvUser.career == undefined) {
      flag = false;
      errorSubmit.career = "Empty career";
    }
    if (!flag) {
      setErrors(errorSubmit);
    } else {
      setErrors({});
      const data = {
        seeker_id: inputs.id,
        address: getCvUser.address,
        birthday: getCvUser.birthday,
        gender: getCvUser.gender,
        education: getCvUser.education,
        certication: getCvUser.certication,
        experience: getCvUser.experience,
        skills: getCvUser.skills,
        career: getCvUser.career,
      };
      axios.put("http://localhost:8085/api/edit-seekerCv", data).then((res) => {
        console.log(res.data);
        if (res.data.errCode == 0) {
          alert("Update success");
        } else {
          let er = {};
          er = "" + res.data.message;
          setErrors({ er });
        }
      });
    }
  };
  const DeleteCv = (e) => {
    console.log(e);
    var dataUser = localStorage.getItem("user");
    dataUser = JSON.parse(dataUser);
    axios
      .delete(`http://localhost:8085/api/delete-cv?id=${e.id}`)
      .then((res) => {
        console.log(res.data);
        if (res.data.errCode == 0) {
          alert("Delete Successfully");
          axios
            .get(
              `http://localhost:8085/api/get-cv-seekerByUser?id=${dataUser.id}`
            )
            .then((res) => {
              console.log(res.data.data[0]);
              setCvUser(res.data.data[0]);
              setAllCv(res.data.data);
            });
        }
      });
  };

  return <>{renderCvDetail()}</>;
}
export default Profile;
