const gulp = require("gulp");
const less = require("gulp-less");
const cssmin = require("gulp-cssmin");
const del = require("del");
const plumber = require("gulp-plumber");
const connect = require("gulp-connect");
const autoprefixer = require("gulp-autoprefixer");

const paths = {
  dest: "dist/",
  watchSrc: "src/**/*.less",
  targetSrc: ["src/**/*.less", "!src/common/**/*.less"]
};

function clean() {
  return del([paths.dest]);
}

function style() {
  return gulp
    .src(paths.targetSrc)
    .pipe(plumber()) // 防止报错中断task
    .pipe(less())
    .pipe(autoprefixer())
    .pipe(gulp.dest(paths.dest))
    .pipe(connect.reload());
}

function watch() {
  gulp.watch(watchSrc, style);
}

const dev = gulp.series(clean, gulp.parallel(style), gulp.parallel(watch));

gulp.task("default", dev);
