const url = require('url');
const http = require('http');
const path = require('path');
const fs = require('fs')
const server = new http.Server();

server.on('request', (req, res) => {
  const pathname = url.parse(req.url).pathname.slice(1);

  const filepath = path.join(__dirname, 'files', pathname);

  if (pathname.split('/').length > 1) {
      res.statusCode = 400;
      res.end('Not implemented');
      return
  }
  if (!fs.existsSync(filepath)) {
      res.statusCode = 404;
      res.end('Not implemented');
      return
  } else {
      fs.unlink(filepath, () => {
          res.statusCode = 200;
          res.end('good');
      })
  }
  switch (req.method) {
    case 'DELETE':

      break;

    default:
      res.statusCode = 501;
      res.end('Not implemented');
  }
});

module.exports = server;
