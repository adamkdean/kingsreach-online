'use strict';

require('nomoreunhandledrejections')();

const express = require('express');
const cons = require('consolidate');
const path = require('path');
const morgan = require('morgan');
const scssMiddleware = require('./middleware/scss');
const staticMiddleware = require('./middleware/static');

const workdir = process.cwd();
const httpPort = process.env.HTTP_PORT || 3000;
const app = express();

const baseViewModel = {
  title: `King's Reach – this is a custom title`
};

//
// Setup
//
app.engine('dust', cons.dust);
cons.dust.helpers = require('dustjs-helpers');
app.set('view engine', 'dust');
app.set('views', path.join(workdir, 'views'));

app.use(morgan('combined'));
app.use(scssMiddleware);
app.use('/public', staticMiddleware);

//
// Routes
//
app.get('/', async (req, res) => {
  const viewModel = Object.assign({}, baseViewModel, { test: true });
  res.render('pages/index', viewModel);
});

//
// Run
//
app.listen(httpPort, () => console.log(`Listening on port ${httpPort}`));
