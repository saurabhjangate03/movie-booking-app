const Artist = require('../models/artist.model');

async function findAllArtists(req,res) {
  try {
    const artists = await Artist.find();
    res.status(200).json(artists);
  } catch (error) {
    throw new Error('Failed to fetch artists: ' + error.message);
  }
}

module.exports = {
    findAllArtists
}