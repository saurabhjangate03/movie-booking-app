
const mongoose = require('mongoose');

const genreSchema = new mongoose.Schema({
  genreid: Number,
  genre: String
});

const Genre = mongoose.model('Genre', genreSchema);

module.exports = Genre;