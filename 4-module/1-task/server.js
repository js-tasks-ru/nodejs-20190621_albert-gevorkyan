const url = require('url');
const http = require('http');
const path = require('path');
const fs = require('fs')
const server = new http.Server();

server.on('request', (req, res) => {
  const pathname = url.parse(req.url).pathname.slice(1);
  if (pathname.split('/').length > 1) {
      res.statusCode = 400;
      res.end('Not implemented');
      return
  }
  const filepath = path.join(__dirname, 'files', pathname);

  if (fs.existsSync(filepath)) {
      const stream  = fs.createReadStream(filepath)
      stream.pipe(res)
  } else {
      res.statusCode = 404;
      res.end('Not implemented');
      return
  }
  switch (req.method) {
    case 'GET':

      break;

    default:
      res.statusCode = 501;
      res.end('Not implemented');
  }
});

module.exports = server;
