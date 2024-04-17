
const express = require('express');
const router = express.Router();

const {findAllArtists} = require('../controllers/artist.controller');


// GET /api/artists
router.get('/', (req,res)=>{(findAllArtists(req,res))});

module.exports = router;
