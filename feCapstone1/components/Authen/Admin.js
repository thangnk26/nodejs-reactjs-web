import { useEffect, useState } from "react";
import { json, Link } from "react-router-dom";
import Error from "../Authen/Error";
import Hearder from "../Header/Header";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import Logo from "../../asset/images/iconTjob.png";

const Admin = () => {
  const [inputs, setInputs] = useState("");
  const [getdata, setData] = useState("");
  const [show, setShow] = useState(false);
  const [infoCv, setInfoCv] = useState("");
  const [job, setJob] = useState("");
  const [users, setUsers] = useState("");
  const [getSearch, setSearch] = useState("");
  const [getShowPost, setShowPost] = useState("");
  const [role, setRole] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    axios.get("http://localhost:8085/api/get-cv").then((res) => {
      console.log("Cv", res);
      setInfoCv(res.data.data);
    });
    axios.get("http://localhost:8085/api/get-all-job").then((res) => {
      console.log("job", res);
      setJob(res.data.data);
    });
    axios.get("http://localhost:8085/api/get-all-member").then((res) => {
      console.log(res);
      setUsers("all user", res.data.data);
      setData(res.data.data);
    });
    axios.get("http://localhost:8085/api/allcodetype?type=ROLE").then((res) => {
      console.log(res);
      setRole("allcode", res.data.data);

    });
  }, []);
  const handleInput = (e) => {
    let nameInput = e.target.name;
    let value = e.target.value;
    setInputs((state) => ({ ...state, [nameInput]: value }));
  };
  // const abc = (e) => {
  //   // setSearch(inputs.search);
  //   // localStorage.setItem("idEditUser", JSON.stringify(inputs.search));
  //   axios.get("http://localhost:8085/api/get-all-member").then((res) => {
  //     setData(res.data.data);
  //   });
  // };
  const idEditUser = (e) => {
    localStorage.setItem("idEditUser", JSON.stringify(e.target.id));
    // localStorage.setItem("DataUser", JSON.stringify(getdata));
  };
  const DeleteUser = (e) => {
    const id = e.target.id;

    axios
      .delete("http://localhost:8085/api/delete-user", {
        data: {
          id: id,
        },
      })
      .then((res) => {
        console.log(res.data);
        if (res.data.errCode == 0) {
          axios.get("http://localhost:8085/api/get-all-member").then((res) => {
            console.log(res.data);
            setData(res.data.data);
          });
        }
      });
  };
  function showUser() {
    if (getdata.length > 0) {
      return getdata.map((value,key)=>{
        if (inputs.search==null) {
          return (
            <>
              <tbody>
                <tr>
                  <td>
                    <img src="./frontend/image/user2.jpg" />
                    <p>{value.fullname}</p>
                  </td>
                  <td>{value.roleId == "R2" ? <>Seeker</> : <>Employer</>}</td>
                  <td>
                    <Link to="/admin&Update-user">
                      <box-icon
                        name="edit-alt"
                        style={{ marginRight: "10px" }}
                        id={value.id}
                        onClick={idEditUser}
                      ></box-icon>
                    </Link>
                    <box-icon
                      name="message-alt-x"
                      style={{ marginLeft: "10px" }}
                      id={value.id}
                      onClick={DeleteUser}
                    ></box-icon>
                  </td>
                </tr>
              </tbody>
            </>
          );
        }
       else if(value.fullname.includes(inputs.search)){
        return (
          <>
            <tbody>
              <tr>
                <td>
                  <img src="./frontend/image/user2.jpg" />
                  <p>{value.fullname}</p>
                </td>

                <td>
                  {/* {" "}
                  <td> */}
                    {value.roleId == "R2" ? <>Seeker</> : <>Employer</>}
                  {/* </td> */}
                </td>

                <td>
                  <Link to="/admin&Update-user">
                    <box-icon
                      name="edit-alt"
                      style={{ marginRight: "10px" }}
                      id={value.id}
                      onClick={idEditUser}
                    ></box-icon>
                  </Link>
                  <box-icon
                    name="message-alt-x"
                    style={{ marginLeft: "10px" }}
                    id={value.id}
                    onClick={DeleteUser}
                  ></box-icon>
                </td>
              </tr>
            </tbody>
          </>
        );
       }
      
      })
    }
  }
  function Logout() {
    localStorage.removeItem("login");
    navigate("/login");
  }
  function showPost() {
    if (job.length > 0) {
      return job.map((value, key) => {
        if (inputs.searchPost == null) {
          return (
            <>
              <tbody>
                <tr>
                  <td>
                    <p>{value.title}</p>
                  </td>

                  <td>
                    {value.job_status == "0" ? (
                      <>
                        <p>Expired</p>
                      </>
                    ) : (
                      <>
                        <p>Ok</p>
                      </>
                    )}
                  </td>
                  <td>
                    <p>{value.job_expiration_date.slice(0, 10)}</p>
                  </td>
                </tr>
              </tbody>
            </>
          );
        } else if (value.title.includes(inputs.searchPost)) {
          return (
            <>
              <tbody>
                <tr>
                  <td>
                    <p>{value.title}</p>
                  </td>

                  <td>
                    {value.job_status == "0" ? (
                      <>
                        <p>Expired</p>
                      </>
                    ) : (
                      <>
                        <p>Ok</p>
                      </>
                    )}
                  </td>
                  <td>
                    <p>{value.job_expiration_date.slice(0, 10)}</p>
                  </td>
                </tr>
              </tbody>
            </>
          );
        }
      });
    }
  }
  return (
    <>
      <>
        <section id="sidebar">
          <Link to="/admin" className="brand">
            {/* <i className="bx bxs-smile" />
            <span className="text">Admin TJOB</span> */}
            <img src={Logo} alt="" />
          </Link>
          <ul className="side-menu top">
            <li className="active">
              <a href="#">
                <i className="bx bxs-dashboard" />
                <span className="text">Dashboard</span>
              </a>
            </li>
            {/* <li>
              <a href="#">
                <i className="bx bxs-shopping-bag-alt" />
                <span className="text">My Store</span>
              </a>
            </li>
            <li>
              <a href="#">
                <i className="bx bxs-doughnut-chart" />
                <span className="text">Analytics</span>
              </a>
            </li>
            <li>
              <a href="#">
                <i className="bx bxs-message-dots" />
                <span className="text">Message</span>
              </a>
            </li>
            <li>
              <a href="#">
                <i className="bx bxs-group" />
                <span className="text">Team</span>
              </a>
            </li> */}
          </ul>
          <ul className="side-menu">
            <li>
              <a href="#">
                <i className="bx bxs-cog" />
                <span className="text">Settings</span>
              </a>
            </li>
            <li>
              <a href="" className="logout" onClick={Logout}>
                <i className="bx bxs-log-out-circle" />
                <span className="text">Logout</span>
              </a>
            </li>
          </ul>
        </section>
        {/* SIDEBAR */}
        {/* CONTENT */}
        <section id="content">
          {/* NAVBAR */}
          {/* <nav>
            <i className="bx bx-menu" />
            <a href="#" className="nav-link">
              Categories
            </a>
            <form action="#">
              <div className="form-input">
                <input type="text" placeholder="Search..." />

                <button type="submit" className="search-btn">
                  <i className="bx bx-search" />
                </button>
              </div>
            </form>
            <input type="checkbox" id="switch-mode" hidden="" />
            <label htmlFor="switch-mode" className="switch-mode" />
            <a href="#" className="notification">
              <i className="bx bxs-bell" />
              <span className="num">8</span>
            </a>
            <a href="#" className="profile">
              <img src="./frontend/image/user1.jpg" />
            </a>
          </nav> */}
          {/* NAVBAR */}
          {/* MAIN */}
          <main>
            <div className="head-title">
              <div className="left">
                <h1>Dashboard</h1>
                <ul className="breadcrumb">
                  <li>
                    <a href="#">Dashboard</a>
                  </li>
                  <li>
                    <i className="bx bx-chevron-right" />
                  </li>
                  <li>
                    <a className="active" href="#">
                      Home
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <ul className="box-info">
              <li>
                <i className="bx bxs-calendar-check" />
                <span className="text">
                  <h3>1020</h3>
                  <p> Post</p>
                </span>
              </li>
              <li>
                <i className="bx bxs-group" />
                <span className="text">
                  <h3>2834</h3>
                  <p>User</p>
                </span>
              </li>
            </ul>
            <div className="table-data">
              <div className="order">
                <div className="head">
                  <h3>Users</h3>
                  <div className="form-input">
                    <input
                      name="search"
                      type="text"
                      placeholder="Search Users"
                      onChange={handleInput}
                    />

                    <button
                      type="submit"
                      className="search-btn"
                      onClick={() => setShow(false)}
                    >
                      <i
                        className="bx bx-search"
                        // id={inputs.search}
                        // onClick={abc}
                      />
                    </button>
                  </div>
                </div>
                <table>
                  <thead>
                    <tr>
                      <th>UserName</th>
                      <th>Role</th>
                      <th>Status</th>
                    </tr>
                  </thead>

                  {!show ? <>{showUser()}</> : null}
                  {/* {!show ? <>Heloo</> : null} */}
                </table>
              </div>
            </div>

            {/* Bang Post */}
            <div className="table-data">
              <div className="order">
                <div className="head">
                  <h3>Posts</h3>
                  <div className="form-input">
                    <input
                      name="searchPost"
                      type="text"
                      placeholder="Search Posts"
                      onChange={handleInput}
                    />

                    <button
                      type="submit"
                      className="search-btn"
                      onClick={() => setShowPost(false)}
                    >
                      <i
                        className="bx bx-search"
                        // id={inputs.search}
                        // onClick={abc}
                      />
                    </button>
                  </div>
                </div>
                <table>
                  <thead>
                    <tr>
                      <th>Post Title</th>
                      <th>Status</th>
                      <th>Expiration</th>
                    </tr>
                  </thead>
                  {/* {showPost()} */}
                  {!getShowPost ? <>{showPost()}</> : null}
                  {/* {!show ? <>Heloo</> : null} */}
                </table>
              </div>
            </div>
          </main>
          {/* MAIN */}
        </section>
        {/* CONTENT */}
      </>
    </>
  );
};
export default Admin;
