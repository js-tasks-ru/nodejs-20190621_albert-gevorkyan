const Order = require('../models/Order');

module.exports.checkout = async function checkout(ctx, next) {
    try {
        var asd = await Order.create({
            user: ctx.user,
            product: ctx.request.body.product,
            phone: ctx.request.body.phone,
            address: ctx.request.body.address
        })
        ctx.body = {order : asd._id};
    } catch (e) {
        var f = {errors : {}}
        for (var i in e.errors) {
            f.errors[i] = e.errors[i].message
        }
        ctx.status = 400
        ctx.body = f
    }
};

module.exports.getOrdersList = async function ordersList(ctx, next) {
    var ords = await Order.find({ user: ctx.user._id }).populate('product')
    ctx.body = {orders: ords}
};
