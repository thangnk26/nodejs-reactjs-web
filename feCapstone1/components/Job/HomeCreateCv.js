import { useEffect, useState } from "react";
import { json, Link } from "react-router-dom";
import Error from "../Authen/Error";
import Hearder from "../Header/Header";
import axios from "axios";

function HomeCreateCv() {
  const [inputs, setInputs] = useState("");
  useEffect(() => {
    var dataUser = localStorage.getItem("user");
    dataUser = JSON.parse(dataUser);
    console.log(dataUser);
    setInputs(dataUser);
  }, []);
  return (
    <>
      <>
        <div className="container">
          <div className="search w-100 d-flex">
            <input
              className="w-100 form-control"
              type="search"
              placeholder="Search Job"
            />
            <button className="search-icon d-block">
              <i class="fa-solid fa-magnifying-glass"></i>
            </button>
          </div>
          <section className="pagecv">
            <div className="content">
              <img src="./frontend/image/gpo-cach-gui-email-va-viet-cv-xin-viec-danh-cho-sinh-vien-7.png" />

              <div className="creat_cv">
                <h1>Post CV Online Free</h1>

                <div className="button_create_cv">
                  <Link to="/createcv">
                    <button className="btn btn-primary">Create Your CV</button>
                  </Link>
                </div>
              </div>
            </div>
          </section>
          <div className="homejob">
            <div className="item1">
              <ul className="job1">
                <li className="job_content1">
                  <div className="job_img1">
                    <img src="https://www.findjobs.vn/htdocs/thumbs/hotimages/294x166x0-6017f3cdb429f_1.png" />
                  </div>
                  <div className="job_text1">
                    <h2>Nhân viên Tư vấn (Làm việc từ Thứ 2 đến Thứ 6)</h2>
                    <a href="">
                      CÔNG TY CỔ PHẦN ĐẦU TƯ PHÁT TRIỂN GIÁO DỤC TOPPION
                    </a>
                    <p>
                      Telesales cho khách hàng để chào bán sản phẩm / dịch vụ
                      của công ty; Lập kế hoạch và thực hiện chỉ tiêu kinh doanh
                      được giao; Lập kế hoạch...
                    </p>
                  </div>
                  <div className="nav">
                    <div className="left">332 viewed</div>
                    <a href="" className="more">
                      View more
                    </a>
                  </div>
                </li>
                <li className="job_content1">
                  <div className="job_img1">
                    <img src="https://www.findjobs.vn/htdocs/thumbs/hotimages/294x166x0-new_7.jpg" />
                  </div>
                  <div className="job_text1">
                    <h2>Giám Sát Kinh Doanh</h2>
                    <a href="">Findjobs.vn 's Clients</a>
                    <p>
                      1. Mô tả chung: Sale Manager chịu trách nhiệm chính trong
                      việc phát triển: + Kênh MT với các khách hàng siêu thị tại
                      Việt Nam: doanh số, trưng bày,...
                    </p>
                  </div>
                  <div className="nav">
                    <div className="left">332 viewed</div>
                    <a href="" className="more">
                      View more
                    </a>
                  </div>
                </li>
                <li className="job_content1">
                  <div className="job_img1">
                    <img src="https://www.findjobs.vn/htdocs/thumbs/hotimages/294x166x0-pharma4.png" />
                  </div>
                  <div className="job_text">
                    <h2>Dược Sĩ Bán Hàng</h2>
                    <a href="">Findjobs.vn 's Clients</a>
                    <p>
                      Tư vấn, bán thuốc theo toa Bác sĩ - Tư vấn, hướng dẫn
                      Khách dùng thuốc đúng liều, đúng cách. - Kiểm tra thuốc kỹ
                      trước khi giao...
                    </p>
                  </div>
                  <div className="nav">
                    <div className="left">332 viewed</div>
                    <a href="" className="more">
                      View more
                    </a>
                  </div>
                </li>
              </ul>
              <ul className="job1">
                <li className="job_content1">
                  <div className="job_img1">
                    <img src="https://www.findjobs.vn/htdocs/thumbs/hotimages/294x166x0-cs.png" />
                  </div>
                  <div className="job_text">
                    <h2>Brand Marketing Executive</h2>
                    <a href="">CÔNG TY CỔ PHẦN HASAKI BEAUTY &amp; SPA</a>
                    <p>
                      * Quản lý giá bán sản phẩm (inside): - Set giá bán sản
                      phẩm theo các chương trình khuyến mãi - Gia hạn deal đang
                      chạy - Set giá bán sản phẩm hàng...
                    </p>
                  </div>
                  <div className="nav">
                    <div className="left">332 viewed</div>
                    <a href="" className="more">
                      View more
                    </a>
                  </div>
                </li>
                <li className="job_content1">
                  <div className="job_img1">
                    <img src="https://www.findjobs.vn/htdocs/thumbs/hotimages/294x166x0-saleswomen2png.png" />
                  </div>
                  <div className="job_text">
                    <h2>[HCM] - Nhân Viên Tư Vấn/Bán Hàng</h2>
                    <a href="">CÔNG TY CỔ PHẦN HASAKI BEAUTY &amp; SPA</a>
                    <p>
                      Giờ làm việc: - Xoay ca ( Đảm bảo làm ít nhất 4 ngày ca
                      tối/ tuần ) + Ca 1: 8h00 - 16h00 + Ca 2: 14h00 - 22h00 Mô
                      tả công việc + Giới thiệu,...
                    </p>
                  </div>
                  <div className="nav">
                    <div className="left">332 viewed</div>
                    <a href="" className="more">
                      View more
                    </a>
                  </div>
                </li>
                <li className="job_content1">
                  <div className="job_img1">
                    <img src="https://www.findjobs.vn/htdocs/thumbs/hotimages/294x166x0-55c86d60cbc27_new_8.jpg" />
                  </div>
                  <div className="job_text">
                    <h2>Thực tập sinh Kinh Doanh</h2>
                    <a href="">RESO Group</a>
                    <p>
                      Tìm hiểu nhu cầu tuyển dụng của khách hàng Hỗ trợ khách
                      hàng sử dụng dịch vụ tuyển dụng online Giúp khách hàng
                      hiểu dịch vụ tuyển dụng...
                    </p>
                  </div>
                  <div className="nav">
                    <div className="left">332 viewed</div>
                    <a href="" className="more">
                      View more
                    </a>
                  </div>
                </li>
              </ul>
              <ul className="job1">
                <li className="job_content1">
                  <div className="job_img1">
                    <img src="https://www.findjobs.vn/htdocs/thumbs/hotimages/294x166x0-cs4.png" />
                  </div>
                  <div className="job_text">
                    <h2>Credit Admin Officer</h2>
                    <a href="">FindTalent's Clients</a>
                    <p>
                      Drafting the rental contract; Check disbursement records;
                      Check and input data into the company's management system;
                      Scan and photocopy files and...
                    </p>
                  </div>
                  <div className="nav">
                    <div className="left">332 viewed</div>
                    <a href="" className="more">
                      View more
                    </a>
                  </div>
                </li>
                <li className="job_content1">
                  <div className="job_img1">
                    <img src="https://www.findjobs.vn/htdocs/thumbs/hotimages/294x166x0-60668034b11f4_construction.png" />
                  </div>
                  <div className="job_text">
                    <h2>QA Assistant Manager</h2>
                    <a href="">FindTalent's Clients</a>
                    <p>
                      1. Main Purpose: Assist QA Manager to build the quality
                      management system following BRC/ FSMA …. and apply
                      activities control, maintain...
                    </p>
                  </div>
                  <div className="nav">
                    <div className="left">332 viewed</div>
                    <a href="" className="more">
                      View more
                    </a>
                  </div>
                </li>
                <li className="job_content1">
                  <div className="job_img1">
                    <img src="https://www.findjobs.vn/htdocs/thumbs/hotimages/294x166x0-new_6.jpg" />
                  </div>
                  <div className="job_text">
                    <h2>Finance &amp; Accounting Manager</h2>
                    <a href="">FindTalent's Clients</a>
                    <p>
                      As a key member of the Executive Management team, the
                      Finance &amp; Accounting Manager will report to the
                      General Director and assume a strategic...
                    </p>
                  </div>
                  <div className="nav">
                    <div className="left">332 viewed</div>
                    <a href="" className="more">
                      View more
                    </a>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </>
    </>
  );
}
export default HomeCreateCv;
