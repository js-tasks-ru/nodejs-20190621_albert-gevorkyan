const mongoose = require('mongoose');
module.exports.productsBySubcategory = async function productsBySubcategory(ctx, next) {
    var Product = ctx.request.Product
    try {
        var a = await Product.find(ctx.query)
        var json = []
        for await (var a of a) {
            json.push({
                id: a._id,
                title: a.title,
                images: a.images,
                category: a.category,
                subcategory: a.subcategory,
                price: a.price,
                description: a.description
            })
        }
        ctx.body = { products: json };
    } catch (e) {
        next()
    }
};

module.exports.productList = async function productList(ctx, next) {
  ctx.body = { products: [] };
};

module.exports.productById = async function productById(ctx, next) {
    var Product = ctx.request.Product
    try {
        var a = await Product.findOne({_id: ctx.params.id})
        if (a) {
            ctx.body = { product: {
                    id: a._id,
                    title: a.title,
                    images: a.images,
                    category: a.category,
                    subcategory: a.subcategory,
                    price: a.price,
                    description: a.description
                }
            }
        } else {
            ctx.status = 404
        }
    } catch (e) {
        ctx.throw(400, 'asd')
    }

};
