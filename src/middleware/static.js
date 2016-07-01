const express = require('express');
const path = require('path');
const workdir = process.cwd();

const staticPath = path.join(workdir, 'public');
const staticOptions = { redirect: false };

module.exports = exports = express.static(staticPath, staticOptions);
