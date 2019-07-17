const User = require('../../models/User');

module.exports = async function authenticate(strategy, email, displayName, done) {
    if (!email) {
        return done(null, false, "Не указан email")
    }
    const qw = await User.findOne({email : email})
    if (qw) {
      return done(null, qw, "Удачно");
    } else {
      try {
            var a = await User.create({email, displayName})
            //var as = await User.findOne({email : email})
            return done(null, a, "Удачно");
      } catch (e) {
            return done(e, false, "Некорректный email.");
      }
    }
};
