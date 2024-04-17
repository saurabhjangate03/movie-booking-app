const express = require("express");
const router = express.Router();

const { findAllGenres } = require("../controllers/genre.controller");

// GET /api/genres
router.get("/", (req, res) => {
  findAllGenres(req, res);
});

module.exports = router;