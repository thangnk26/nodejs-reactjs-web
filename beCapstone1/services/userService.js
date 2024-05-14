import db from "../models/index";
import bcrypt from "bcryptjs";
import _, { reject } from "lodash";
import emailService from "./emailService";
import { v4 as uuidv4 } from "uuid";
require("dotenv").config();
const salt = bcrypt.genSaltSync(10);
const { Op, where } = require("sequelize");

let hashUserPassword = (password) => {
  return new Promise(async (resolve, reject) => {
    try {
      // var hashPassword = await bcrypt.hashSync("B4c0//", salt);
      var hashPassword = await bcrypt.hashSync(password, salt);
      resolve(hashPassword);
    } catch (e) {
      reject(e);
    }
  });
};

let handleUserLogin = (email, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let userData = {};
      let isExit = await checkUserEmail(email);
      if (isExit) {
        let user = await db.User.findOne({
          attributes: [
            "id",
            "email",
            "roleId",
            "password",
            "username",
            "fullname",
            "id",
            "numberphone",
          ],
          where: { email: email },
          raw: true,
        });
        if (user) {
          let check = await bcrypt.compareSync(password, user.password);

          if (check) {
            userData.errCode = 0;
            userData.errMessage = "Ok";
            delete user.password;
            userData.user = user;
          } else {
            userData.errCode = 3;
            userData.errMessage = "Password or username is incorrect";
          }
        } else {
          userData.errCode = 2;
          userData.errMessage = "User's not found ";
        }
      } else {
        userData.errCode = 1;
        userData.errMessage = "Email not found ";
      }
      resolve(userData);
    } catch (e) {
      reject(e);
    }
  });
};

let checkUserEmail = (userEmail) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { email: userEmail },
      });
      if (user) {
        resolve(true);
      } else {
        resolve(false);
      }
    } catch (e) {
      reject(e);
    }
  });
};

let getAllUsers = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let users = "";
      if (userId === "ALL") {
        users = await db.User.findAll({
          attributes: {
            exclude: ["password"],
          },
        });
      }
      if (userId && userId !== "ALL") {
        users = await db.User.findOne({
          where: { id: userId },
          attributes: {
            exclude: ["password"],
          },
        });
      }
      resolve(users);
    } catch (e) {
      reject(e);
    }
  });
};

let createNewUser = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let check = await checkUserEmail(data.email);
      if (check === true) {
        resolve({
          errCode: 1,
          message: "Your email is  already in used",
        });
      }
      let hashPasswordFromBcrypt = await hashUserPassword(data.password);
      await db.User.create({
        fullname: data.fullname,
        email: data.email,
        username: data.username,
        password: hashPasswordFromBcrypt,
        numberphone: data.numberphone,
        roleId: data.roleId,
      });
      resolve({
        errCode: 0,
        errMessage: "OK",
      });
    } catch (e) {
      reject(e);
    }
  });
};
let deleteUser = (userId) => {
  return new Promise(async (resolve, reject) => {
    let foundUser = await db.User.findOne({
      where: { id: userId },
    });

    if (!foundUser) {
      resolve({
        errCode: 2,
        errMessage: "the user isn't exist",
      });
    }
    // if (foundUser) {
    //   await foundUser.destroy();
    // }
    // thao tac duoi db kh bi ep kieu raw:true
    await db.User.destroy({
      where: { id: userId },
    });
    resolve({
      errCode: 0,
      errMessage: "the user is delete",
    });
  });
};
let updateUserData = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id) {
        resolve({
          errCode: 2,
          errMessage: "Missing required parameters",
        });
      }
      let user = await db.User.findOne({
        where: { id: data.id },
        raw: false,
      });
      if (user) {
        user.fullname = data.fullname;
        user.username = data.username;
        user.numberphone = data.numberphone;
        await user.save();
        resolve({
          errCode: 0,
          message: "update the user success!",
        });
      } else {
        resolve({
          errCode: 1,
          message: "User's not found",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};
let getAllCodeService = (type) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!type) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameters",
        });
      } else {
        let res = {};
        let allcode = await db.Allcode.findAll({
          where: { type: type },
          exclude: [
            { model: db.Allcode, attributes: ["createAt", "updateAt"] },
          ],
        });
        res.errCode = 0;
        res.data = allcode;
        resolve(res);
      }
    } catch (e) {
      reject(e);
    }
  });
};

