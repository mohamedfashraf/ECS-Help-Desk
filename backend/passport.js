const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");
const User = require("./Models/usersModelSchema");
passport.use(
  new GoogleStrategy(
    {
      clientID:
        "800074608513-94s3bg2052vimipftcafhogmlnqkcumi.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL: "http://localhost:3000/auth/google/callback/",
      scope: ["profile", "email"],
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Search for existing user
        let user = await User.findOne({ googleId: profile.id });
        if (!user) {
          user = new User({
            googleId: profile.id,
            name: profile.displayName,
            email: profile.emails[0].value,
            isOAuthUser: true,
          });

          await user.save(); // Save the new user
        }

        return done(null, user); // User is either found or newly created
      } catch (err) {
        return done(err); // Handle errors
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
