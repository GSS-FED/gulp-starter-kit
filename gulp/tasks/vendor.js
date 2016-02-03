'use strict';

var config       = require('../config');
var gulp         = require('gulp');
var gulpif       = require('gulp-if');
var plumber      = require('gulp-plumber');
var concat       = require('gulp-concat');
var uglify       = require('gulp-uglify');
var sourcemaps   = require('gulp-sourcemaps');
var postcss      = require('gulp-postcss');
var cssnano      = require('cssnano');
var header       = require('gulp-header');
var handleErrors = require('../util/handleErrors');
var browserSync  = require('browser-sync');
var pkg          = require('../../package.json');

// -------------------------------------
//   Combined Vendors
// -------------------------------------

gulp.task('vendor', ['vendorScripts', 'vendorStyles']);


// -------------------------------------
//   Vendor Scripts
// -------------------------------------

// 將所有 scripts source 包成一個檔案, 以免開發過程中產生太多檔案
gulp.task('vendorScripts', function () {
  return gulp.src(config.vendor.scripts.src)
    .pipe(plumber({errorHandler: function(error) {
      handleErrors(error, 'Vendor Script');
      this.emit('end');
    }}))
    .pipe(concat(config.vendor.scripts.output))
    .pipe(uglify())
    .pipe(gulpif(global.isProd, 
      header(config.banner.header, {pkg: pkg}) 
    )) // Header Banner
    .pipe(gulp.dest(config.vendor.scripts.dest));
});


// -------------------------------------
//   Vendor Styles
// -------------------------------------

gulp.task('vendorStyles', function () {
  return gulp.src(config.vendor.styles.src)
    .pipe(plumber({errorHandler: function(error) {
      handleErrors(error, 'Vendor Styles');
      this.emit('end');
    }}))
    .pipe(concat(config.vendor.styles.output))
    .pipe(postcss([ cssnano() ]))
    .pipe(sourcemaps.write('.'))
    .pipe(gulpif(global.isProd, 
      header(config.banner.header, {pkg: pkg}) 
    )) // Header Banner
    .pipe(gulp.dest(config.vendor.styles.dest));
});

