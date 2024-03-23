const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const express = require('express');

const util = require('./util/helper');

const ip = '192.168.1.6';
const port = 4000;

const app = express();
app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));


app.get('/',util.getFiles);
app.use(util.getFile);

app.listen(port, ip, () => {
    console.log(`Server running at http://${ip}:${port}/`);
  });