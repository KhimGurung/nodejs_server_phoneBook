const http = require("http");

const port = process.env.PORT || 3000;

const backend = require("./backend");

const server = http.createServer(backend);

server.listen(port);
