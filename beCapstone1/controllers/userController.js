import userService from "../services/userService";

let handleLogin = async (req, res) => {
  let email = req.body.email;
  let password = req.body.password;

  if (!email || !password) {
    return res.status(500).json({
      errCode: 1,
      message: "Missing inputs parameter!",
    });
  }
  let userData = await userService.handleUserLogin(email, password);
  return res.status(200).json({
    errCode: userData.errCode,
    message: userData.errMessage,
    user: userData.user ? userData.user : {},
  });
};

let handleGetAllUsers = async (req, res) => {
  let id = req.query.id;
  if (!id) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "Missing required parameters",
      users: [],
    });
  }
  let users = await userService.getAllUsers(id);
  return res.status(200).json({
    errCode: 0,
    errMessage: "ok",
    users,
  });
};

let handleCreateNewUser = async (req, res) => {
  let message = await userService.createNewUser(req.body);

  return res.status(200).json(message);
};

let handleEditUser = async (req, res) => {
  let data = req.body;
  let message = await userService.updateUserData(data);
  return res.status(200).json(message);
};

let handleDeleteUser = async (req, res) => {
  if (!req.body.id) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "Missing required parameters",
    });
  }
  let message = await userService.deleteUser(req.body.id);
  return res.status(200).json(message);
};

let getAllCodeType = async (req, res) => {
  try {
    let data = await userService.getAllCodeService(req.query.type);

    return res.status(200).json(data);
  } catch (e) {
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};

let getAllSeeker = async (req, res) => {
  try {
    let seeker = await userService.getAllSeeker();

    return res.status(200).json(seeker);
  } catch (e) {
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
let postCvSeeker = async (req, res) => {
  try {
    let response = await userService.saveCvSeeker(req.body);

    return res.status(200).json(response);
  } catch (e) {
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};

let getAllcode = async (req, res) => {
  try {
    let allcode = await userService.getAllcodedt();

    return res.status(200).json(allcode);
  } catch (e) {
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
let handlePostJob = async (req, res) => {
  try {
    let response = await userService.savePostJob(req.body);

    return res.status(200).json(response);
  } catch (e) {
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
let getJobById = async (req, res) => {
  if (!req.query.id) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "Missing required parameters",
    });
  }
  let message = await userService.getJobId(req.query.id);
  return res.status(200).json(message);
};
let getAllJob = async (req, res) => {
  try {
    let alljob = await userService.getAllJobService();

    return res.status(200).json(alljob);
  } catch (e) {
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
let handleSchedule = async (req, res) => {
  try {
    let schedule = await userService.bulkCreateSchedule(req.body);

    return res.status(200).json(schedule);
  } catch (e) {
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};

let getScheduleDate = async (req, res) => {
  try {
    let schedule = await userService.getScheduleByDate(
      req.query.employer_id,
      req.query.date
    );

    return res.status(200).json(schedule);
  } catch (e) {
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};

let getScheduleId = async (req, res) => {
  try {
    let schedule = await userService.getScheduleById(req.query.id);
    return res.status(200).json(schedule);
  } catch (e) {
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};

let handleApplication = async (req, res) => {
  try {
    let booking = await userService.postApplicationById(req.body);

    return res.status(200).json(booking);
  } catch (e) {
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};

let handleVerify = async (req, res) => {
  try {
    let booking = await userService.postVerifyApplication(req.body);

    return res.status(200).json(booking);
  } catch (e) {
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
let handleSeekerJob = async (req, res) => {
  try {
    let booking = await userService.getListSeekerJob(
      req.query.job_id,
      req.query.date
    );

    return res.status(200).json(booking);
  } catch (e) {
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};

let handleAccept = async (req, res) => {
  try {
    let accept = await userService.postSendAccept(req.body);

    return res.status(200).json(accept);
  } catch (e) {
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
let handleGetJobById = async (req, res) => {
  try {
    let job = await userService.getSeekerByJob(req.query.id);

    return res.status(200).json(job);
  } catch (e) {
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
let getCvUser = async (req, res) => {
  try {
    let cv = await userService.getCvByUser(req.query.id);

    return res.status(200).json(cv);
  } catch (e) {
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
let getJobByIdJob = async (req, res) => {
  if (!req.query.id) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "Missing required parameters",
    });
  }
  let message = await userService.handleJobByIdJob(req.query.id);
  return res.status(200).json(message);
};
let handleStatus = async (req, res) => {
  if (!req.query.statusId) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "Missing required parameters",
    });
  }
  let message = await userService.getStatusApply(req.query.statusId);
  return res.status(200).json(message);
};
let handleGetAllMember = async (req, res) => {
  try {
    let alljob = await userService.getAllMember();

    return res.status(200).json(alljob);
  } catch (e) {
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
let getCv = async (req, res) => {
  try {
    let alljob = await userService.getAllCv();

    return res.status(200).json(alljob);
  } catch (e) {
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
let handleEditJob = async (req, res) => {
  let data = req.body;
  let message = await userService.updateJobData(data);
  return res.status(200).json(message);
};
let updateBulkSchedule = async (req, res) => {
  let data = req.body;
  let message = await userService.updateSchedule(data);
  return res.status(200).json(message);
};
let handleEditSeekerCv = async (req, res) => {
  let data = req.body;
  let message = await userService.updateSeekerCvData(data);
  return res.status(200).json(message);
};
let handleDeleteJob = async (req, res) => {
  if (!req.query.id) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "Missing required parameters",
    });
  }
  let message = await userService.deleteJob(req.query.id);
  return res.status(200).json(message);
};
let handleDeleteSchedule = async (req, res) => {
  if (!req.query.id) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "Missing required parameters",
    });
  }
  let message = await userService.deleteSchedule(req.query.id);
  return res.status(200).json(message);
};
let handleDeleteCv = async (req, res) => {
  if (!req.query.id) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "Missing required parameters",
    });
  }
  let message = await userService.deleteCV(req.query.id);
  return res.status(200).json(message);
};
module.exports = {
  handleLogin: handleLogin,
  handleGetAllUsers: handleGetAllUsers,
  handleCreateNewUser: handleCreateNewUser,
  handleEditUser: handleEditUser,
  handleDeleteUser: handleDeleteUser,
  getAllCodeType: getAllCodeType,
  getAllSeeker: getAllSeeker,
  postCvSeeker: postCvSeeker,
  getAllcode: getAllcode,
  handlePostJob: handlePostJob,
  getJobById: getJobById,
  getAllJob: getAllJob,
  handleSchedule: handleSchedule,
  getScheduleDate: getScheduleDate,
  handleApplication: handleApplication,
  handleVerify: handleVerify,
  handleSeekerJob: handleSeekerJob,
  handleAccept: handleAccept,
  getScheduleId: getScheduleId,
  handleGetJobById: handleGetJobById,
  getCvUser: getCvUser,
  getJobByIdJob: getJobByIdJob,
  handleStatus: handleStatus,
  handleGetAllMember: handleGetAllMember,
  getCv: getCv,
  handleEditJob: handleEditJob,
  handleEditSeekerCv: handleEditSeekerCv,
  handleDeleteJob: handleDeleteJob,
  handleDeleteCv: handleDeleteCv,
  updateBulkSchedule: updateBulkSchedule,
  handleDeleteSchedule: handleDeleteSchedule,
};
