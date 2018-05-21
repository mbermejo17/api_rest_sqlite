const express = require("express");
const router = express.Router();

const UserController = require('../controllers/user');
const checkAuth = require('../middleware/check-auth');

////////////////////////
// Gestion de usuarios
////////////////////////

router.get("/user", UserController.ApiGetUserAll);

router.get("/user/id/:userId", UserController.ApiGetUserById);

router.get("/user/name/:userName", UserController.ApiGetUserByName);

router.post("/user/add", UserController.ApiUserAdd);

router.post("/user/login", UserController.ApiUserLogin);

router.delete("/user/:userId", checkAuth, UserController.ApiUserDelete);

/////////////////////////
// Gestion Salas
////////////////////////

// TODO

////////////////////////
// Mantenimiento App
///////////////////////

// TODO

module.exports = router;