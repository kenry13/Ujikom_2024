import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import User from "./UserModel.js";

const { DataTypes } = Sequelize;

const Album = db.define(
  "album",
  {
    id_album: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nama_album: {
      type: DataTypes.STRING(255),
    },
    deskripsi: {
      type: DataTypes.TEXT,
    },
  },
  {
    freezeTableName: true,
  }
);

Album.belongsTo(User, { foreignKey: "user_id", onDelete: "CASCADE" });

User.hasMany(Album, { foreignKey: "user_id" });

export default Album;
