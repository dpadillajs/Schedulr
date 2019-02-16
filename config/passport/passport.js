var db = require("../../models");
var bCrypt = require("bcrypt-nodejs");
module.exports = function(passport, client) {
  var Client = client;
  var LocalStrategy = require("passport-local").Strategy;

  //serialize
  passport.serializeUser(function(client, done) {
    done(null, client.id);
  });

  // deserialize user
  passport.deserializeUser(function(id, done) {
    db.Client.findById(id).then(function(client) {
      if (client) {
        done(null, client.get());
      } else {
        done(client.errors, null);
      }
    });
  });

  //LOCAL SIGNUP
  passport.use(
    "local-signup",
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true // allows us to pass back the entire request to the callback
      },
      function(req, email, password, done) {
        var generateHash = function(password) {
          return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
        };
        db.Client.findOne({
          where: {
            email: email
          }
        }).then(function(client) {
          if (client) {
            return done(null, false, {
              message: "That email is already taken"
            });
          } else {
            var clientPassword = generateHash(password);
            var data = {
              email: email,
              password: clientPassword,
              bus_name: req.body.bus_name,
              first_apt: req.body.first_apt + ":00",
              last_apt: req.body.last_apt + ":00"
            };
            db.Client.create(data).then(function(newClient, created) {
              if (!newClient) {
                return done(null, false);
              }
              if (newClient) {
                return done(null, newClient);
              }
            });
          }
        });
      }
    )
  );

  //LOCAL SIGNIN
  passport.use(
    "local-signin",
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true
      },
      function(req, email, password, done) {
        var Client = client;
        var isValidPassword = function(userpass, password) {
          return bCrypt.compareSync(password, userpass);
        };
        db.Client.findOne({
          where: {
            email: email
          }
        })
          .then(function(client) {
            if (!client) {
              return done(null, false, {
                message: "Email does not exist"
              });
            }
            if (!isValidPassword(client.password, password)) {
              return done(null, false, {
                message: "Incorrect password."
              });
            }
            var clientinfo = client.get();
            return done(null, clientinfo);
          })
          .catch(function(err) {
            console.log("Error:", err);
            return done(null, false, {
              message: "Something went wrong with your Signin"
            });
          });
      }
    )
  );
};
