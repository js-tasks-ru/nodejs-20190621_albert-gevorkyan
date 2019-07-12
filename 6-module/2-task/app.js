const Koa = require('koa');
const Router = require('koa-router');
const Category = require('./models/Category');
const Product = require('./models/Product');
const { productsBySubcategory, productList, productById } = require('./controllers/products');
const { categoryList } = require('./controllers/categories');

const app = new Koa();

app.use(async (ctx, next) => {
  try {
    ctx.request.Product = Product
    ctx.request.Category = Category
    await next();
  } catch (err) {
    if (err.status) {
      ctx.status = err.status;
      ctx.body = {error: err.message};
    } else {
      console.error(err);
      ctx.status = 500;
      ctx.body = {error: 'Internal server error'};
    }
  }
});

const router = new Router({prefix: '/api'});

router.get('/categories', categoryList);
router.get('/products', productsBySubcategory, productList);
router.get('/products/:id', productById);

app.use(router.routes());

module.exports = app;
