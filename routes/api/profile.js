const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const Profile = require("../../models/Profile");
const User = require("../../models/User");
const Post = require("../../models/Post");
const { check, validationResult } = require("express-validator");
const config = require("config");
const request = require("request");

//@route    GET api/profile/me
//@desc     Get current users profile
//@access   Public
router.get("/me", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id,
    }).populate("user", ["name", "avatar"]);

    if (!profile)
      return res.status(400).json({ msg: "There is no profile for this user" });
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//@route    GET api/profile
//@desc     Post profile to user
//@access   Public
router.post(
  "/",
  [
    auth,
    [
      check("school", "School is required").not().isEmpty(),
      check("faculty", "Faculty is required").not().isEmpty(),
      check("year", "Year is required").not().isEmpty(),
      check("phone", "Phone is required").not().isEmpty(),
      check(
        "desiredperweek",
        "You must choose how many Mingles you want per week"
      )
        .not()
        .isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });
    const {
      school,
      faculty,
      year,
      phone,
      bio,
      hobbies,
      desiredperweek,
      scheduledthisweek,
      listofpeoplemet,
      facebook,
      instagram,
      linkedin,
    } = req.body;

    //Build Profile
    const profileFields = {};
    profileFields.user = req.user.id;
    if (school) profileFields.school = school;
    if (faculty) profileFields.faculty = faculty;
    if (year) profileFields.year = year;
    if (phone) profileFields.phone = phone;
    if (bio) profileFields.bio = bio;
    if (desiredperweek) profileFields.desiredperweek = desiredperweek;
    profileFields.scheduledthisweek = 0;
    profileFields.listofpeoplemet = [];
    if (hobbies)
      profileFields.hobbies = hobbies.split(",").map((hobbie) => hobbie.trim());
    profileFields.social = {};
    if (facebook) profileFields.company = facebook;
    if (instagram) profileFields.company = instagram;
    if (linkedin) profileFields.company = linkedin;

    try {
      //   let profile = await Profile.findOne({ user: req.user.id });
      //Update profile
      //   if (profile) {
      let profile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFields },
        { new: true, upsert: true }
      );
      return res.json(profile);
      //   }
      //   Create new profile
      //   profile = new Profile(profileFields);
      //   await profile.save();
    } catch (err) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  }
);

//@route    GET api/profile
//@desc     Get all profiles
//@access   Public

router.get("/", async (req, res) => {
  try {
    const profiles = await Profile.find().populate("user", ["name", "avatar"]);
    res.json(profiles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//@route    GET api/profile/user/:user_id
//@desc     Get profile by user ID
//@access   Public

router.get("/user/:user_id", async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id,
    }).populate("user", ["name", "avatar"]);

    if (!profile) return res.status(400).json({ msg: "Profile not found" });
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    if (err.kind == "ObjectId") {
      return res.status(400).json({ msg: "Profile not found" });
    }
    res.status(500).send("Server Error");
  }
});

//@route    DELETE api/profile
//@desc     Delete a profile, user and posts
//@access   Priavte
router.delete("/", auth, async (req, res) => {
  try {
    //Remove Posts
    await Post.deleteMany({ user: req.user.id });
    //Remove Profile
    await Profile.findOneAndRemove({ user: req.user.id });
    //Remove User
    await User.findOneAndRemove({ _id: req.user.id });

    res.json({ msg: "User removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
