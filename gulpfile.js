'use strict';

const del = require('del');
const gulp = require('gulp');
const babel = require('gulp-babel');
const notice = require('gulp-notice');

gulp.task('clean', () => {
  del([
    'dist/**/*',
    '!dist/',
    '!dist/.gitkeep'
  ]);
});

gulp.task('transpile', ['clean'], () =>
  gulp.src([
    'src/**/*.js'
  ])
  .pipe(babel())
  .pipe(notice())
  .pipe(gulp.dest('dist'))
);

gulp.task('default', ['transpile']);
