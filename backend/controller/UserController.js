import { body } from "express-validator";
import bcrypt from "bcrypt";
import User from "../models/UserModel.js";
import { checkValidate } from "../midleware/check.js";
import { Op } from "sequelize";
import Foto from "../models/FotoModel.js";
import Album from "../models/AlbumModel.js";

export const ValidateRegister = [
  body("username").notEmpty().withMessage("Nama wajib ada"),
  body("email")
    .notEmpty()
    .withMessage("Email wajib ada")
    .isEmail()
    .withMessage("Email tidak valid"),
  body("password").notEmpty().withMessage("Password wajib ada"),
  checkValidate,
];

export const CreateUser = async (req, res) => {
  try {
    const body = req.body;
    body.password = bcrypt.hashSync(body.password, 10);
    await User.create(body);
    return res.json({ msg: "success" });
  } catch (e) {
    return res.json({ msg: "Email tidak unik" });
  }
};

export const Show = async (req, res) => {
  return res.json({ msg: "success", data: req.user });
};

export const ShowUser = async (req, res) => {
  try {
    const userId = req.params.id_user; // Menggunakan id_user dari params

    const user = await User.findOne({
      where: { id_user: userId },
      include: [{ model: Foto, as: "fotos" }],
    });

    if (user) {
      return res.json({ success: true, data: user });
    } else {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
  } catch (error) {
    console.error("Failed to show user:", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const SearchUser = async (req, res) => {
  try {
    const { keyword } = req.query;

    const users = await User.findAll({
      where: { username: { [Op.like]: `%${keyword}%` } },
      include: [
        { model: Foto, as: "fotos" },
        { model: Album, as: "albums" },
      ],
    });

    res.json({ success: true, data: users });
  } catch (error) {
    console.error("Failed to search users:", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
