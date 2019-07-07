const url = require('url');
const http = require('http');
const path = require('path');
const fs = require('fs')
const LimitSizeStream = require('./LimitSizeStream');
const server = new http.Server();

server.on('request', (req, res) => {
        const limitedStream = new LimitSizeStream({ limit: 1048576 }); // 8 байт
        const pathname = url.parse(req.url).pathname.slice(1);

        if (pathname.split('/').length > 1) {
            res.statusCode = 400;
            res.end('Not implemented');
            return
        }

        const filepath = path.join(__dirname, 'files', pathname);
        const filepath1 = path.join(__dirname, 'files');

        if (fs.existsSync(filepath)) {
            res.statusCode = 409;
            res.end('Not implemented');
            return
        } else {
            const stream  = fs.createWriteStream(filepath) //создание стрима
            req.pipe(limitedStream) //перенапровление стрима
            limitedStream.pipe(stream) //перенапровление стрима

            limitedStream.on('error', () => { // ошибка большой файл
                fs.unlink(filepath, () => {
                    res.statusCode = 413;
                    res.end('Not implemented');
                })
            })

            stream.on('close', () => { // успешное чтение и запись
                res.statusCode = 201;
                res.end('Not implemented');
            })
            res.on('close', ()=> {
                if (res.finished) return
                fs.unlink(filepath, () => {

                })
            })

        }
  switch (req.method) {
    case 'POST':

      break;

    default:
      res.statusCode = 501;
      res.end('Not implemented');
  }
});
module.exports = server;
