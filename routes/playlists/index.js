const { createPlaylist } = require("../../controllers/playlists");

const router = require("express").Router();

router.post("/:user_id", createPlaylist);

module.exports = router;