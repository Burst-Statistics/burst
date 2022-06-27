const gulp = require('gulp');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');

function defaultTask(cb) {
  gulp.src(['./js/src/imprintjs/dist/imprint.js','js/src/burst.js'])
  .pipe(concat('burst-cookieless.js'))
  .pipe(gulp.dest('./js/build'))
  .pipe(concat('burst-cookieless.min.js'))
  .pipe(uglify())
  .pipe(gulp.dest('./js/build'));

  gulp.src('js/src/burst.js')
  .pipe(concat('burst.js'))
  .pipe(gulp.dest('./js/build'))
  .pipe(concat('burst.min.js'))
  .pipe(uglify())
  .pipe(gulp.dest('./js/build'));

  cb();
}

exports.default = defaultTask