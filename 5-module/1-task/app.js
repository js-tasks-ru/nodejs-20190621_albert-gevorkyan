const Koa = require('koa');
const app = new Koa();

app.use(require('koa-static')('./public'));
app.use(require('koa-bodyparser')());

const Router = require('koa-router');
const router = new Router();

var arr = []
router.get('/subscribe', async (ctx, next) => {
    const a = await new Promise((resolve, reject) => {
        arr.push(resolve)
    })
    ctx.body = a
});
router.post('/publish', async (ctx1, next1) => {
    const aaa = ctx1.request.body.message
    if (aaa) {
        for (var i in arr) {
            arr[i](aaa)
        }
        ctx1.body = 'gg'
        arr = []
    }
});



app.use(router.routes());

module.exports = app;
