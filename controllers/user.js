const { Op } = require("sequelize");
const Followers = require("../models/followers");
const Users = require("./../models/user");

const createUser = async (req, res, next) => {
  const { email, name, avatar } = req.body;
  try {
    const user = await Users.findOne({
      where: {
        email: email,
      },
    });

    if (!user) {
      const newUser = await Users.create({
        email,
        name,
        avatar,
      });

      return res.status(201).json({
        data: newUser,
      });
    } else {
      return res.status(401).json({
        message: "user already exists(email already taken)",
      });
    }
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const getUsers = async (req, res, next) => {
  try {
    const users = await Users.findAll({});

    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const followUser = async (req, res, next) => {
  try {
    const { user_id } = req.params;
    const { target_id } = req.query;

    const target = await Users.findOne({
      where: {
        id: target_id,
      },
    });

    const user = await Users.findOne({
      where: {
        id: user_id,
      },
    });

    const follower = await Followers.findOne({
      where: {
        [Op.or]: [
          {
            [Op.and]: [{ followerId: target_id }, { followingId: user_id }],
          },
          {
            [Op.and]: [{ followerId: user_id }, { followingId: target_id }],
          },
        ],
      },
    });

    if (!follower) {
      await user.addFollower(target);
    } else {
      follower.status = 1;
      await follower.save();
    }

    return res.status(201).json({
      message: `${user.email} started following ${target.email}`,
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const isFollowing = async (req, res, next) => {
  const { user_id } = req.params;
  const { target_id } = req.query;

  try {
    const follower = await Followers.findOne({
      where: {
        [Op.or]: [
          {
            [Op.and]: [{ followerId: user_id }, { followingId: target_id }],
          },
          {
            [Op.and]: [
              { followerId: target_id },
              { followingId: user_id },
              { status: 1 },
            ],
          },
        ],
      },
    });

    if (!follower) {
      return res.status(200).json({ status: false });
    } else {
      return res.status(200).json({ status: true });
    }
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const unfollowUser = async (req, res, next) => {
  const { user_id } = req.params;
  const { target_id } = req.query;

  try {
    const follower = await Followers.findOne({
      where: {
        [Op.or]: [
          {
            [Op.and]: [{ followerId: user_id }, { followingId: target_id }],
          },
          {
            [Op.and]: [
              { followerId: target_id },
              { followingId: user_id },
              { status: 1 },
            ],
          },
        ],
      },
    });

    if (!follower) {
      return res.status(400).json({ message: "No relation exists!" });
    } else if (follower.status === 1) {
      follower.status = 0;
      await follower.save();
      return res.status(200).json({ message: "success", data: follower });
    } else {
      await follower.destroy();
      return res.status(200).json({ message: "success", data: follower });
    }
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

module.exports = {
  createUser,
  getUsers,
  followUser,
  isFollowing,
  unfollowUser,
};
