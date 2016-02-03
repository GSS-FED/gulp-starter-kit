'use strict';

var config      = require('../config');
var changed     = require('gulp-changed');
var gulp        = require('gulp');
var gulpif      = require('gulp-if');
var filter      = require('gulp-filter');
var imagemin    = require('gulp-imagemin');
var browserSync = require('browser-sync');

gulp.task('images', function() {

  // Filtering
  var f = filter(config.images.filter, { restore: true })

  return gulp.src(config.images.src)
    // Ignore unchanged files
    .pipe(changed(config.images.dest))
    // Filtering
    .pipe(f)
    .pipe(gulpif(global.isProd, imagemin())) // Optimize
    // get all images files (unfiltered)
    .pipe(f.restore)
    .pipe(gulp.dest(config.images.dest))
    .pipe(gulpif(
      global.isWatching, 
      browserSync.stream({ once: true })
    ));

});