const EarlyAccessMembers = require("../models/earlyaccess");

const signUpforEarlyAccess = async (req, res) => {
  const { email, device } = req.body;
  try {
    const user = await EarlyAccessMembers.findOne({
      where: {
        email: email,
      },
    });

    if (!user) {
      const earlyAccessInstance = await EarlyAccessMembers.create({
        email,
        device,
      });

      return res.status(201).json({
        message: "SUCCESS",
        ...earlyAccessInstance.dataValues,
      });
    }

    return res.json({
      message: "SUCCESS",
      info: "Already subscribed for early access"
    })

  } catch (error) {
    console.log(error.message);
    return res.status(500).send(error.message);
  }
};

const getAll = async (req, res) => {
  try {
    const earlyAccess = await EarlyAccessMembers.findAll({});
    return res.json(earlyAccess);
  } catch (error) {
    console.log(error.message);
    return res.status(500).send(error.message);
  }
};

module.exports = {
  signUpforEarlyAccess,
  getAll,
};
