const Product = require('../models/Product');

module.exports.productsByQuery = async function productsByQuery(ctx, next) {
    const q = ctx.query.query
    var r = await Product.find({$text: { $search: q}},
   { score: { $meta: "textScore" } }
).sort( { score: { $meta: "textScore" } } )
    ctx.body = {products: r};
};
