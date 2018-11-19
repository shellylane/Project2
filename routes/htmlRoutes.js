var db = require("../models");
var passport = require("../config/passport");

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
      res.render("user", {users: dbUsers});
    });
    // {
    //   email: dbUsers.email,
    //   password: dbUsers.password,
    //   firstName: dbUsers.firstName,
    //   lastName:  dbUsers.lastName,
    //   phoneNumber: dbUsers.phoneNumber,
    //   role: dbUsers.role
    // }


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
  app.get("/forum", passport.authenticate("local"), function (req, res) {
    res.render("forum")
});


  // Render 404 page for any unmatched routes
  app.get("*", function (req, res) {
    res.render("404");
  });
};
