var db = require("../models");

module.exports = function (app) {
  // Load index page
  app.get("/", function (req, res) {
    db.Example.findAll({}).then(function (dbExamples) {
      res.render("index", {
        msg: "Welcome!",
        examples: dbExamples
      });
    });
  });

  // Load example page and pass in an example by id
  app.get("/example/:id", function (req, res) {
    db.Example.findOne({ where: { id: req.params.id } }).then(function (dbExample) {
      res.render("example", {
        example: dbExample
      });
    });
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

  // Render 404 page for any unmatched routes
  app.get("*", function (req, res) {
    res.render("404");
  });
};
