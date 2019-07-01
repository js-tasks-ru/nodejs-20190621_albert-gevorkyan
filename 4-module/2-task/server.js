const url = require('url');
const http = require('http');
const path = require('path');
const fs = require('fs')
const LimitSizeStream = require('./LimitSizeStream');
const server = new http.Server();

server.on('request', (req, res) => {
        const limitedStream = new LimitSizeStream({ limit: 1048576}); // 8 байт
        const pathname = url.parse(req.url).pathname.slice(1);
        if (pathname.split('/').length > 1) {
            res.statusCode = 400;
            res.end('Not implemented');
            return
        }
        const filepath = path.join(__dirname, 'files', pathname);
        const filepath1 = path.join(__dirname, 'files');

        if (!fs.existsSync(filepath1)) {
            fs.mkdir(filepath1, () => {
            })
        }
        if (fs.existsSync(filepath)) {
            res.statusCode = 409;
            res.end('Not implemented');
            return
        }
        const stream  = fs.createWriteStream(filepath)
        limitedStream.pipe(stream)
        req.pipe(limitedStream)

        limitedStream.on('error', () => {
            res.statusCode = 413;
            res.end('Not implemented');
            fs.unlink(filepath, () => {

            })
        })
        req.on('data', function(chunk) {
            limitedStream.write(chunk)
        });
        req.on('end', () => {
            res.statusCode = 201;
            res.end('a')
        })
        server.on('clientError', (err, socket) => {
            fs.unlink(filepath, () => {

            })
        })
  switch (req.method) {
    case 'POST':
      break;
    default:
      res.statusCode = 501;
      res.end('Not implemented');
  }
});

module.exports = server;
