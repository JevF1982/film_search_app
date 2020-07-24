const express = require("express");
const User = require("../models/User");

const verify = require("../routes/verifyToken");

const router = express.Router();

//@ Add to favorites
//@ private route
// @ /api/favorites

router.patch("/:UserId", verify, async (req, res) => {
  try {
    const updateduser = await User.updateOne(
      { _id: req.params.UserId },

      { $addToSet: { favList: req.body.favList } }
    );
    await res.json(updateduser);
  } catch (err) {
    res.json({ message: err.message });
  }
});

//@ delete favorites
//@ private route
// @ /api/favorites

router.patch("/deletefavorites/:UserId", verify, async (req, res) => {
  try {
    const deleteFavorite = await User.updateOne(
      { _id: req.params.UserId },

      { $pull: { favList: req.body.favList } }
    );
    await res.json(deleteFavorite);
  } catch (err) {
    res.json({ message: err.message });
  }
});
//@ get favorites list
//@ private route
// @ /api/favorites/getfavorites

router.get("/getfavorites/:UserId", verify, async (req, res) => {
  try {
    const user = await User.findById(req.params.UserId, "favList").select(
      "-_id"
    );
    await res.json(user);
  } catch (err) {
    res.json({ message: err.message });
  }
});

module.exports = router;
