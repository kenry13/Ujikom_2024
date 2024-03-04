import { body } from "express-validator";
import { checkValidate } from "../midleware/check.js";
import Like from "../models/LikeModel.js";
import Foto from "../models/FotoModel.js";
import User from "../models/UserModel.js";

export const ValidateLike = [
  body("foto_id").notEmpty().withMessage("Foto kosong"),
  checkValidate,
];

export const ShowLike = async (req, res) => {
  try {
    const data = await Like.findAll({
      where: { user_id: req.user.id_user },
      include: [
        {
          model: Foto,
          attributes: ["id_foto", "url"], // Menyertakan atribut URL dari model Foto
        },
        {
          model: User,
          attributes: ["username"], // Menyertakan atribut username dari model User
        },
      ],
    });

    res.json({ msg: "success", data });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Failed to fetch Like" });
  }
};


export const PostLike = async (req, res) => {
  try {
    const body = req.body;
    body.user_id = req.user.id_user;
    const like = await Like.create(body);
    return res.json({ msg: "success", data: like });
  } catch (error) {
    console.log(error.message);
  }
};

export const UnLike = async (req, res) => {
  try {
    const id = req.params.id_like;
    await Like.destroy({ where: { id_like: id } });
    return res.json({ msg: "success" });
  } catch (error) {
    console.log(error.message);
  }
};
