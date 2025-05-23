import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import { v4 } from "uuid";
import fs from "fs";
import path from "path";

export function checkLogin (req,res,next) {
    const token = req.cookies.login;
    const verify = jwt.verify(token,process.env.JWT_TOKEN,((err,decode) => err ? false : decode));
    if(!verify) {
        res.clearCookie("login");
        return res.json({msg:"dangerToken"});
    };
    req.user = verify;
    return next();
}

export function checkValidate (req,res,next) {
    const errors = validationResult(req);
    if(!errors.isEmpty()) return res.json({msg:(errors.array())[0].msg});
    return next()
}

export function checkImage(req, file) {
    try {
        let foto = req.files[file];
        if (!foto) {
            return { msg: "Tidak ada gambar" };
        }

        const allowedType = [".jpg", ".jpeg", ".png"];
        const size = mb(10);
        const ext = path.extname(foto.name);
        const fileSize = foto.data.length;
        const fileName = v4() + ext;
        const url = `${req.protocol}://${req.get("host")}/img/${fileName}`;

        if (!allowedType.includes(ext.toLowerCase())) return { msg: "Yang diupload bukan gambar" }
        if (fileSize > size) return { msg: "Gambar melebihi ukuran maksimal" }

        foto.mv(`./Public/img/${fileName}/`);

        return {
            msg: "success",
            data: url,
        };
    } catch (error) {
        console.log(error);
        return { msg: "Terjadi kesalahan saat memproses gambar" };
    }
}

function mb (angka) {
    return angka * 1000000;
}