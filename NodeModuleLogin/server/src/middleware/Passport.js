const LocalStrategy = require("passport-local").Strategy;
const { UserModel, StatusActive } = require("../model/UserModel");
const RoleController = require("../controller/RoleController");

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
}

module.exports = handlePassport;
