'use strict';

var config      = require('../config');
var gulp        = require('gulp');
var runSequence = require('run-sequence');

gulp.task('dev', function(cb) {

  global.isProd = false;

  runSequence(config.tasks.dev, 'watch', cb);

});