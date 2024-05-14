import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Error from "../Authen/Error";
import Hearder from "../Header/Header";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
function AdminUpdateUser() {
  const [inputs, setInputs] = useState("");
  const [errors, setErrors] = useState("");
  const [getdata, setdata] = useState("");
  const [getSearch, setSearch] = useState("");
  const [show, setShow] = useState(true);
  const navigate = useNavigate();
  const handleInput = (e) => {
    let nameInput = e.target.name;
    let value = e.target.value;
    setInputs((state) => ({ ...state, [nameInput]: value }));
  };
  // console.log(getSearch);
  // var idEditUser = localStorage.getItem("idEditUser");
  // idEditUser = JSON.parse(idEditUser);
  useEffect(() => {
    var idEditUser = localStorage.getItem("idEditUser");
    idEditUser = JSON.parse(idEditUser);
    axios.get("http://localhost:8085/api/get-all-member").then((res) => {
      console.log(res.data.data);
      setdata(res.data.data);
      setInputs(res.data.data);
      var Data123 = [...getdata];
      console.log(Data123.filter((data123) => data123.fullname.includes("Ng")));
    });
    axios
      .get(`http://localhost:8085/api/get-all-users?id=${idEditUser}`)
      .then((res) => {
        console.log(res.data.users);

        setInputs(res.data.users);
      });
  }, []);

  console.log(getdata);
  const idEditUser1 = (e) => {
    localStorage.setItem("idEditUser", JSON.stringify(e.target.id));
    console.log(e.target.id);
    axios
      .get(`http://localhost:8085/api/get-all-users?id=${e.target.id}`)
      .then((res) => {
        console.log(res.data.users);
        // setdata(res.data.users);
        if (res.data.users != null || res.data.users != undefined) {
          setInputs(res.data.users);
        }
      });
  };
  const abc = (e) => {
    setSearch(inputs.search);
    // localStorage.setItem("idEditUser", JSON.stringify(inputs.search));
    axios.get("http://localhost:8085/api/get-all-member").then((res) => {
      setdata(res.data.data);
    });
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
          axios
            .get(`http://localhost:8085/api/get-all-users?id=${inputs.search}`)
            .then((res) => {
              console.log(res.data);
              setdata(res.data.users);
            });
        }
      });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      id: inputs.id,
      fullname: inputs.fullname,
      username: inputs.username,
      numberphone: inputs.numberphone,
    };
    axios.put("http://localhost:8085/api/edit-user", data).then((res) => {
      console.log(res.data);
      if (res.data.errCode == 0) {
        alert("Update thành công");
      }
    });
  };
  function showUser() {
    if (getdata.length > 0) {
      return getdata.map((value, key) => {
        if (getSearch == "ALL") {
          return (
            <>
              <tbody>
                <tr>
                  <td>
                    <img src="./frontend/image/user2.jpg" />
                    <p>{value.fullname}</p>
                  </td>
                  <td>01-11-2022</td>
                  <td>
                    <box-icon
                      name="edit-alt"
                      style={{ marginRight: "10px" }}
                      id={value.id}
                      onClick={idEditUser1}
                    ></box-icon>
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
        } else if (value.fullname.includes(getSearch)) {
          return (
            <>
              <tbody>
                <tr>
                  <td>
                    <img src="./frontend/image/user2.jpg" />
                    <p>{value.fullname}</p>
                  </td>
                  <td>01-11-2022</td>
                  <td>
                    <Link to="/admin&Update-user">
                      <box-icon
                        name="edit-alt"
                        style={{ marginRight: "10px" }}
                        id={value.id}
                        onClick={idEditUser1}
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
      });
    }
  }
  function Table_Update() {
    return (
      <form className="Update_User" onSubmit={handleSubmit}>
        <div className="auth-form__group">
          <h2>UPDATE USER</h2>
          <p className="uconfirm" />
        </div>

        <div className="auth-form__group">
          <input
            name="id"
            type="text"
            value={inputs.id}
            onChange={handleInput}
          />
        </div>
        <div className="auth-form__group">
          <input
            name="fullname"
            type="text"
            value={inputs.fullname}
            onChange={handleInput}
          />
          <p className="uconfirm" />
        </div>
        <div className="auth-form__group">
          <input
            name="email"
            type="text"
            value={inputs.email}
            onChange={handleInput}
            readOnly
          />
          <p className="uconfirm" />
        </div>
        <div className="auth-form__group">
          <input
            name="username"
            type="text"
            value={inputs.username}
            onChange={handleInput}
          />
          <p className="uconfirm" />
        </div>

        <div className="auth-form__group">
          <input
            name="numberphone"
            type="number"
            value={inputs.numberphone}
            onChange={handleInput}
          />
          <p className="uconfirm" />
        </div>
        <div className="auth-form__group">
          <select value={inputs.roleId}>
            <option value="">Chọn Phân quyền</option>
            <option value="R1">Admin</option>
            <option value="R2">Seeker</option>
            <option value="R3">Employer</option>
          </select>
          <p className="uconfirm" />
        </div>
        <div>
          <button type="submit" className="btn btn--primary ">
            Update
          </button>
        </div>
      </form>
    );
  }
  function Logout() {
    localStorage.removeItem("login");
    navigate("/login");
  }
  return (
    <>
      <section id="sidebar">
        <Link to="/admin" className="brand">
          <i className="bx bxs-smile" />
          <span className="text">Admin TJOB</span>
        </Link>
        <ul className="side-menu top">
          <li className="active">
            <a href="#">
              <i className="bx bxs-dashboard" />
              <span className="text">Dashboard</span>
            </a>
          </li>
          <li>
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
          </li>
        </ul>
        tao dang ban
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
        <main>
          <nav>
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
          </nav>
          <div className="table-data">
            <div className="order">
              <div className="head">
                <h3>Recent Orders</h3>
                {/* <input type="search" placeholder="Search Member" />
                  <i className="bx bx-search" /> */}
                <div className="form-input">
                  <input
                    name="search"
                    type="text"
                    placeholder="Search Member"
                    onChange={handleInput}
                    // onChange={(e) => setSearch(e.target.value)}
                  />

                  <button
                    type="submit"
                    className="search-btn"
                    onClick={() => setShow(false)}
                  >
                    <i
                      className="bx bx-search"
                      id={inputs.search}
                      onClick={abc}
                      // onClick={(e) => setSearch(inputs.search)}
                    />
                  </button>
                </div>
                <i className="bx bx-filter" />
              </div>
              <table>
                <thead>
                  <tr>
                    <th>User</th>
                    <th>Date Order</th>
                    <th>Status</th>
                  </tr>
                </thead>

                {!show ? <>{showUser()}</> : null}
                {/* {!show ? <>Heloo</> : null} */}
              </table>
            </div>
            {Table_Update()}
          </div>
        </main>
      </section>
    </>
  );
}
export default AdminUpdateUser;
