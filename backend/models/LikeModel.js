import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Foto from "./FotoModel.js";
import User from "./UserModel.js";

const { DataTypes } = Sequelize;

const Like = db.define(
  "Like",
  {
    id_like: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
  },
  {
    freezeTableName: true,
  }
);

Like.belongsTo(Foto, { foreignKey: "foto_id", onDelete: "CASCADE" });
Like.belongsTo(User, { foreignKey: "user_id", onDelete: "CASCADE" });

Foto.hasMany(Like, { foreignKey: "foto_id" });
User.hasMany(Like, { foreignKey: "user_id" });

export default Like;
