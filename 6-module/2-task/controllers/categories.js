const Category = require('../models/Category');
module.exports.categoryList = async function categoryList(ctx, next) {
    var req = await Category.find({})
    var cat = { categories: [] }
    for await (var i of req) {
        var json = {
            id : i._id,
            title : i.title,
            subcategories:[ ]
        }
        for await (var j of i.subcategories) {
            json.subcategories.push({
                id: j._id,
                title : j.title,
            })
        }
        cat.categories.push(json)
    }
      ctx.body = cat;
};
