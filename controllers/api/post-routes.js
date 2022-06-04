const router = require("express").Router();

// require Post from models
const { Post, Comment, User } = require("../../models/");
const withAuth = require("../../utils/auth");

// create a post = only allow feature once user has logged in (withAuth)
router.post("/", withAuth, (req, res) => {
   const body = req.body;
   console.log(req.session.userId);
   Post.create({ ...body, userId: req.session.userId })
      .then((newPost) => {
         res.json(newPost);
      })
      .catch((err) => {
         res.status(500).json(err);
      });
});

// update a post if logged in
router.put("/:id", withAuth, (req, res) => {
   Post.update(req.body, {
      where: {
         id: req.params.id,
      },
   })
      .then((affectedRows) => {
         if (affectedRows > 0) {
            res.status(200).end();
         } else {
            res.status(404).end();
         }
      })
      .catch((err) => {
         res.status(500).json(err);
      });
});

// delete a post if logged in
router.delete("/:id", withAuth, (req, res) => {
   Post.destroy({
      where: {
         id: req.params.id,
      },
   })
      .then((affectedRows) => {
         if (affectedRows > 0) {
            res.status(200).end();
         } else {
            res.status(404).end();
         }
      })
      .catch((err) => {
         res.status(500).json(err);
      });
});

// export Router object
module.exports = router;
