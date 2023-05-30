const router = require("express").Router();

const _controller = require("./../../controllers/auth");

router.post("/login", _controller.loginUser);
router.delete("/logout", _controller.logoutUser);

module.exports = router;
