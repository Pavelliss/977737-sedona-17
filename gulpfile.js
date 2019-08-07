"use strict";
//подключение зависимостей
var gulp = require("gulp");
var plumber = require("gulp-plumber"); //сообщение об ошибке
var sourcemap = require("gulp-sourcemaps"); //для DeleveperTools
var less = require("gulp-less"); //преобразовывает LESS в CSS
var postcss = require("gulp-postcss"); //для перобразования CSS
var autoprefixer = require("autoprefixer");
var server = require("browser-sync").create(); //локальный сервер
var csso = require("gulp-csso"); //минимизация css
var rename = require("gulp-rename"); //изменение имени
var imagemin = require("gulp-imagemin"); //оптимизация изображения
var webp = require("gulp-webp");
var svgstore = require("gulp-svgstore"); //sprite SVG
var posthtml = require("gulp-posthtml");
var include = require("posthtml-include");
var del = require("del");

//less в css
gulp.task("css", function () {
  return gulp.src("source/less/style.less")
    .pipe(plumber()) //сообщение об ошибке
    .pipe(sourcemap.init()) //Начало записи преобразований для DeleveperTools
    .pipe(less()) //преобразовывает LESS в CSS
    .pipe(postcss([
      autoprefixer()
    ])) // autoprefixer с помощью postcss
    .pipe(csso()) //минимизация css
    .pipe(rename("style.min.css")) //пререименовывает файл
    .pipe(sourcemap.write(".")) //запись всех изменений для DeleveperTools
    .pipe(gulp.dest("build/css")) //положили контент в папку deck
    .pipe(server.stream()); //перзапуск сервера
});

//оптимизация графики
gulp.task("images", function () {
  return gulp.src("source/img/**/*.{png,jpg,svg}")
    .pipe(imagemin([
      imagemin.optipng({optimizationLevel: 3}),
      imagemin.jpegtran({progressive: true}),
      imagemin.svgo()
    ]))
    .pipe(gulp.dest("source/img"));
});

//webp
gulp.task("webp", function () {
  return gulp.src("source/img/**/*.{png,jpg}")
    .pipe(svg)
    .pipe(webp({quality: 90}))
    .pipe(gulp.dest("source/img"));
});

//sprite SVG
gulp.task("sprite", function () {
  return gulp.src("source/img/logo-htmlacademy.svg")
    .pipe(svgstore({
      inlineSvg: true
    }))
    .pipe(rename("sprite.svg"))
    .pipe(gulp.dest("build/img"));
});

//posthtml
gulp.task("html", function () {
  return gulp.src("source/*.html")
    .pipe(posthtml([
      include()
    ]))
    .pipe(gulp.dest("build"));
})

//копирование файлов из source
gulp.task("copy", function() {
  return gulp.src([
    "source/fonts/**/*.{woff,woff2}",
    "source/img/**",
    "source/js/*",
    "sourse/*.ico"
  ], {
    base: "source"
  })
    .pipe(gulp.dest("build"));
});

//удаление файлов
gulp.task("clean", function () {
  return del("build");
});

//перезапуск сервера
gulp.task("refresh", function (done) {
  server.reload();
  done();
});

//запуск сервера
gulp.task("server", function () {
  server.init({
    server: "build/",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch("source/less/**/*.less", gulp.series("css"));
  gulp.watch("source/*.html", gulp.series("html", "refresh"));
});

//сборка
gulp.task("build", gulp.series(
  "clean",
  "copy",
  "css",
  "sprite",
  "html"))
gulp.task("start", gulp.series("build", "server"));
