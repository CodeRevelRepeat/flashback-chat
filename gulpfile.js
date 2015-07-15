var gulp = require('gulp');
var browserify = require('browserify');
var concat = require('gulp-concat');
var shell = require('gulp-shell');
var rename = require('gulp-rename');
var reactify = require('reactify');
var source = require('vinyl-source-stream');
var clean = require('gulp-clean');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var cssmin = require('gulp-cssmin');
var runSequence = require('run-sequence');
var stylish = require('jshint-stylish');


// file path structure
var paths = {
  scripts: ['public/**/*.js'],
  html: ['public/**/*.html'],
  server: ['server/**/*.js'],
};

gulp.task('copy', function() {
  gulp.src(paths.html)
    .pipe(gulp.dest('dist/'));
  gulp.src('public/assets/**')
    .pipe(gulp.dest('dist/assets'))
});

gulp.task('lint', function() {
  return gulp.src('./public/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter(stylish));
});

// on every new build, wipe previous build files
gulp.task('clean', function() {
  return gulp.src(['dist/js', 'dist/index.html', 'dist/asset'], {
    read: false
  })
    .pipe(clean());
});

gulp.task('compile', function() {
  var b = browserify();
  b.transform(reactify);
  b.add('./public/js/main.js');
  return b.bundle()
    .pipe(source('main.js'))
    .pipe(gulp.dest('./dist/js'));

});

gulp.task('compress', function() {
  gulp.src('./dist/js/main.js')
    .pipe(uglify())
    .pipe(rename('main.min.js'))
    .pipe(gulp.dest('./dist/js'));
  gulp.src('./public/styles.css')
    .pipe(cssmin())
    .pipe(gulp.dest('./dist/css'));
});

gulp.task('run', shell.task([ 
  'cd server && nodemon server.js'
]));


gulp.task('build', function(callback) {
  runSequence('lint', 'clean', 'compile', 'copy', 'compress', callback);
});

gulp.task('default', ['build', 'watch', 'run']);

gulp.task('watch', function() {
  gulp.watch('public/**/*.*', ['build']);
});

