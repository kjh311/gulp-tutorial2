// tutorial:
// https://css-tricks.com/gulp-for-beginners/

var gulp = require('gulp');
var sass = require('gulp-ruby-sass');
var browserSync = require('browser-sync').create();

gulp.task('hello', function(){
  console.log('hello world!');
});

// gulp.task('sass', function(){
//   return gulp.src('app/scss/styles.scss')
//     .pipe(sass()) // Converts Sass to CSS with gulp-sass
//     .pipe(gulp.dest('app/scss/styles.css'))
// });

// gulp.task('sass', function(){
//     sass('app/scss/styles.scss')
//         .on('error', sass.logError)
//         .pipe(gulp.dest('app/scss/styles2.css'))
// });

gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'app'
    },
  })
})

gulp.task('watch', function(){
  gulp.watch('app/scss/styles.scss', ['sass']);
});

gulp.task('blah', function() {
  // return gulp.src('app/scss/**/*.scss') // Gets all files ending with .scss in app/scss
    // .pipe(sass())
    // .pipe(gulp.dest('app/css'))
    (browserSync.reload({
      stream: true
    }))
});


gulp.task('serve', ['sass'], function() {

    browserSync.init({
        server: "./app"
    });

    gulp.watch('app/scss/styles.scss', ['sass']);
    gulp.watch("app/*.html").on('change', browserSync.reload);
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    sass('app/scss/styles.scss')
        .on('error', sass.logError)
        .pipe(gulp.dest('app/scss/styles2.css'))
        .pipe(browserSync.stream());
});
