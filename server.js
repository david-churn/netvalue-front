'use strict';
// 5/6/2019 David Churn created for deployment

const express = require('express');
const serveStatic = require('serve-static');
const path = require('path');

let app = express();
app.use(serveStatic(path.join(__dirname,'dist')));

const port = process.env.PORT || 8080;
app.listen(port);