let getAllSeeker = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let seekers = await db.User.findAll({
        where: { roleId: "R2" },
        attributes: {
          exclude: ["password"],
        },
      });

      resolve({
        errCode: 0,
        data: seekers,
      });
    } catch (e) {
      reject(e);
    }
  });
};

let saveCvSeeker = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data) {
        resolve({
          errCode: 1,
          errMessage: "Missing parameters",
        });
      } else {
        await db.Applicant.create({
          cv_name: data.cv_name,
          seeker_id: data.seeker_id,
          address: data.address,
          birthday: data.birthday,
          gender: data.gender,
          education: data.education,
          certication: data.certication,
          experience: data.experience,
          skills: data.skills,
          career: data.career,
        });
      }
      resolve({
        errCode: 0,
        errMessage: "Save CV success",
      });
    } catch (e) {
      reject(e);
    }
  });
};

let getAllcodedt = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let allcode = await db.Allcode.findAll({
        // include: [
        //   {
        //     model: db.Job,
        //   },
        // ],
        raw: true,
        nest: true,
      });

      resolve({
        errCode: 0,
        data: allcode,
      });
    } catch (e) {
      reject(e);
    }
  });
};
let savePostJob = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data) {
        resolve({
          errCode: 1,
          errMessage: "Missing parameters",
        });
      } else {
        await db.Job.create({
          company: data.company,
          title: data.title,
          description: data.description,
          jobCategory_id: data.jobCategory_id,
          location_id: data.location_id,
          employer_id: data.employer_id,
          job_type: data.job_type,
          job_salary: data.job_salary,
          job_skill: data.job_skill,
          job_requirement: data.job_requirement,
          job_position: data.job_position,
          job_start_date: data.job_start_date,
          job_finish_date: data.job_finish_date,
          job_expiration_date: data.job_expiration_date,
          job_shift: data.job_shift,
          quality: data.quality,
          job_status: data.job_status,
        });
      }
      resolve({
        errCode: 0,
        errMessage: "Save job success",
      });
    } catch (e) {
      reject(e);
    }
  });
};

let getJobId = (inputId) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!inputId) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameters",
        });
      } else {
        let res = {};
        let allcode = await db.Job.findAll({
          where: { employer_id: inputId },
          attributes: {
            exclude: ["location_id", "job_type", "job_shift"],
          },
          include: [
            {
              model: db.Allcode,
              as: "locationData",
              attributes: ["value"],
            },
            {
              model: db.Allcode,
              as: "jobtypeData",
              attributes: ["value"],
            },
            {
              model: db.Allcode,
              as: "jobshiftData",
              attributes: ["value"],
            },
          ],
          raw: true,
          nest: true,
        });
        res.errCode = 0;
        res.data = allcode;
        resolve(res);
      }
    } catch (e) {
      reject(e);
    }
  });
};

