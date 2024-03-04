import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import User from "./UserModel.js";
import Album from "./AlbumModel.js";

const { DataTypes } = Sequelize;

const Foto = db.define(
  "foto",
  {
    id_foto: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    judul: {
      type: DataTypes.STRING(255),
    },
    deskripsi: {
      type: DataTypes.TEXT,
    },
    url: {
      type: DataTypes.STRING(255),
    },
  },
  {
    freezeTableName: true,
  }
);

Foto.belongsTo(User, { foreignKey: "user_id", onDelete: "CASCADE" });
Foto.belongsTo(Album, { foreignKey: "album_id", onDelete: "CASCADE" });

User.hasMany(Foto, { foreignKey: "user_id" });
Album.hasMany(Foto, { foreignKey: "album_id" });

export default Foto;
