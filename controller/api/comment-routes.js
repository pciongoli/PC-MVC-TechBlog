const router = require("express").Router();
const { Comment } = require("../../models/");
const withAuth = require("../../utils/auth");

// create a comment = only allow user to do this after logging in
router.post("/", withAuth, (req, res) => {
   // send
   Comment.create({ ...req.body, userId: req.session.userId })
      .then((newComment) => {
         res.json(newComment);
      })
      .catch((err) => {
         res.status(500).json(err);
      });
});

module.exports = router;
