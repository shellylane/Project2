var db = require("../models");
var passport = require("../config/passport");

module.exports = function (app) {
  // =====json dat of all user===============
  // =======================================
  app.get("/api/user", function (req, res) {
    db.User.findAll({}).then(function (dbUsers) {
      res.json(dbUsers);
    });
  });
  // 
  // GET route for getting the events
  app.get("/api/eventList", function (req, res) {
    // findAll returns all entries for a table when used with no options
    db.Event.findAll({}).then(function (dbEvent) {

      res.json(dbEvent);
    });
  });

  app.post("/api/login", passport.authenticate("local"), function (req, res) {
    // Since we're doing a POST with javascript, we can't actually redirect that post into a GET request
    // So we're sending the user back the route to the user page because the redirect will happen on the front end
    // They won't get this or even be able to access this page if they aren't authed
    res.json("/home");
  });

  app.post("/api/user", function (req, res) {
    console.log(req.body);
    db.User.create({
      email: req.body.email,
      password: req.body.password,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      phoneNumber: req.body.phoneNumber,
      role: req.body.role
    }).then(function () {
      res.redirect(307, "/api/login");
    }).catch(function (err) {
      console.log(err);
      res.json(err);
      // res.status(422).json(err.errors[0].message);
    });
  });
  // get for api/post route
  app.get("/api/post", function (req, res) {
    db.Post.findAll({}).then(function (dbPosts) {
      res.json(dbPosts);
    });
  });
  // create post api route 
  app.post("/api/post", function (req, res) {
    console.log(req.user);
    const data = {...req.body};
    data.UserId = req.user.id;
    db.Post.create(data).then(dbPost => {
      res.json(dbPost);
    });
  });
};
