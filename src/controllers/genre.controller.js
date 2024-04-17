const Genre = require('../models/genre.model');

const findAllGenres = async(req,res) => {
  try {
    const genres = await Genre.find();
    res.status(200).json(genres);
  } catch (error) {
    throw new Error('Failed to fetch genres: ' + error.message);
  }
}

module.exports = {
    findAllGenres
}