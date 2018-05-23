const express = require("express");
const router = express.Router();

const ApiController = require('../controllers/api');
const checkAuth = require('../middleware/check-auth');

////////////////////////
// Gestion de usuarios
////////////////////////

router.get("/user", ApiController.GetAllUsers);

router.get("/user/id/:userId", ApiController.GetUserById);

router.get("/user/name/:userName", ApiController.GetUserByName);

router.post("/user/add", ApiController.UserAdd);

router.post("/user/login", ApiController.UserLogin);

router.delete("/user/:userId", checkAuth, ApiController.UserDelete);

/////////////////////////
// Gestion Salas
////////////////////////

// TODO

////////////////////////
// Mantenimiento App
///////////////////////

// TODO

module.exports = router;