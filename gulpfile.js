// tutorials:
// https://css-tricks.com/gulp-for-beginners/
// http://stackoverflow.com/questions/31163754/browser-sync-does-not-refresh-page-after-changes-with-gulp
// http://stackoverflow.com/questions/21679844/livereload-of-index-html-with-gulp
// https://www.npmjs.com/package/gulp-stylus
// http://codehangar.io/concatenate-and-minify-javascript-with-gulp/
// https://quickleft.com/blog/setting-up-a-clientside-javascript-project-with-gulp-and-browserify/

var gulp          = require('gulp');
var sass          = require('gulp-ruby-sass');
var browserSync   = require('browser-sync').create();
var reload        = browserSync.reload;
var cleanCSS      = require('gulp-clean-css');
var stylus        = require('gulp-stylus');
var less          = require('gulp-less');
var path          = require('path');
var jshint        = require('gulp-jshint');
var concat        = require('gulp-concat');
var rename        = require('gulp-rename');
var uglify        = require('gulp-uglify');
var jquery        = require('jquery');
var browserify    = require('browserify');


var jsFiles = 'client/js/*.js',
    jsDest = '.';

// Uncomment for stylus or less
gulp.task('watch', function(){
  gulp.watch('client/stylesheets/scss/*.scss', ['sass']);
  // gulp.watch('client/stylesheets/stylus/*.styl', ['stylus']);
  // gulp.watch('client/stylesheets/less/*.less', ['less']);
  gulp.watch('*.js', ['jshint']);
  gulp.watch('client/js/*.js', ['scripts']);
  // reloads browser
  gulp.watch("*.html").on("change", reload);
  gulp.watch("*.js").on("change", reload);
});

gulp.task('sass', function(){
    sass('client/stylesheets/scss/*.scss')
        .on('error', sass.logError)
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest('client/stylesheets/css'))
        // injects changes into browser when change of scss:
        .pipe(browserSync.stream({match: '**/*.css'}));
});

gulp.task('less', function() {
   return gulp.src('client/stylesheets/less/*.less')
      .pipe(less({
      paths: [ path.join(__dirname, 'less', 'includes') ]
    }))
      .pipe(cleanCSS({compatibility: 'ie8'}))
      .pipe(gulp.dest('client/stylesheets/css'))
      .pipe(browserSync.stream({match: '**/*.css'}));
});

gulp.task('stylus', function(){
    return gulp.src('client/stylesheets/stylus/*.styl')
        .pipe(stylus())
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest('client/stylesheets/css'))
        // injects changes into browser when change of stylus:
        .pipe(browserSync.stream({match: '**/*.css'}));
});

gulp.task('jshint', function() {
  return gulp.src('*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('scripts', function() {
    return gulp.src(jsFiles)
        .pipe(concat('client/compiledJS/concat.js'))
        .pipe(gulp.dest(jsDest))
        .pipe(rename('app.js'))
        .pipe(uglify())
        .pipe(gulp.dest(jsDest));
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
  });
});



