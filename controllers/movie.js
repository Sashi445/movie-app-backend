const Recommendations = require("./../models/recommendations");
const Users = require("./../models/user");
const Movies = require("./../models/movie");

const getAllMovies = async (req, res, next) => {
  try {
    const movies = await Movies.findAll({});
    return res.status(200).json(movies);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const createMovie = async (req, res, next) => {
  const { title, description, rating, platform, movie_url, hero_img } =
    req.body;

  try {
    //TODO: add a check to see if the movie already exists

    const movie = await Movies.create({
      title,
      description,
      heroImg: hero_img,
      rating,
      platform,
      movieUrl: movie_url,
    });

    return res.status(201).json({ data: movie });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const recommendMovie = async (req, res, next) => {
  const { target_id, movie_id } = req.query;
  const { user_id } = req.params;

  try {
    const user = await Users.findOne({
      where: {
        id: user_id,
      },
    });

    const target = await Users.findOne({
      wherer: {
        id: target_id,
      },
    });

    await target.addTo(user, { through: { movieId: movie_id } });

    return res.status(201).json({
      message: "success",
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const getAllRecommendations = async (req, res, next) => {
  const { user_id } = req.params;
  try {
    const recommendations = await Recommendations.findAll({
      where: {
        userB: user_id,
      },
      include: {
        model: Movies
      }
    });

    return res.status(200).json(recommendations);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

module.exports = {
  createMovie,
  recommendMovie,
  getAllMovies,
  getAllRecommendations,
};
