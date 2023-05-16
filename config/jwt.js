const jwt = require("jsonwebtoken");

const generateToken = async (user, tokenType = "ACCESS") => {
  const secret =
    tokenType === "REFRESH"
      ? process.env.REFRESH_TOKEN_SECRET
      : process.env.ACCESS_TOKEN_SECRET;
  const expiresIn =
    tokenType === "REFRESH"
      ? process.env.REFRESH_TOKEN_EXPIRY
      : process.env.ACCESS_TOKEN_EXPIRY;

  return await jwt.sign(user, secret, { expiresIn });
};

module.exports = {
  generateToken,
};
