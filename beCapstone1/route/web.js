import express, { Router } from "express";
import userController from "../controllers/userController";
let router = express.Router();
// tất cả các route được viết ở đây
let initWebRoutes = (app) => {
  router.get("/", (req, res) => {
    return res.send("hello world");
  });

  router.get("/api/get-all-users", userController.handleGetAllUsers);
  router.get("/api/get-all-member", userController.handleGetAllMember); // khong co admin
  router.get("/api/get-all-seeker", userController.getAllSeeker); // chi co seeker
  router.get("/api/get-cv-seekerByUser", userController.getCvUser); // lấy cv theo id seeker
  router.get("/api/get-cv", userController.getCv); // lấy tất cả CV
  router.get("/api/get-job-byJob", userController.handleGetJobById); // tìm seeker theo job
  router.get("/api/get-job", userController.getJobById); // tìm job theo doanh nghiệp
  router.get("/api/get-job-byIdJob", userController.getJobByIdJob); // tìm job theo id của job
  router.get("/api/get-all-job", userController.getAllJob);
  router.get("/api/get-status-apply", userController.handleStatus);
  router.get("/api/get-list-seeker-for-job", userController.handleGetJobById); // danh sách member đã ứng tuyển job
  router.get("/api/allcodetype", userController.getAllCodeType);
  router.get("/api/allcode", userController.getAllcode);
  router.get("/api/get-schedule-date", userController.getScheduleDate);
  router.get("/api/get-schedule-id", userController.getScheduleId);

  router.delete("/api/delete-user", userController.handleDeleteUser);
  router.delete("/api/delete-job", userController.handleDeleteJob);
  router.delete("/api/delete-cv", userController.handleDeleteCv);
  router.delete("/api/delete-Schedule", userController.handleDeleteSchedule);

  router.put("/api/edit-user", userController.handleEditUser);
  router.put("/api/edit-job", userController.handleEditJob);
  router.put("/api/edit-seekerCv", userController.handleEditSeekerCv);
  router.put("/api/edit-bulkSchedule", userController.updateBulkSchedule);

  router.post("/api/login", userController.handleLogin);
  router.post("/api/create-new-user", userController.handleCreateNewUser);
  router.post("/api/save-cv-seeker", userController.postCvSeeker);
  router.post("/api/post-job", userController.handlePostJob);
  router.post("/api/bulk-create-schedule", userController.handleSchedule);
  router.post("/api/postApplication", userController.handleApplication);
  router.post("/api/verify-application", userController.handleVerify);
  router.post("/api/send-accept", userController.handleAccept);

  // viết theo chuẩn rest api
  return app.use("/", router);
};
module.exports = initWebRoutes;
