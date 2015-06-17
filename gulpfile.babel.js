'use strict';

var $           = require('gulp-load-plugins')();
var browserSync = require('browser-sync').create();
var dateTime    = require('@radioactivehamster/date-time');
var gulp        = require('gulp');
//var less        = require('gulp-less');

$.stachio = require('gulp-stachio');

// Static server
gulp.task('serve', ['style', 'template'], () => {
    browserSync.init({
        open: false,
        server: { baseDir: './dist/' }
    });

    gulp.watch('src/style/**/*.less', ['style']).on('change', browserSync.reload);
    gulp.watch('src/template/**/*.hbs', ['template']).on('change', browserSync.reload);
});

gulp.task('style', () => {
    return gulp.src('./src/style/**/*.less')
        .pipe($.less())
        .pipe(gulp.dest('./dist/css'));
});

gulp.task('template', () => {
    return gulp.src('./src/template/**/*.hbs')
        .pipe($.stachio({ timestamp: dateTime() }))
        .pipe(gulp.dest('./dist'));
});

gulp.task('default', ['serve']);
