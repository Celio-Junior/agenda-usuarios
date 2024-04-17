const express = require("express");
const route = express.Router();

const homeController = require("./src/controllers/homeController");
const loginController = require("./src/controllers/loginController")
const contatoController = require("./src/controllers/contatoController")
const {checkUser} = require("./src/middlewares/middleware");
//home
route.get("/", homeController.index);

//login
route.get("/login/index", loginController.index);
route.post("/login/register", loginController.register);
route.post("/login/login", loginController.login);
route.get("/login/logout", loginController.logout);

//contatos
route.get("/contato/index", checkUser, contatoController.index)
route.post("/contato/register", checkUser, contatoController.register);
route.get("/contato/index/:id", checkUser, contatoController.editIndex)
route.post("/contato/edit/:id", checkUser, contatoController.edit);
route.get("/contato/delete/:id", checkUser, contatoController.delete);

module.exports = route;
//falta o delete