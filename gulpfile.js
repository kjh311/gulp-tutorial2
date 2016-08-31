// tutorial:
// https://css-tricks.com/gulp-for-beginners/

var gulp = require('gulp');
var sass = require('gulp-ruby-sass');
var browserSync = require('browser-sync').create();


gulp.task('sass', function(){
    sass('scss/styles.scss')
        .on('error', sass.logError)
        .pipe(gulp.dest('css'))
        // injects changes into browser when change of scss:
        .pipe(browserSync.stream({match: '**/*.css'}));
});

gulp.task('watch', function(){
  gulp.watch('scss/styles.scss', ['sass']);
});

browserSync.init({
    // injects changes instead of browser reload
    injectChanges: true,
    // base location of index.html:
    server: "."
});

gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'app'
    },
  })
})







