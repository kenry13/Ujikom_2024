import { body } from "express-validator";
import { checkValidate } from "../midleware/check.js";
import Komentar from "../models/KomentarModel.js";

export const ValidateKomentar = [
  body("isi_komentar").notEmpty().withMessage("Komentar kosong"),
  body("foto_id").notEmpty().withMessage("Foto kosong"),
  checkValidate,
];

export const ValidateUpadateKomentar = [
  body("isi_komentar").notEmpty().withMessage("Komentar kosong"),
  checkValidate,
];

export const CreateKomentar = async (req, res) => {
  try {
    const body = req.body;
    body.user_id = req.user.id_user;
    await Komentar.create(body);
    return res.json({ msg: "success" });
  } catch (error) {
    console.log(error.message);
  }
};

export const ShowKomentar = async (req, res) => {
  try {
    const id = req.params.id_komentar;
    const data = await Komentar.findOne({ where: { id_komentar: id } });
    return res.json({ msg: "success", data });
  } catch (error) {
    console.log(error.message);
  }
};

export const UpdateKomentar = async (req, res) => {
  try {
    const body = req.body;
    const id = req.params.id_komentar;
    await Komentar.update(body, { where: { id_komentar: id } });
    return res.json({ msg: "success" });
  } catch (error) {
    console.log(error.message);
  }
};

export const DeleteKomentar = async (req, res) => {
  try {
    const id = req.params.id_komentar;
    await Komentar.destroy({ where: { id_komentar: id } });
    return res.json({ msg: "success" });
  } catch (error) {
    console.log(error.message);
  }
};
