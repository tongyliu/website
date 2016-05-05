var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefix = require('gulp-autoprefixer');
var browserify = require('browserify');
var babelify = require('babelify');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var source = require('vinyl-source-stream');
 
gulp.task('css', function() {
  gulp.src('css/**/*.scss')
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(autoprefix({ browsers: ['> 1%'], remove: false }))
    .pipe(gulp.dest('css/'));
});

gulp.task('js', function() {
  browserify(['js/main.js'])
    .transform(babelify, { presets: ['react'] })
    .bundle()
    .on('error', function(e) { console.log(e.message); this.emit('end'); })
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('js/'));
});

gulp.task('minify-js', ['js'], function() {
  gulp.src('js/bundle.js')
    .pipe(uglify())
    .pipe(rename('bundle.min.js'))
    .pipe(gulp.dest('js/'));
});

gulp.task('watch', ['css'], function() {
  gulp.watch('css/**/*.scss', ['css']);
  gulp.watch('js/main.js', ['js']);
});

gulp.task('default', ['css', 'js']);
