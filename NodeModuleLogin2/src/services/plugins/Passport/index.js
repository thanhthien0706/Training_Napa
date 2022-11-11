const GitHubStrategy = require("passport-github2").Strategy;

const RoleService = require("../../web/RoleService");
const UserService = require("../../web/UserService");

function HandlePassport(passport) {
  passport.serializeUser(function (user, done) {
    done(null, user);
  });

  passport.deserializeUser(function (user, done) {
    done(null, user);
  });

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
            const checkUser = await UserService.checkExists({
              "github.username": profile.username,
            });
            if (checkUser) {
              return done(null, false);
            }

            const role = await RoleService.findOneByName("ROLE_USER");

            // const newUser =;
            // newUser.github.id = profile.username;
            // newUser.github.token = accessToken;
            // newUser.github.displayName = profile.displayName;
            // newUser.github.username = profile.username;
            // newUser.activity = true;
            // newUser.role = role._id;

            const newUser = {
              "github.id": profile.id,
              "github.token": accessToken,
              "github.displayName": profile.displayName,
              "github.username": profile.username,
              activity: true,
              role: role._id,
            };

            const result = await UserService.saveGitHub(newUser);
            if (result) {
              return done(null, newUser);
            }
          } catch (error) {
            return done(error.message);
          }
        });
      }
    )
  );
}

module.exports = HandlePassport;
