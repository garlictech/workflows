"use strict";
const compression = require('compression')
const express = require('express'),
    path = require('path');

const HOST = require('./constants').HOST;
const PROD_PORT = require('./constants').PROD_PORT;

const app = express();
const ROOT = '/app';

app.use(compression());
app.use(express.static('/app/artifacts/dist'));

const renderIndex = (req, res) => {
    res.sendFile('/app/artifacts/dist/index.html');
}

app.get('/*', renderIndex);

const PORT = PROD_PORT;

app.listen(PORT, () => {
    console.log(`Listening on: http://${HOST}:${PORT}`);
});