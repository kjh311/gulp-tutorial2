// tutorials:
// https://css-tricks.com/gulp-for-beginners/
// http://stackoverflow.com/questions/31163754/browser-sync-does-not-refresh-page-after-changes-with-gulp
// http://stackoverflow.com/questions/21679844/livereload-of-index-html-with-gulp


var gulp          = require('gulp');
var sass          = require('gulp-ruby-sass');
var browserSync   = require('browser-sync').create();
var reload        = browserSync.reload;
var cleanCSS      = require('gulp-clean-css');

gulp.task('sass', function(){
    sass('scss/styles.scss')
        .on('error', sass.logError)
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest('css'))
        // injects changes into browser when change of scss:
        .pipe(browserSync.stream({match: '**/*.css'}));
});

gulp.task('watch', function(){
  gulp.watch('scss/styles.scss', ['sass']);
  // reloads browser
  gulp.watch("*.html").on("change", reload);
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
      baseDir: './'
    },
  })
})



