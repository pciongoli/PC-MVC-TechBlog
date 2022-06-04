const router = require("express").Router();
// require Post from models
const { Post } = require("../models/");
const withAuth = require("../utils/auth");

// export
module.exports = router;
