const express = require("express");
const router = express.Router();

const UserController = require('../controllers/user');
const checkAuth = require('../middleware/check-auth');
const checkUser = require('../middleware/check-user');

////////////////////////
// Gestion de usuarios
////////////////////////

router.get("/", checkUser,UserController.Index);

router.get("/dashboard", checkUser,UserController.Dashboard);

//router.get("/id/:userId", UserController.GetUserById);

//router.get("/name/:userName", UserController.GetUserByName);

//router.post("/add", UserController.UserAdd);

router.post("/login", UserController.UserLogin);

//router.delete("/:userId", checkAuth, UserController.UserDelete);

/////////////////////////
// Gestion Salas
////////////////////////

// TODO

////////////////////////
// Mantenimiento App
///////////////////////

// TODO

module.exports = router;