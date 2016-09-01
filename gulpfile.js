// tutorial:
// https://css-tricks.com/gulp-for-beginners/
// http://stackoverflow.com/questions/31163754/browser-sync-does-not-refresh-page-after-changes-with-gulp

var gulp = require('gulp');
var sass = require('gulp-ruby-sass');
var browserSync = require('browser-sync').create();
var reload      = browserSync.reload;

gulp.task('sass', function(){
    sass('scss/styles.scss')
        .on('error', sass.logError)
        .pipe(gulp.dest('css'))
        // injects changes into browser when change of scss:
        .pipe(browserSync.stream({match: '**/*.css'}));
});

gulp.task('watch', function(){
  gulp.watch('scss/styles.scss', ['sass']);
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





// Save a reference to the `reload` method

// Watch scss AND html files, doing different things with each.
// gulp.task('serve', function () {

//     // Serve files from the root of this project
//     browserSync.init({
//         server: {
//             baseDir: "./"
//         }
//     });

//     gulp.watch("*.html").on("change", reload);
// });



