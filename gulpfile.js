// tutorial:
// https://css-tricks.com/gulp-for-beginners/

var gulp = require('gulp');
var sass = require('gulp-ruby-sass');
var browserSync = require('browser-sync').create();


gulp.task('sass', function(){
    sass('scss/styles.scss')
        .on('error', sass.logError)
        .pipe(gulp.dest('css'))
});

gulp.task('watch', function(){
  gulp.watch('scss/styles.scss', ['sass']);
});

gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'app'
    },
  })
})







