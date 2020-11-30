'use strict'

const { series, parallel } = require('gulp');
var gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync'),
    del = require('del'),
    imagemin = require('gulp-imagemin'),
    uglify = require('gulp-uglify'),
    usemin = require('gulp-usemin'),
    rev = require('gulp-rev'),
    cleanCss = require('gulp-clean-css'),
    flatmap = require('gulp-flatmap'),
    htmlmin = require('gulp-htmlmin');


gulp.task('sass', function(cb){
    gulp.src('./css/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./css'));
    cb()
})

gulp.task('sass:watch', function(cb){
    gulp.watch('./css/*.scss', ['sass']);
    cb()
});

gulp.task('browser-sync', function(cb) {
    var files = ['./*.html', './css/*.css', './img/*.{png, jpg, gif}', './js*.js'];
    browserSync.init(files, {
        server: {
            baseDir: './'
        }
    });
    cb()
});

gulp.task('default', gulp.series('browser-sync', function(cb){
    gulp.series('sass:watch');
    cb()
  }));

gulp.task('clean', function(){
    return del(['dist']);
});

gulp.task('copyfonts', function(cb){
    gulp.src('./node_modules/open-iconic/font/fonts/*.{ttf, woff, eof, svg, eot, otf}*')
    .pipe(gulp.dest('./dist/fonts'));
    cb()
});

gulp.task('imagemin', function(){
    return gulp.src('./images/*')
    .pipe(imagemin({optimizationLevel: 3, progresive: true, interlaced:true}))
    .pipe(gulp.dest('dist/images'));
})

gulp.task('usemin', function(){
    return gulp.src('./*html')
    .pipe(flatmap(function(stream, file){
        return stream
        .pipe(usemin({
            css: [rev()],
            html: [function() { return htmlmin({collapseWhitespace: true})}],
            js: [uglify(), rev()],
            inlinejs: [uglify()],
            inlinecss: [cleanCss(), 'concat']

        }));
    }))
    .pipe(gulp.dest('dist/'));
});

  exports.build = series(
    'clean',
    parallel('copyfonts', 'imagemin', 'usemin', 'default')
  );

 /* gulp.task('build', gulp.series('clean', function(cb){
    gulp.parallel('copyfonts', 'imagemin', 'usemin');
    cb()
  }));*/