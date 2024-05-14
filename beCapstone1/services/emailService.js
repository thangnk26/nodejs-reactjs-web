require("dotenv").config();
import nodemailer from "nodemailer";

let sendSimpleEmail = async (dataSend) => {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_APP, // generated ethereal user
      pass: process.env.EMAIL_APP_PASSWORD, // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Kim Thang 👻" <Nguyenkimthang.26122001@gmail.com>', // sender address
    to: dataSend.reciverEmail, // list of receivers
    subject: "Thông báo xét duyệt CV ✔", // Subject line
    html: getBodyHTMLEmail(dataSend),
  });
};

let getBodyHTMLEmail = (dataSend) => {
  let result = `
  <h3>Xin chào ${dataSend.seekerName}!</h3>
  <p>Bạn đã ứng tuyển việc làm tại Tjob </p>
  <p>Thông tin ứng tuyển: </p>
  <div><b>Thời gian: ${dataSend.time}</b></div>
  <div><b>Công ty: ${dataSend.companyName}</b></div>
  <p>Nếu các thông tin trên chính xác, vui lòng nhấp vào đường link bên dưới để hoàn tất thủ tục đăng kí.</p>
  <div>
      <a href=${dataSend.redirectLink} target="_blank">Click here</a>
  </div>
  <div>Xin chân thành cảm ơn!</div>
  `;
  return result;
};

let getBodyHTMLEmailAccept = (dataSend) => {
  let result = `
    <h3>Xin chào ${dataSend.seekerName}!</h3>
    <p>Bạn đã ứng tuyển việc làm tại Tjob thành công </p>
    
    <div>Xin chân thành cảm ơn !</div>
    `;
  return result;
};

let sendAttachment = async (dataSend) => {
  return new Promise(async (resolve, reject) => {
    try {
      let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: process.env.EMAIL_APP, // generated ethereal user
          pass: process.env.EMAIL_APP_PASSWORD, // generated ethereal password
        },
      });

      // send mail with defined transport object
      let info = await transporter.sendMail({
        from: '"Kim Thang 👻" <nguyenkimthang.26122001@gmail.com>', // sender address
        to: dataSend.email, // list of receivers
        subject: "kết quả xét tuyển ✔", // Subject line
        html: getBodyHTMLEmailAccept(dataSend),
        // attachments: [
        //   {
        //     filename: `Accept-${dataSend.seeker_id}-${dataSend.seekerName}.png`,
        //     // content: dataSend.imgBase64.split("base64,")[1],
        //     encoding: "base64",
        //   },
        // ],
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};
module.exports = {
  sendSimpleEmail: sendSimpleEmail,
  sendAttachment: sendAttachment,
};
