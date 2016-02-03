'use strict';

var config      = require('../config');
var gulp        = require('gulp');
var runSequence = require('run-sequence');

gulp.task('prod', ['clean'], function(cb) {

  global.isProd = true;

  runSequence(config.tasks.prod, cb);

});
