const router = require("express").Router();
// require Post from models
const { Post } = require("../models/");
const withAuth = require("../utils/auth");

// define each dashboard-route

// Get route for main page
router.get("/", withAuth, (req, res) => {
   Post.findAll({
      where: {
         // using the ID from the session
         userId: req.session.userId,
      },
   })
      .then((dbPostData) => {
         // serialize the data before passing it to the template
         const posts = dbPostData.map((post) => post.get({ plain: true }));

         // Send 'loggedIn' session variable to 'posts' template
         res.render("posts", {
            layout: "dashboard",
            posts,
         });
      })
      .catch((err) => {
         console.log(err);
         res.redirect("login");
      });
});

router.get("/new", withAuth, (req, res) => {
   res.render("new-post", {
      layout: "dashboard",
   });
});

// GET route for /edit/:id that renders the edit-post.handlebars
// template by passing data from Post.findOne() query used in /post/:id
router.get("/edit/:id", withAuth, (req, res) => {
   Post.findByPk(req.params.id)
      .then((dbPostData) => {
         if (dbPostData) {
            const post = dbPostData.get({ plain: true });

            res.render("edit-posts", {
               layout: "dashboard",
               post,
            });
         } else {
            res.status(404).end();
         }
      })
      .catch((err) => {
         res.status(500).json(err);
      });
});

// export
module.exports = router;
