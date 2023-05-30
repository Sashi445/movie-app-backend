const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { connectToDB } = require("./db");

dotenv.config();

const app = express();

// if (process.env.ENV === "development") {
//   app.use(
//     cors({
//       origin: "*",
//     })
//   );
// } else {
//   app.use(
//     cors({
//       origin: "*",
//     })
//   );
// }

app.use(
  cors({
    origin: "*",
  })
);

connectToDB();

app.use(express.json());

const PORT = process.env.PORT;

app.get("/test", (req, res) => {
  res.json({
    message: "Hello, there",
  });
});

app.use("/api/auth", require("./routes/auth"));
app.use("/api/users", require("./routes/user"));
app.use("/api/movies", require("./routes/movies"));
app.use("/api/recommendations", require("./routes/recommendations"));
app.use("/api/playlists", require("./routes/playlists"));
app.use("/api/earlyaccess", require("./routes/earlyaccess"));

app.listen(PORT, () => {
  console.log("Listening on port ", PORT);
});
