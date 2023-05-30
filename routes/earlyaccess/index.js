const { signUpforEarlyAccess } = require("../../controllers/earlyaccess");

const router = require("express").Router();
router.post("", signUpforEarlyAccess);

module.exports = router;
