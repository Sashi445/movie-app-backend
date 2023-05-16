const express = require("express");

const dotenv = require("dotenv");
const { connectToDB } = require("./db");
const { generateToken } = require("./config/jwt");

dotenv.config();

const app = express();

connectToDB();

app.use(express.json());

const PORT = process.env.PORT;

app.get("/test", (req, res) => {
  res.json({
    message: "Hello, there",
  });
});

app.use("/api/users", require("./routes/user"));
app.use("/api/movies", require("./routes/movies"));
app.use("/api/recommendations", require("./routes/recommendations"));
app.use("/api/playlists", require("./routes/playlists"));

app.listen(PORT, () => {
  console.log("Listening on port ", PORT);
});
