var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefix = require('gulp-autoprefixer');
 
gulp.task('css', function() {
  gulp.src('css/**/*.scss')
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(autoprefix({ browsers: ['> 1%'], remove: false }))
    .pipe(gulp.dest('css/'));
});

gulp.task('watch', ['css'], function() {
  gulp.watch('css/**/*.scss', ['css']);
});

gulp.task('default', ['css']);
