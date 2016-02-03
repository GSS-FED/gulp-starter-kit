'use strict';

var config       = require('../config');
var gulp         = require('gulp');
var gulpif       = require('gulp-if');
var plumber      = require('gulp-plumber');
var concat       = require('gulp-concat');
var uglify       = require('gulp-uglify');
var header       = require('gulp-header');
var browserSync  = require('browser-sync');

var handleErrors = require('../util/handleErrors');
var pkg          = require('../../package.json');

gulp.task('scripts', function () {

  // Will concat all scripts together (do this in vendor.js)
  // var willConcat = config.scripts.output? true : false;

  return gulp.src(config.scripts.src)
    .pipe(plumber({errorHandler: function(error) {
      handleErrors(error, 'JS');
      this.emit('end');
    }}))
    // .pipe(gulpif(
    //   willConcat,
    //   concat(config.scripts.output || './somethingfake')
    // ))
    // 將 code 混淆並壓縮
    .pipe(gulpif( global.isProd, uglify() ))
    .pipe(gulpif(
      global.isProd, 
      header(config.banner.header, {pkg: pkg}) 
    )) // Header Banner
    .pipe(gulp.dest(config.scripts.dest))
    .pipe(gulpif(
      global.isWatching, 
      browserSync.stream({ once: true })
    ));
});
