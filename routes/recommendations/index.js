const router = require("express").Router();
const {
  getAllRecommendations,
  recommendMovie,
} = require("./../../controllers/movie");

router.get("/:user_id", getAllRecommendations);
router.post("/:user_id", recommendMovie);

module.exports = router;
