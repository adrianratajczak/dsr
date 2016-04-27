/* File: gulpfile.js */

// grab our packages
var gulp   = require('gulp'),
    jshint = require('gulp-jshint');
    sass   = require('gulp-sass');
    sourcemaps = require('gulp-sourcemaps');
    autoprefixer = require('gulp-autoprefixer');
    browserSync = require('browser-sync').create();
    plumber = require('gulp-plumber');
    notify = require("gulp-notify");

    jsSrc = 'js/**/*.js';
    scssSrc = 'scss/**/*.scss';
    cssPub = 'css';



// configure the jshint task
gulp.task('jshint', function() {
  return gulp.src(jsSrc)
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

// configure the sass task
gulp.task('build-css', function() {
  return gulp.src(scssSrc)

    .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(cssPub))
    .pipe(browserSync.stream());
});


// browserSync task
gulp.task('browser-sync', function() {
  browserSync.init({
      proxy: "localhost"
  });
  gulp.watch("*.html").on('change', browserSync.reload);

});


// configure which files to watch and what tasks to use on file changes
gulp.task('watch', function() {

  gulp.watch(jsSrc, ['jshint']);
  gulp.watch(scssSrc, ['build-css']);

});

// define the default task and add the watch task to it
gulp.task('default', ['watch', 'browser-sync']);
