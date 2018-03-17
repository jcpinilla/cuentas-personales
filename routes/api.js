const express = require("express");
const router = express.Router();

const usuarios = require("./usuarios");
const aut = require("./aut");

router.use("/usuarios", usuarios);
router.use("/aut", aut);

module.exports = router;