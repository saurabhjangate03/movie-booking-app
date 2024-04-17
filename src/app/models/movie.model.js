const mongoose = require('mongoose');

const artistSchema = new mongoose.Schema({
  artistid: Number,
  first_name: String,
  last_name: String,
  wiki_url: String,
  profile_url: String,
  movies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Movie' }]
});

const theatreSchema = new mongoose.Schema({
  name: String,
  city: String
});

const showSchema = new mongoose.Schema({
  id: Number,
  theatre: theatreSchema,
  language: String,
  show_timing: Date,
  available_seats: String,
  unit_price: Number
});

const movieSchema = new mongoose.Schema({
  movieid: Number,
  title: String,
  published: Boolean,
  released: Boolean,
  poster_url: String,
  release_date: Date,
  publish_date: Date,
  artists: [artistSchema],
  genres: [String],
  duration: Number,
  critic_rating: Number,
  trailer_url: String,
  wiki_url: String,
  story_line: String,
  shows: [showSchema]
});

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;