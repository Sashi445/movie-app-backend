const router = require("express").Router();

const {
  createUser,
  getUsers,
  followUser,
  isFollowing,
  unfollowUser,
} = require("./../../controllers/user");

router.post("/create", createUser);
router.post("/follow/:user_id", followUser);
router.get("/follows/:user_id", isFollowing);
router.delete("/unfollow/:user_id", unfollowUser);
router.get("", getUsers);

module.exports = router;
