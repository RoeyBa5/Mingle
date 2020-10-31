const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../../middleware/auth");
const Match = require("../../models/Match");
const Profile = require("../../models/Profile");
const User = require("../../models/User");

//@route    POST api/match
//@desc     Generate a new match
//@access   Private
//@route    GET api/profile
//@desc     Get all profiles
//@access   Public

//@route    POST api/match/:id
//@desc     Generate a new match
//@access   Private
//@route    GET api/profile
//@desc     Get all profiles
//@access   Public

//@route    GET api/match/user/:id
//@desc     Get a specific match of a specific user
//@access   Private

//@route    GET api/match/user
//@desc     Get all matches of a user
//@access   Private

module.exports = router;