let getAllJobService = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let alljob = await db.Job.findAll({
        attributes: {
          exclude: ["location_id", "job_type", "job_shift"],
        },
        include: [
          {
            model: db.Allcode,
            as: "locationData",
            attributes: ["value"],
          },
          {
            model: db.Allcode,
            as: "jobtypeData",
            attributes: ["value"],
          },
          {
            model: db.Allcode,
            as: "jobshiftData",
            attributes: ["value"],
          },
        ],
        raw: true,
        nest: true,
      });

      resolve({
        errCode: 0,
        data: alljob,
      });
    } catch (e) {
      reject(e);
    }
  });
};
let bulkCreateSchedule = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.arrSchedule) {
        resolve({
          errCode: 1,
          errMessage: "Missing parameter param!",
        });
      } else {
        let schedule = data.arrSchedule;
        if (schedule && schedule.length > 0) {
          schedule = schedule.map((item) => {
            return item;
          });
        }

        let existing = await db.Schedule.findAll({
          where: {
            employer_id: data.arrSchedule[0]["employer_id"],
            date: data.arrSchedule[0]["date"],
          },

          // attributes: ["timeType", "date", "employer_id", "currentNumber"],
          attributes: ["id", "employer_id", "timeType", "date", "jobTitle"],
          raw: true,
        });
        if (existing && existing.length > 0) {
          existing = existing.map((item) => {
            return item;
          });
        }

        let toCreate = _.differenceWith(schedule, existing, (a, b) => {
          return a.timeType == b.timeType && a.jobTitle == b.jobTitle;
        });
        if (toCreate && toCreate.length > 0) {
          await db.Schedule.bulkCreate(toCreate);
        }
        resolve({
          errCode: 0,
          errMessage: "OK",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let getScheduleByDate = (employer_id, date) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!employer_id || !date) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameters",
        });
      } else {
        let schedule = await db.Schedule.findAll({
          where: {
            employer_id: employer_id,
            date: date,
          },
          include: [
            {
              model: db.Allcode,
              as: "timeTypeData",
              attributes: ["value"],
            },
            {
              model: db.User,
              as: "employerData",
              attributes: ["fullname"],
            },
          ],
          raw: false,
          nest: true,
        });

        if (!schedule) schedule = [];
        resolve({
          errCode: 0,
          data: schedule,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let getScheduleById = (employer_id) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!employer_id) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameters",
        });
      } else {
        let schedule = await db.Schedule.findAll({
          where: {
            employer_id: employer_id,
          },
          include: [
            {
              model: db.Allcode,
              as: "timeTypeData",
              attributes: ["value"],
            },
            {
              model: db.User,
              as: "employerData",
              attributes: ["fullname"],
            },
          ],
          raw: false,
          nest: true,
        });
        if (!schedule) schedule = [];
        resolve({
          errCode: 0,
          data: schedule,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};
let buildUrlEmail = (job_id, token) => {
  let result = `${process.env.URL_REACT}/verify-application?token=${token}&job_id=${job_id}`;
  // let id = uuidv4();
  return result;
};
let postApplicationById = (data) => {
  return new Promise(async (resolve, reject) => {
    console.log("data1", data);
    try {
      if (!data.email || !data.job_id || !data.date) {
        resolve({
          errCode: 1,
          errMessage: "Missing parameter",
        });
      } else {
        let token = uuidv4();
        await emailService.sendSimpleEmail({
          reciverEmail: data.email,
          seekerName: data.seekerName,
          time: data.date,
          companyName: data.companyName,
          redirectLink: buildUrlEmail(data.job_id, token),
        });

        let user = await db.User.findOne({
          where: { email: data.email },
        });
        if (user) {
          await db.ApplicationDetail.findOrCreate({
            where: {
              job_id: data.job_id,
              [Op.and]: [
                { timeType: data.timeType },
                { seekerApply_id: user.id },
              ],
            },
            defaults: {
              statusId: "S1",
              seeker_id: user.id,
              seekerApply_id: data.seekerApply_id,
              job_id: data.job_id,
              date: data.date,
              timeType: data.timeType,
              token: token,
            },
          });
        }
        resolve({
          errCode: 0,
          errMessage: "Save booking success",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let postVerifyApplication = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.job_id || !data.token) {
        resolve({
          errCode: 1,
          errMessage: "Missing parameter",
        });
      } else {
        let appointment = await db.ApplicationDetail.findOne({
          where: {
            job_id: data.job_id,
            token: data.token,
            statusId: "S1",
          },
          raw: false,
        });

        if (appointment) {
          appointment.statusId = "S2";
          await appointment.save();
          resolve({
            errCode: 0,
            errMessage: "Update application success!",
          });
        } else {
          resolve({
            errCode: 2,
            errMessage: "the calendar has been activated or does not exist!",
          });
        }
      }
    } catch (e) {
      reject(e);
    }
  });
};
let getListSeekerJob = (job_id, date) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.job_id || !date) {
        resolve({
          errCode: 1,
          errMessage: "Missing parameter",
        });
      } else {
        let data = await db.ApplicationDetail.findAll({
          where: {
            statusId: "S2",
            job_id: job_id,
            date: date,
          },
          include: [
            {
              model: db.User,
              as: "seekerData",
              attributes: ["email", "fullname", "numberphone"],
            },
            {
              model: db.Allcode,
              as: "timeTypeDataApply",
              attributes: ["value"],
            },
          ],
          raw: false,
          nest: true,
        });
        resolve({
          errCode: 0,
          data: data,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};
let postSendAccept = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (
        !data.email ||
        !data.job_id ||
        !data.seekerApply_id ||
        !data.timeType
      ) {
        resolve({
          errCode: 1,
          errMessage: "Missing parameter",
        });
      } else {
        let appointment = await db.ApplicationDetail.findOne({
          where: {
            job_id: data.job_id,
            seekerApply_id: data.seekerApply_id,
            timeType: data.timeType,

            // statusId: "S2",
          },
          raw: false,
        });

        if (appointment) {
          appointment.statusId = "S3";
          await appointment.save();
        }

        await emailService.sendAttachment(data);
        resolve({
          errCode: 0,
          errMessage: "ok",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};
let getSeekerByJob = (jobId) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!jobId) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameters",
        });
      } else {
        let res = {};
        let allseekerinJob = await db.ApplicationDetail.findAll({
          where: { job_id: jobId },
          attributes: ["statusId", "date", "timeType", "job_id", "seeker_id"],

          include: [
            {
              model: db.Applicant,
              as: "seekerApplyData",
              attributes: [
                "id",
                "address",
                "birthday",
                "gender",
                "education",
                "certication",
                "experience",
                "skills",
                "career",
              ],
            },
            {
              model: db.User,
              as: "seekerData",
              attributes: ["fullname", "email", "numberphone"],
            },
          ],
          raw: true,
          nest: true,
        });

        res.errCode = 0;
        res.data = allseekerinJob;
        resolve(res);
      }
    } catch (e) {
      reject(e);
    }
  });
};
let getCvByUser = (seekerId) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!seekerId) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameters",
        });
      } else {
        let res = {};
        let allCvUser = await db.Applicant.findAll({
          where: { seeker_id: seekerId },
          raw: true,
          nest: true,
        });

        res.errCode = 0;
        res.data = allCvUser;
        resolve(res);
      }
    } catch (e) {
      reject(e);
    }
  });
};
let handleJobByIdJob = (inputId) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!inputId) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameters",
        });
      } else {
        let res = {};
        let allcode = await db.Job.findOne({
          where: { id: inputId },
          attributes: {
            exclude: ["location_id", "job_type", "job_shift"],
          },
          include: [
            {
              model: db.Allcode,
              as: "locationData",
              attributes: ["value"],
            },
            {
              model: db.Allcode,
              as: "jobtypeData",
              attributes: ["value"],
            },
            {
              model: db.Allcode,
              as: "jobshiftData",
              attributes: ["value"],
            },
          ],
          raw: true,
          nest: true,
        });
        res.errCode = 0;
        res.data = allcode;
        resolve(res);
      }
    } catch (e) {
      reject(e);
    }
  });
};

