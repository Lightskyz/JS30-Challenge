'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var pug = require("gulp-pug");
var cssnano = require('gulp-cssnano');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');

/* Local server */
var browserSync = require("browser-sync").create();

// Build SASS into CSS
gulp.task("build:sass", function() {
    return gulp
        .src(["src/style.scss", "src/challenge/**/*.scss"])
        .pipe(sourcemaps.init())
        .pipe(sass().on("error", sass.logError))
        .pipe(autoprefixer())
        .pipe(rename({ suffix: ".min" }))
        .pipe(cssnano())
        .pipe(sourcemaps.write("."))
        .pipe(gulp.dest("dist"))
        .pipe(browserSync.stream());
});

// Build PUG into HTML
gulp.task("build:pug", function() {
    return gulp
        .src(["src/index.pug", "src/challenge/**/*.pug"])
        .pipe(pug())
        .pipe(gulp.dest("dist"))
        .pipe(browserSync.stream());
});

// Get JS modules from node_modules and concatenate in one file
gulp.task("build:js", function() {
    return gulp
        .src([
            "node_modules/prismjs/prism.js",
            "src/script.js"
        ])
        .pipe(concat("script.js"))
        .pipe(rename({ suffix: ".min" }))
        .pipe(uglify())
        .pipe(gulp.dest("dist"));
});

// Static server
gulp.task("serve", ["build:sass", "build:pug"], function() {
    browserSync.init({
        server: {
            baseDir: "./dist",
            serveStaticOptions: {
                extensions: ["html"]
            }
        }
    });

    gulp.watch(['./src/challenge/**/*.scss', './src/style.scss'], ["build:sass"]);
    gulp.watch(['./src/challenge/**/*.pug', './src/challenge/**/*.js', './src/index.pug'], ["build:pug"]);
});

gulp.task("build", ["build:sass", "build:pug"]);

gulp.task("default", ["serve"]);