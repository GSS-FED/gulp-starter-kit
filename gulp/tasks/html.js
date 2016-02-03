'use strict';

var config         = require('../config');
var gulp           = require('gulp');
var browserSync    = require('browser-sync');
var changed        = require('gulp-changed');
var gulpif         = require('gulp-if');
var plumber        = require('gulp-plumber');
var htmlmin        = require('gulp-htmlmin');
var handleErrors   = require('../util/handleErrors');

gulp.task('html', function() {

  return gulp.src(config.html.src)
    // 當有錯誤, 不會結束程序, 而是丟出錯誤說明
    // ex: 修正錯誤後還會繼續 watch, 不需要重新再下一次指令
    .pipe(plumber({errorHandler: function(error) {
      handleErrors(error, 'HTML');
      // to make sure gulp knows when to end the task that errored out,
      // and it will continue to work once you fix the problem and watch calls it again.
      // (or else it may not automatically detect the changes of files)
      this.emit('end');
    }}))
    // 若是 production 狀態, 壓縮 html 再輸出
    .pipe(gulpif(
      global.isProd, 
      htmlmin(config.html.htmlmin)
    ))
    .pipe(gulp.dest(config.html.dest))
    // 若是 watching 狀態, 一次性做 browser 的更新 (只更動頁面有電話的部份)
    .pipe(gulpif(
      global.isWatching, 
      browserSync.stream({ once: true })
    ));

});