let getStatusApply = (statusId) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!statusId) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameters",
        });
      } else {
        let res = {};
        let allCvUser = await db.ApplicationDetail.findAll({
          where: { statusId: statusId },

          raw: true,
          nest: true,
        });
        res.errCode = 0;
        res.data = allCvUser;
        resolve(res);
      }
    } catch (e) {
      reject(e);
    }
  });
};
let getAllMember = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let member = await db.User.findAll({
        where: { [Op.or]: [{ roleId: "R2" }, { roleId: "R3" }] },
        attributes: {
          exclude: ["password"],
        },
      });

      resolve({
        errCode: 0,
        data: member,
      });
    } catch (e) {
      reject(e);
    }
  });
};
let getAllCv = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let member = await db.Applicant.findAll({});
      resolve({
        errCode: 0,
        data: member,
      });
    } catch (e) {
      reject(e);
    }
  });
};
let updateJobData = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.employer_id || !data.id) {
        resolve({
          errCode: 2,
          errMessage: "Missing required parameters",
        });
      }
      let job = await db.Job.findOne({
        where: { id: data.id, employer_id: data.employer_id },
        raw: false,
      });
      if (job) {
        job.company = data.company;
        job.title = data.title;
        job.description = data.description;
        job.jobCategory_id = data.jobCategory_id;
        job.location_id = data.location_id;
        job.job_type = data.job_type;
        job.job_salary = data.job_salary;
        job.job_skill = data.job_skill;
        job.job_requirement = data.job_requirement;
        job.job_position = data.job_position;
        job.job_start_date = data.job_start_date;
        job.job_finish_date = data.job_finish_date;
        job.job_expiration_date = data.job_expiration_date;
        job.job_shift = data.job_shift;
        job.quality = data.quality;
        job.job_status = data.job_status;
        await job.save();
        resolve({
          errCode: 0,
          message: "Update the Job success!",
        });
      } else {
        resolve({
          errCode: 1,
          message: "Job not found",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};
let updateSchedule = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.arrSchedule) {
        resolve({
          errCode: 2,
          errMessage: "Missing required parameters",
        });
      }
      let update = data.arrSchedule;
      let existing = await db.Schedule.findAll({
        where: {
          employer_id: data.arrSchedule[0]["employer_id"],
          date: data.arrSchedule[0]["date"],
        },

        // attributes: ["timeType", "date", "employer_id", "currentNumber"],
        attributes: ["employer_id", "timeType", "date", "jobTitle"],
        raw: true,
      });
      if (existing) {
        await db.Schedule.bulkCreate(existing).then(() => {
          return db.Schedule.update(
            { update: "timeType" },
            { where: { update: "id" } }
          );
        });

        resolve({
          errCode: 0,
          message: "Update the Schedule success!",
        });
      } else {
        resolve({
          errCode: 1,
          message: "Job not found",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};
let updateSeekerCvData = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.seeker_id || !data.career) {
        resolve({
          errCode: 2,
          errMessage: "Missing required parameters",
        });
      }
      let cv = await db.Applicant.findOne({
        where: { seeker_id: data.seeker_id, career: data.career },
        raw: false,
      });
      if (cv) {
        (cv.seeker_id = data.seeker_id),
          (cv.address = data.address),
          (cv.birthday = data.birthday),
          (cv.gender = data.gender),
          (cv.education = data.education),
          (cv.certication = data.certication),
          (cv.experience = data.experience),
          (cv.skills = data.skills),
          (cv.career = data.career),
          await cv.save();
        resolve({
          errCode: 0,
          message: "update the user success!",
        });
      } else {
        resolve({
          errCode: 1,
          message: "User's not found",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};
let deleteJob = (jobId) => {
  return new Promise(async (resolve, reject) => {
    let foundJob = await db.Job.findOne({
      where: { id: jobId },
    });

    if (!foundJob) {
      resolve({
        errCode: 2,
        errMessage: "the job isn't exist",
      });
    }
    await db.Job.destroy({
      where: { id: jobId },
    });
    resolve({
      errCode: 0,
      errMessage: "the job is delete",
    });
  });
};
let deleteSchedule = (data) => {
  return new Promise(async (resolve, reject) => {
    let dele = data;
    console.log(dele);
    let foundSchedule = await db.Schedule.findAll({
      where: { id: dele },
    });
    console.log("found", foundSchedule[0].id);
    let x = foundSchedule[0].id;
    if (!foundSchedule) {
      resolve({
        errCode: 2,
        errMessage: "the job isn't exist",
      });
    } else {
      console.log("true");
      await db.Schedule.destroy({
        where: { id: x },
      });
    }
    resolve({
      errCode: 0,
      errMessage: "the job is delete",
    });
  });
};
let deleteCV = (applicantId) => {
  return new Promise(async (resolve, reject) => {
    let foundCv = await db.Applicant.findOne({
      where: { id: applicantId },
    });

    if (!foundCv) {
      resolve({
        errCode: 2,
        errMessage: "the cv isn't exist",
      });
    }
    await db.Applicant.destroy({
      where: { id: applicantId },
    });
    resolve({
      errCode: 0,
      errMessage: "the user is delete",
    });
  });
};
module.exports = {
  handleUserLogin: handleUserLogin,
  getAllUsers: getAllUsers,
  createNewUser: createNewUser,
  deleteUser: deleteUser,
  updateUserData: updateUserData,
  getAllCodeService: getAllCodeService,
  getAllSeeker: getAllSeeker,
  saveCvSeeker: saveCvSeeker,
  getAllcodedt: getAllcodedt,
  savePostJob: savePostJob,
  getJobId: getJobId,
  getAllJobService: getAllJobService,
  bulkCreateSchedule: bulkCreateSchedule,
  getScheduleByDate: getScheduleByDate,
  postApplicationById: postApplicationById,
  postVerifyApplication: postVerifyApplication,
  getListSeekerJob: getListSeekerJob,
  postSendAccept: postSendAccept,
  getScheduleById: getScheduleById,
  getSeekerByJob: getSeekerByJob,
  getCvByUser: getCvByUser,
  handleJobByIdJob: handleJobByIdJob,
  getStatusApply: getStatusApply,
  getAllMember: getAllMember,
  getAllCv: getAllCv,
  updateJobData: updateJobData,
  updateSeekerCvData: updateSeekerCvData,
  deleteJob: deleteJob,
  deleteCV: deleteCV,
  updateSchedule: updateSchedule,
  deleteSchedule: deleteSchedule,
};
