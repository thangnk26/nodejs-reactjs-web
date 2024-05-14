import db from "../models/index";
import CRUDService from "../services/CRUDService";

let getUserPage = async (req, res) => {
  try {
    let data = await db.user.findAll();
    console.log("---------");
    console.log(data);
  } catch (e) {
    console.log(e);
  }

  return res.render(data);
};
