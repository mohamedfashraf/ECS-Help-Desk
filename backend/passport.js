const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");
const TwoFATotpStrategy = require("passport-2fa-totp").Strategy;

const User = require("./Models/usersModelSchema");
passport.use(
  new TwoFATotpStrategy(
    function (user, done) {
      // Get the user's TOTP secret from the database
      User.findById(user.id, function (err, user) {
        if (err) {
          return done(err);
        }
        if (!user) {
          return done(null, false);
        }
        return done(null, user, user.totpSecret);
      });
    },
    function (user, totpToken, done) {
      // Verify TOTP token
      const isValid = speakeasy.totp.verify({
        secret: user.totpSecret,
        encoding: "base32",
        token: totpToken,
      });

      if (isValid) {
        return done(null, true);
      } else {
        return done(null, false);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});
