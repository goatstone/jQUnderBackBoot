//var gulp = require('gulp');

var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
     clean = require('gulp-clean'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache') ;

gulp.task('default', function () {

    return gulp.src('js/goatstone/**/*.js')
        .pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter('default'))
//        .pipe(concat('gulp_test.js'))
        .pipe(gulp.dest('dist/assets/js'))
//        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest('dist/assets/js'))
        .pipe(notify({ message: 'Scripts task complete' }));

});


//gulp.task('scripts', function() {
//    return gulp.src('src/scripts/**/*.js')
//        .pipe(jshint('.jshintrc'))
//        .pipe(jshint.reporter('default'))
//        .pipe(concat('main.js'))
//        .pipe(gulp.dest('dist/assets/js'))
//        .pipe(rename({suffix: '.min'}))
//        .pipe(uglify())
//        .pipe(gulp.dest('dist/assets/js'))
//        .pipe(notify({ message: 'Scripts task complete' }));
//});
//
