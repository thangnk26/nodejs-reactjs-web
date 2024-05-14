import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";

function Verify() {
  const [inputs, setInputs] = useState("");
  const [token] = useSearchParams();
  //   const { Job_id } = useParams();
  useEffect(() => {
    let token1 = token.get("token");
    let job_id = token.get("job_id");
    console.log(token1);
    // console.log(job_id);
    // axios
    //   .get("http://localhost:8085/api/get-status-apply?statusId=s1")
    //   .then((res) => {
    //     console.log(res.data);
    //   });
    const data = {
      job_id: job_id,
      token: token1,
    };
    axios
      .post("http://localhost:8085/api/verify-application", data)
      .then((res) => {
        console.log(res.data);
        setInputs(res.data);
      });
  }, []);
  function renderNotification() {
    if (inputs.errCode == 0 || inputs.errCode == 2) {
      return (
        <>
          <p>
            Thông tin của bạn đã được kiểm duyệt! Cảm ơn bạn đã ứng tuyển vào
            công ty chúng tôi.
          </p>
          <p>Kết quả xét tuyển sẽ được thông báo trong thời gian sớm nhất</p>
          <p>Mọi thắc mắc xin liên hệ anh Thắng - Trưởng phòng nhân sự</p>
          <p>SĐT: 0123456789</p>
        </>
      );
    }
  }
  return (
    <>
      <div class="container">
        <div class="verify">{renderNotification()}</div>
      </div>
    </>
  );
}
export default Verify;
