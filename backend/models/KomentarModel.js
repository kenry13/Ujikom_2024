import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Foto from "./FotoModel.js";
import User from "./UserModel.js";

const { DataTypes } = Sequelize;

const Komentar = db.define(
  "komentar",
  {
    id_komentar: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    isi_komentar: {
      type: DataTypes.TEXT,
    },
  },
  {
    freezeTableName: true,
  }
);

Komentar.belongsTo(Foto, { foreignKey: "foto_id", onDelete: "CASCADE" });
Komentar.belongsTo(User, { foreignKey: "user_id", onDelete: "CASCADE" });

Foto.hasMany(Komentar, { foreignKey: "foto_id" });
User.hasMany(Komentar, { foreignKey: "user_id" });

export default Komentar;
