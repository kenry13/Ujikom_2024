import {Sequelize} from "sequelize";

const db = new Sequelize('web_galeri','root','',{
    host: 'localhost',
    dialect: "mysql"
});

export default db;