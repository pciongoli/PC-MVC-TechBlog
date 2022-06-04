const router = require("express").Router();
const { User } = require("../../models");

// user-routes

// create a new user
router.post("/", (req, res) => {
   User.create({
      username: req.body.username,
      password: req.body.password,
   })

      // set up sessions w/'loggedIn' variable true
      .then((dbUserData) => {
         req.session.save(() => {
            req.session.userId = dbUserData.id;
            req.session.username = dbUserData.username;
            req.session.loggedIn = true;

            res.json(dbUserData);
         });
      })
      .catch((err) => {
         console.log(err);
         res.status(500).json(err);
      });
});

// post to login
router.post("/login", (req, res) => {
   User.findOne({
      where: {
         username: req.body.username,
      },
   }).then((dbUserData) => {
      if (!dbUserData) {
         res.status(400).json({ message: "Please enter a valid username!" });
         return;
      }

      const validPassword = dbUserData.checkPassword(req.body.password);

      if (!validPassword) {
         res.status(400).json({
            message: "Please enter the correct password!",
         });
         return;
      }

      // set up session variable 'loggedIn' once user has successfully logged in
      req.session.save(() => {
         req.session.userId = dbUserData.id;
         req.session.username = dbUserData.username;
         req.session.loggedIn = true;

         res.json({ user: dbUserData, message: "Logged in!!" });
      });
   });
});

// post to logout
router.post("/logout", (req, res) => {
   // if logout destroy the session (logout)
   if (req.session.loggedIn) {
      req.session.destroy(() => {
         res.status(200).json({ message: "You are now logged out!" }).end();
      });
   } else {
      res.status(400).end();
   }
});

// remove a user (destroy)
router.delete("/user/:id", (req, res) => {
   User.destroy({
      where: {
         id: req.params.id,
      },
   })
      .then((dbUserData) => {
         if (!dbUserData) {
            res.status(400).json({ message: "Please enter a valid user Id!" });
            return;
         }
         res.json(dbUserData);
      })
      .catch((err) => {
         console.log(err);
         res.status(500).json(err);
      });
});

module.exports = router;
