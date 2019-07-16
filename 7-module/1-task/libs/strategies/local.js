const LocalStrategy = require('passport-local').Strategy;
const User = require('../../models/User');

module.exports = new LocalStrategy(
    {session: false, usernameField: 'email',},
    async function(username, password, done) {
        const Usera = await User.findOne({email: username})
        if (!Usera) {
            done(null, false, 'Нет такого пользователя');
            return
        }
        const s = await Usera.checkPassword(password)
        if (s) {
            done(null, Usera, {"token": "185e0c3a-d5a4-4211-8efe-1c377d8fd99d"});
            return
        } else {
            done(null, false,'Невереный пароль');
            return
        }
    }
);
