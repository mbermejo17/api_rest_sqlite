const express = require("express");
const router = express.Router();

const ApiController = require('../controllers/UserApi');
const checkAuth = require('../middleware/check-auth');

////////////////////////
// Gestion de usuarios
////////////////////////


router.get("/user", ApiController.UserGetAll);

router.get("/user/id/:userId", ApiController.GetUserById);

router.get("/user/name/:userName", ApiController.GetUserByName);

router.post("/user", ApiController.UserAdd);

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