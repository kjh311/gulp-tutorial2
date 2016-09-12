// tutorials:
// https://css-tricks.com/gulp-for-beginners/
// http://stackoverflow.com/questions/31163754/browser-sync-does-not-refresh-page-after-changes-with-gulp
// http://stackoverflow.com/questions/21679844/livereload-of-index-html-with-gulp
// https://www.npmjs.com/package/gulp-stylus

var gulp          = require('gulp');
var sass          = require('gulp-ruby-sass');
var browserSync   = require('browser-sync').create();
var reload        = browserSync.reload;
var cleanCSS      = require('gulp-clean-css');
var stylus        = require('gulp-stylus');
var less          = require('gulp-less');
var path          = require('path');

// Uncomment for stylus or less
gulp.task('watch', function(){
  gulp.watch('stylesheets/scss/*.scss', ['sass']);
  // gulp.watch('stylesheets/stylus/*.styl', ['stylus']);
  // gulp.watch('stylesheets/less/*.less', ['less']);
  // reloads browser
  gulp.watch("*.html").on("change", reload);
});

gulp.task('sass', function(){
    sass('stylesheets/scss/*.scss')
        .on('error', sass.logError)
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest('stylesheets/css'))
        // injects changes into browser when change of scss:
        .pipe(browserSync.stream({match: '**/*.css'}));
});

gulp.task('less', function() {
   return gulp.src('stylesheets/less/*.less')
      .pipe(less({
      paths: [ path.join(__dirname, 'less', 'includes') ]
    }))
      .pipe(cleanCSS({compatibility: 'ie8'}))
      .pipe(gulp.dest('stylesheets/css'))
      .pipe(browserSync.stream({match: '**/*.css'}));
});

gulp.task('stylus', function(){
    return gulp.src('stylesheets/stylus/*.styl')
        .pipe(stylus())
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest('stylesheets/css'))
        // injects changes into browser when change of stylus:
        .pipe(browserSync.stream({match: '**/*.css'}));
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



