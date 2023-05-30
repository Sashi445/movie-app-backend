const EarlyAccessMembers = require("../models/earlyaccess");

const signUpforEarlyAccess = async (req, res) => {
  const { email, device } = req.body;
  try {
    const earlyAccessInstance = await EarlyAccessMembers.create({
      email,
      device
    });

    return res.status(201).json({
      message: "SUCCESS",
      ...earlyAccessInstance.dataValues,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).send(error.message);
  }
};

module.exports = {
  signUpforEarlyAccess,
};
