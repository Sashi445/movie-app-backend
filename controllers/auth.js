const { generateToken } = require("../config/jwt");
const Users = require("../models/user");

const loginUser = async (req, res, next) => {
  const { email, avatar, displayName, newUser, uid } = req.body;

  console.log(req.body);

  try {
    let user = null;
    if (!newUser) {
      user = await Users.findOne({
        where: {
          email,
        },
      });
    } else {
      user = await Users.create({
        email,
        name: displayName,
        avatar,
        fuid: uid,
      });
    }

    const userPayload = { id: user.id, email: user.email };

    const accessToken = await generateToken(userPayload);
    const refreshToken = await generateToken(userPayload, "REFRESH");

    return res.status(201).json({ accessToken, refreshToken });
  } catch (error) {
    console.log(error.message);
    return res.status(500).send(error.message);
  }
};

const logoutUser = async (req, res, next) => {};

module.exports = {
  loginUser,
  logoutUser,
};
