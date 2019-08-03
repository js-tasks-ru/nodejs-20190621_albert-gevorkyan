const uuid = require('uuid/v4');
const User = require('../models/User');
const sendMail = require('../libs/sendMail');

module.exports.register = async (ctx, next) => {
    const token = uuid()
    var Usera = new User
    await Usera.setPassword(ctx.request.body.password)
    Usera.email = ctx.request.body.email
    Usera.displayName = ctx.request.body.displayName,
    Usera.verificationToken = token
    try {
        await User.create(Usera)
        await sendMail({
            template: 'confirmation',
            locals: {token},
            to: Usera.email,
            subject: 'Подтвердите почту',
        });
        return ctx.body = {status: 'ok'}
    } catch (e) {
        e.errors.email = e.errors.email.message;
        var a = { errors: e.errors};
        ctx.status = 400
        ctx.body = a
    }
};

module.exports.confirm = async (ctx, next) => {
    const tok = ctx.request.body.verificationToken
    var user = await User.findOne({verificationToken : tok})
    if (!user) {
        ctx.throw(400, 'Ссылка подтверждения недействительна или устарела')
    }
    user.verificationToken = undefined
    await user.save()
    ctx.body = {token: uuid()}
};
