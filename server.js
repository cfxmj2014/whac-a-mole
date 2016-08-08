'use strict';

const express = require('express');
const path = require('path');
const minimist = require('minimist');
const argv = minimist(process.argv.slice(2));
const app = express();

app.use('/', express.static(__dirname));

app.get('/index', function (req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
});

const PORT = argv.port || 8078;
app.listen(PORT, function() {
    console.log('Production Express server running at localhost:' + PORT);
});
