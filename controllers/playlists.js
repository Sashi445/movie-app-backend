const Movies = require("../models/movie");
const Playlists = require("../models/playlists");
const Users = require("./../models/user");

const createPlaylist = async (req, res, next) => {
    const { user_id } = req.params;
    const { name } = req.query; 

    try {

        const user = await Users.findOne({
            where: {
                id: user_id
            }
        })
        
        const playlist = await Playlists.create({
            name
        })

        await user.addPlaylist(playlist);

        return res.status(201).json(playlist);

    } catch (error) {
        
        return res.status(500).send(error.message);

    }

}

const deletePlaylist = async (req, res, next) => {

}

const getAllUserPlaylists = async (req, res, next) => {
    
}

const addMovieToPlaylist = async (req, res, next) => {
    const { movie_id, playlist_id } = req.query;
    const { user_id } = req.params;

    try {

        const movie = await Movies.findOne({
            where: {
                id: movie_id
            }
        })

        const playlist = await Playlists.findOne({
            where: {
                id: playlist_id
            }
        })

        await playlist.addMovie(movie);

        return res.status(200).json({message: "SUCCESS"});

    } catch (error) {
        
    }

}

module.exports = {
    addMovieToPlaylist,
    createPlaylist
}