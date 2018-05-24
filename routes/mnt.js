const express = require("express");
const router = express.Router();

const MntController = require('../controllers/mnt');
const checkAuth = require('../middleware/check-auth');
const checkUser = require('../middleware/check-user');

////////////////////////
// Gestion de usuarios
////////////////////////

router.get("/", checkUser,MntController.Index);

router.get("/download", checkUser,MntController.Download);

router.post("/upload", MntController.Upload);

/////////////////////////
// Gestion Salas
////////////////////////

// TODO

////////////////////////
// Mantenimiento App
///////////////////////

// TODO

module.exports = router;