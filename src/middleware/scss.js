const sassMiddleware = require('node-sass-middleware');
const path = require('path');
const workdir = process.cwd();

module.exports = exports = sassMiddleware({
  src: path.join(workdir, 'public', 'scss'),
  dest: path.join(workdir, 'public', 'css'),
  prefix: '/public/css',
  outputStyle: 'compressed',
  debug: process.env.NODE_ENV === 'development'
});
