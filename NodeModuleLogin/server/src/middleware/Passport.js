const { UserModel, StatusActive } = require("../model/UserModel");
const RoleController = require("../controller/RoleController");

const LocalStrategy = require("passport-local").Strategy;
const GitHubStrategy = require("passport-github2").Strategy;

function handlePassport(passport) {
  passport.serializeUser(function (user, done) {
    done(null, user);
  });

  passport.deserializeUser(function (user, done) {
    done(null, user);
  });

  passport.use(
    "local-signup",
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
      },
      (email, password, done) => {
        process.nextTick(async () => {
          try {
            const checkUser = await UserModel.exists({ "local.email": email });
            if (checkUser) {
              return done(null, false);
            }

            const role = await RoleController.findOneByField({
              name: "ROLE_USER",
            });

            const newUser = new UserModel();
            newUser.local.email = email;
            newUser.local.password = newUser.generateHash(password);
            newUser.activity = true;
            newUser.role = role._id;

            const result = await newUser.save();
            if (result) {
              return done(null, newUser);
            } else {
              throw err;
            }
          } catch (error) {
            return done(error.message);
          }
        });
      }
    )
  );

  passport.use(
    "local-signin",
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
      },
      async (email, password, done) => {
        try {
          const user = await UserModel.findOne({ "local.email": email });
          if (!user) {
            return done(null, false);
          }

          if (!user.validPassword(password)) {
            return done(null, false);
          }

          return done(null, user);
        } catch (error) {
          return done(error.message);
        }
      }
    )
  );

  passport.use(
    new GitHubStrategy(
      {
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: process.env.GITHUB_URL_CALLBACK,
      },
      function (accessToken, refreshToken, profile, done) {
        process.nextTick(async () => {
          try {
            const checkUser = await UserModel.exists({
              "github.username": profile.username,
            });
            if (checkUser) {
              return done(null, false);
            }

            const role = await RoleController.findOneByField({
              name: "ROLE_USER",
            });

            const newUser = new UserModel();
            newUser.github.id = profile.username;
            newUser.github.token = accessToken;
            newUser.github.displayName = profile.displayName;
            newUser.github.username = profile.username;
            newUser.activity = true;
            newUser.role = role._id;

            const result = await newUser.save();
            if (result) {
              return done(null, newUser);
            } else {
              throw err;
            }
          } catch (error) {
            return done(error.message);
          }
        });
        done(null, { mess: "hello" });
      }
    )
  );
}

module.exports = handlePassport;
