import Express from "express";
import cors from "cors";
import db from "./config/Database.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import Route from "./route/Route.js";
import Like from "./models/LikeModel.js";
import Foto from "./models/FotoModel.js";
import Album from "./models/AlbumModel.js";
import Komentar from "./models/KomentarModel.js";

const app = Express();
dotenv.config();

app.use(cors({ credentials: true, origin: "http://localhost:5173" }));
app.use(cookieParser());
app.use(Express.json());
app.use(fileUpload());
app.use(Express.static("Public"));
app.use(Route);

try {
  await db.authenticate();
  console.log("database connected");
  // Foto.sync();
  // Album.sync();
  // Like.sync();
  // Komentar.sync();
} catch (error) {
  console.error(error);
}

app.listen(5000, () => console.log("jalan cuy..."));
