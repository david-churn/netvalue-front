'use strict';
// 5/6/2019 David Churn created for deployment
// 5/8/2019 David Churn added history for server.

const express = require('express');
const history = require('connect-history-api-fallback');
const serveStatic = require('serve-static');
const path = require('path');

const app = express();
app.use(history());
app.use(serveStatic(path.join(__dirname,'dist')));

const port = process.env.PORT || 8080;
app.listen(port);
