const {
  signUpforEarlyAccess,
  getAll,
} = require("../../controllers/earlyaccess");

const router = require("express").Router();
router.get("", getAll);
router.post("", signUpforEarlyAccess);

module.exports = router;
