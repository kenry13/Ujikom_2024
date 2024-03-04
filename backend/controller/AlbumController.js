import { body } from "express-validator";
import { checkValidate } from "../midleware/check.js";
import Album from "../models/AlbumModel.js";
import Foto from "../models/FotoModel.js";

export const ValidateAlbum = [
  body("nama_album").notEmpty().withMessage("Nama kosong"),
  body("deskripsi").notEmpty().withMessage("Deskripsi kosong"),
  checkValidate,
];

export const CreateAlbum = async (req, res) => {
  try {
    const body = req.body;
    body.user_id = req.user.id_user;
    await Album.create(body);
    return res.json({ msg: "success" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Failed to create Album" });
  }
};

export const ShowAlbum = async (req, res) => {
  try {
    const data = await Album.findAll({ 
      where: { user_id: req.user.id_user },
      include: [{
        model: Foto,
        limit: 1, // Limit to only retrieve the first photo
        separate: true, // Separate included models into nested objects
        order: [['createdAt', 'ASC']] // Order the photos by creation time ascending
      }]
    });
    return res.json({ msg: "success", data });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Failed to fetch Albums" });
  }
};


export const ShowByIdAlbum = async (req, res) => {
  try {
    const id = req.params.id_album;
    const data = await Album.findOne({
      where: { id_album: id },
      include: Foto,
    });

    if (!data) {
      return res.status(404).json({ msg: "Album not found" });
    }

    return res.json({ msg: "success", data });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ msg: "Internal server error" });
  }
};

export const UpdateAlbum = async (req, res) => {
  try {
    const body = req.body;
    const id = req.params.id_album;
    await Album.update(body, { where: { id_album: id } });
    return res.json({ msg: "success" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Failed to update Album" });
  }
};


export const DeleteAlbuum = async (req, res) => {
  try {
    const idAlbum = req.params.id_album;
    const response = await Album.destroy({
      where: {
        id_album: idAlbum,
      },
    });

    if (response === 1) {
      res.json("Deleted Successfully");
    } else {
      res.status(404).json({ message: "Album not found" });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Failed to delete Album" });
  }
};
