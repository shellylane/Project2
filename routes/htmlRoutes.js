var db = require("../models");

module.exports = function (app) {
  // Load index page, for our app this is also the register user page
  app.get("/", function (req, res) {
    db.Example.findAll({}).then(function (dbExamples) {
      res.render("index", {
        msg: "Welcome!",
        examples: dbExamples
      });
    });
  });
  // ==============================
  // load login page
  // ==============================
  app.get("/login", function (req, res) {
    if (req.user) {
      res.redirect("/members");
    }
    res.render("login")
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
  // load Forum Page!
  // =======================================
  app.get("/forum", function (req, res) {
    res.render("schedule")
  });


  // Render 404 page for any unmatched routes
  app.get("*", function (req, res) {
    res.render("404");
  });
};
