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
  title: `King's Reach – LiF:YO game server`
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
  res.render('pages/index', baseViewModel);
});
app.get('/index', async (req, res) => {
  res.render('pages/index', baseViewModel);
});
app.get('/rules', async (req, res) => {
  res.render('pages/rules', baseViewModel);
});
app.get('/events', async (req, res) => {
  res.render('pages/events', baseViewModel);
});
app.get('/screenshots', async (req, res) => {
  res.render('pages/screenshots', baseViewModel);
});
app.get('/contact', async (req, res) => {
  res.render('pages/contact', baseViewModel);
});
app.get('/monetary-system', async (req, res) => {
  res.render('pages/monetary-system', baseViewModel);
});
app.get('/map', async (req, res) => {
  res.render('pages/map', baseViewModel);
});

//
// Run
//
app.listen(httpPort, () => console.log(`Listening on port ${httpPort}`));
