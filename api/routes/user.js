const express = require("express");
const router = express.Router();

const UserController = require('../controllers/user');
const checkAuth = require('../middleware/check-auth');

////////////////////////
// Gestion de usuarios
////////////////////////

router.get("/", UserController.GetUserAll);

router.get("/id/:userId", UserController.GetUserById);

router.get("/name/:userName", UserController.GetUserByName);

router.post("/add", UserController.UserAdd);

router.post("/login", UserController.UserLogin);

router.delete("/:userId", checkAuth, UserController.UserDelete);

/////////////////////////
// Gestion Salas
////////////////////////

// TODO

////////////////////////
// Mantenimiento App
///////////////////////

// TODO

module.exports = router;