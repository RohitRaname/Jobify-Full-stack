const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;

module.exports = () =>
  new GoogleStrategy(
    {
      clientID:
        "955546282095-1ieslfdvomora5qc5kq1643vfa7esvlc.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL: "http://localhost:4000/auth/google/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      userProfile = profile;
      return done(null, userProfile);
    }
  );
