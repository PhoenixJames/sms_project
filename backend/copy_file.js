const http = require('http');
var usb = require('node-hid');


const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {

  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  console.log(usb.devices());
  res.end(`${usb.devices()}`);
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
