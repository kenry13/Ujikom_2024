import { body } from "express-validator";
import { checkImage, checkValidate } from "../midleware/check.js";
import Foto from "../models/FotoModel.js";
import Komentar from "../models/KomentarModel.js";
import Like from "../models/LikeModel.js";
import User from "../models/UserModel.js";
import { Op } from "sequelize";
import fs from "fs";

export const ValidateFoto = [
  body("judul").notEmpty().withMessage("Nama kosong"),
  body("deskripsi").notEmpty().withMessage("Deskripsi kosong"),
  checkValidate,
];

const HapusFoto = (url) => {
  fs.unlinkSync(`./Public/img/${url.split("/")[url.split("/").length - 1]}`);
};

export const CreateFoto = async (req, res) => {
  try {
    const body = req.body;
    const check = checkImage(req, "foto");
    if (check.msg != "success") return res.json({ msg: check.msg });
    if (body.album_id === "0") delete body.album_id;
    body.url = check.data;
    body.user_id = req.user.id_user;
    await Foto.create(body);
    return res.json({ msg: "success" });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Failed to create Foto" });
  }
};

export const ShowAllFoto = async (req, res) => {
  try {
    const data = await Foto.findAll({
      where: { judul: { [Op.like]: `%${req.query.cari || ""}%` } },
      include: [{
        model: User,
        attributes: ['username']
      }]
    });
    return res.json({ msg: "success", data });
  } catch (error) {
    console.log(error.message);
  }
};


export const ShowByUserFoto = async (req, res) => {
  try {
    const data = await Foto.findAll({
      where: {
        user_id: req.user.id_user,
        judul: { [Op.like]: `%${req.query.cari || ""}%` },
      },
    });
    return res.json({ msg: "success", data });
  } catch (error) {
    console.log(error.message);
  }
};

export const ShowFoto = async (req, res) => {
  try {
    const id = req.params.id_foto;
    const foto = await Foto.findOne({
      where: { id_foto: id },
      include: [
        Like,
        {
          model: Komentar,
          include: User,
        },
        {
          model: User,
          attributes: ["username"],
        },
      ],
    });
    const like =
      (await Like.findOne({
        where: {
          foto_id: foto.id_foto,
          user_id: req.user.id_user,
        },
      })) || false;
    const data = { foto, like };
    return res.json({ msg: "success", data });
  } catch (error) {
    console.log(error.message);
  }
};

export const UpdateFoto = async (req, res) => {
  try {
    const body = req.body;
    const id = req.params.id_foto;
    const checkFoto = await Foto.findOne({ where: { id_foto: id } });
    if (body.album_id === "0") body.album_id = null;
    if (!checkFoto) return res.json({ msg: "Foto tidak ada" });
    if (req.files && req.files.foto) {
      const checkImg = checkImage(req, "foto");
      if (checkImg.msg != "success") return res.json({ msg: checkImg.msg });
      body.url = checkImg.data;
      HapusFoto(checkFoto.url);
    }
    await Foto.update(body, { where: { id_foto: id } });
    return res.json({ msg: "success" });
  } catch (error) {
    console.log(error.message);
  }
};

export const DeleteFoto = async (req, res) => {
  try {
    const id = req.params.id_foto;
    const checkFoto = await Foto.findOne({ where: { id_foto: id } });
    if (!checkFoto) return res.json({ msg: "Foto tidak ada" });
    await Foto.destroy({ where: { id_foto: id } });
    HapusFoto(checkFoto.url);
    return res.json({ msg: "success" });
  } catch (error) {
    console.log(error.message);
  }
};
