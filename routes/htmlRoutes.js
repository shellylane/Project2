var db = require("../models");
var passport = require("../config/passport");
const authRoute = require("./utils/authRoute");

module.exports = function (app) {
  // Load index page, for our app this is also the register user page
  app.get("/", function (req, res) {
    res.render("index");
  });
  // ==============================
  // load login page
  // ==============================
  app.get("/login", function (req, res) {
    res.render("login");
    if (req.user) {
      res.redirect("/homecontent");
    };
  });

  // ==============================
  // load home page
  // ==============================
  app.get("/home", function (req, res) {
    res.render("homecontent");
  });

  // =======================================
  // Load contact page 
  // =======================================
  app.get("/user", function (req, res) {
    db.User.findAll({}).then(function (dbUsers) {
      console.log("users loaded")
      res.render("user", { users: dbUsers });
    });
  });

  // =======================================
  // Load schedule page!
  // =======================================
  app.get("/schedule", function (req, res) {
    res.render("schedule")
  });
  // =======================================
  // Load Add Event page!
  // =======================================
  app.get("/addevent", function (req, res) {
    res.render("addevent")
});

  // =======================================
  // load Forum Page!
  // =======================================
  app.get("/forum", authRoute, function (req, res) {
    db.Post.findAll({ include: [db.User] }).then(function (dbPosts) {
      console.log("posts loaded")
      res.render("forum", { posts: dbPosts });
    });
  });

  // =======================================
  // load specific blog Page!
  // =======================================
  app.get("/forum/:id", function (req, res) {

    db.Post.findOne({ where: { id: req.params.id }, include: [db.Comment, db.User] }).then(function (dbPosts) {

      res.render("blogpost", { posts: dbPosts });

    });

  });
  // Render 404 page for any unmatched routes
  app.get("*", function (req, res) {
    res.render("404");
  });
};
