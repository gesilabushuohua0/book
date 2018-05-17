let gulp = require("gulp");

let sass = require("gulp-sass");
let autoprefixer = require("gulp-autoprefixer")
let minJs = require("gulp-clean-css")
let minHtml = require("gulp-htmlmin")

let clean = require("gulp-clean");
let sequence = require("gulp-sequence");
let server = require("gulp-webserver")
gulp.task("clean", function() {
    return gulp.src("build")
})
gulp.task("css", function() {
    return gulp.src(["./src/css/*.css", "!./src/css/*.min.css"])
        .pipe(sass())
        .pipe(autoprefixer({
            borwsers: ["last 2 versions", "Android>=4.0"]
        }))
        .pipe(minJs())
        .pipe(gulp.dest("build/css"))
})
gulp.task("copyCss", function() {
    return gulp.src("./src/css/*.min.css")
        .pipe(gulp.dest("build/css"))
})
gulp.task("minHtml", function() {
    return gulp.src("./src/*.html")
        .pipe(minHtml())
        .pipe(gulp.dest("build"))
})
gulp.task("watch", function() {
    gulp.watch("./src/css/*.scss", ["css"])
    gulp.watch("./src/*.html", ["minHtml"])
})
gulp.task("server", ["css", "copyCss", "minHtml"], function() {
    gulp.src("build")
        .pipe(server({
            port: 3535,
            open: true,
            livereload: true,
            host: "localhost"
        }))
})
gulp.task("default", function(cb) {
    sequence("clean", ["watch", "server"], cb)
})