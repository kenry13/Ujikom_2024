import express from "express";
import LoginController from "../controller/LoginController.js";
import {
  CreateUser,
  SearchUser,
  Show,
  ShowUser,
  ValidateRegister,
} from "../controller/UserController.js";
import RouteGroup from "../midleware/routegroup.js";
import { checkLogin } from "../midleware/check.js";
import {
  CreateAlbum,
  DeleteAlbuum,
  ShowAlbum,
  ShowByIdAlbum,
  UpdateAlbum,
  ValidateAlbum,
} from "../controller/AlbumController.js";
import {
  CreateFoto,
  DeleteFoto,
  ShowAllFoto,
  ShowByUserFoto,
  ShowFoto,
  UpdateFoto,
  ValidateFoto,
} from "../controller/FotoController.js";
import {
  CreateKomentar,
  DeleteKomentar,
  ShowKomentar,
  UpdateKomentar,
  ValidateKomentar,
  ValidateUpadateKomentar,
} from "../controller/KomentarController.js";
import {
  PostLike,
  ShowLike,
  UnLike,
  ValidateLike,
} from "../controller/LikeController.js";

const Route = express.Router();

Route.post("/api/login", LoginController.validate, LoginController.login);
Route.post("/api/user", ValidateRegister, CreateUser);

Route.get("/fotos", ShowAllFoto);

RouteGroup(Route, checkLogin, (route) => {
  route.get("/api/logout", LoginController.logout);
  route.get("/api/user", Show);

  route.get("/users/search", SearchUser);
  route.get("/user/:id_user", ShowUser);

  route.get("/album", ShowAlbum);
  route.get("/album/:id_album", ShowByIdAlbum);
  route.post("/album", ValidateAlbum, CreateAlbum);
  route.put("/album/:id_album", ValidateAlbum, UpdateAlbum);
  route.delete("/album/:id_album", DeleteAlbuum);

  route.get("/fotos", ShowAllFoto);
  route.get("/foto", ShowByUserFoto);
  route.get("/foto/:id_foto", ShowFoto);
  route.post("/foto", ValidateFoto, CreateFoto);
  route.put("/foto/:id_foto", ValidateFoto, UpdateFoto);
  route.delete("/foto/:id_foto", DeleteFoto);

  route.get("/komentar/:id_komentar", ShowKomentar);
  route.post("/komentar", ValidateKomentar, CreateKomentar);
  route.put("/komentar/:id_komentar", ValidateUpadateKomentar, UpdateKomentar);
  route.delete("/komentar/:id_komentar", DeleteKomentar);

  route.get("/like", ShowLike);
  route.post("/like", ValidateLike, PostLike);
  route.delete("/like/:id_like", UnLike);
});

export default Route;
