const fs = require('fs');
const http = require('http');
const path = require('path');

const server = http.createServer((req, res) => {

});

server.listen(4000, () => {
    console.log(`Server running at http://localhost:4000/`);
  });