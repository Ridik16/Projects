const { src, dest, parallel, series, watch } = require("gulp");
const scss         = require("gulp-sass")(require("sass"));
const browserSync  = require("browser-sync").create();
const rename       = require("gulp-rename");
const concat       = require("gulp-concat");
const uglify       = require("gulp-uglify-es").default;
const autoprefixer = require("gulp-autoprefixer");
const cleancss     = require("gulp-clean-css");
const imagemin     = require("gulp-imagemin");
const newer        = require("gulp-newer");
const del          = require("del");
const group_media  = require("gulp-group-css-media-queries");
const ttf2woff = require("gulp-ttf2woff");
const ttf2woff2 = require("gulp-ttf2woff2");


 
// npm i browser-sync --save-dev
function browsersync(params) {
  browserSync.init({
    // Server config.
    server: { baseDir: '#src' },//можна попробувати указати "./"

    // port: 3000,
    notify: false,
  });
}

// npm i --save-dev gulp-rename
// npm i --save-dev gulp-sass
// npm i --save-dev gulp-autoprefixer
// npm i --save-dev gulp-clean-css
function styles(){
  return src(path.src.css)
    .pipe(scss())
    .pipe(
      rename({
        extname: ".min.css", //adding to file (min)
      })
    )
    .pipe(
      autoprefixer({
        overrideBrowserslist: ["last 5 versions"], //support of last 5 vers. of browser
        grid: true,
        // cascade: true, // and the style of the prefix writing
      })
    )
    .pipe(dest(path.build.css))
    .pipe(cleancss( { level: { 1: { specialComments: 0 } }/* , format: 'beautify' */ } )) // Минифицируем стили
    .pipe(dest(path.build.css))
    .pipe(dest("#src/css/"))
    .pipe(browserSync.stream()); //update page 

}

function media() {
  return src("#src/css/media-queris.css")
    .pipe(group_media())
    .pipe(rename({ extname: ".min.css" }))
    .pipe(dest(path.build.css))
    .pipe(cleancss( { level: { 1: { specialComments: 0 } }/* , format: 'beautify' */ } ))
    .pipe(dest(path.build.css))
    .pipe(dest("#src/css/"))
    .pipe(browserSync.stream()); //update page
}

//npm install --save-dev gulp-ttf2woff
//npm install --save-dev gulp-ttf2woff2
function fonts(params) {
  src("#src/fonts/src/**/*")
  .pipe(ttf2woff())
  .pipe(dest("#src/fonts/dest/"));

  return src("#src/fonts/src/**/*")
  .pipe(ttf2woff2())
  .pipe(dest("#src/fonts/dest/")) 
}

// npm i --save-dev gulp-concat
function scripts(){
  return src(path.src.js)
  .pipe(
    rename({
      extname: ".min.js",
    })
  )
  .pipe(uglify())
  .pipe(dest(path.build.js))
  .pipe(dest("#src/js/"))
  .pipe(browserSync.stream()); //update page 

}

function html() {
  return src(path.src.html)
    .pipe(dest(path.build.html)) // transfer data from (src) to destination
    .pipe(dest("#src/"))
    .pipe(browserSync.stream()); //update page
}

// npm i --save-dev gulp-imagemin
// npm i --save-dev gulp-newer ()not minimize, minimazed images
function images() {
  return src("#src/img/src/**/*")
    .pipe(newer("#src/img/dest/"))
    .pipe(
      imagemin({
        interlaced: true,
        progressive: true,
        optimizationLevel: 3,
        svgoPlugins: [{ removeViewBox: false }],
      })
    )
    .pipe(dest("#src/img/dest/")); // transfer data from (src) to destination
}

function cleanimg(){
  return del("#src/img/dest/**/*", { force: true });
}

function cleandist() {
  return del(project_folder + "/**/*", { force: true });
}

function buildCopy(){
  return src([
    '#src/css/main.min.css',
		'#src/fonts/dest/**/*',
		'#src/js/**/*.min.js',
		'#src/img/dest/**/*',
		'#src/**/*.html',
  ], { base: "#src"})
  .pipe(dest(project_folder));
}

function startWatch(params) {
  watch("#src/scss/main.scss", styles);
  watch("#src/css/media-queris.css", media); 
  watch([path.watch.js], scripts);
  watch([path.watch.html], html);
  watch([path.watch.img], images);
}

let project_folder = 'dist';
let source_folder = '#src';

// obj wich contain different pathes to files and folders
let path = {
  // pathes to final files(optimazed)
  build: {
    html: project_folder + "/",
    css: project_folder + "/css/",
    js: project_folder + "/js/",
    img: project_folder + "/img/",
    fonts: project_folder + "/fonts/",
  },
  //pathes to (src) files
  src: {
    html: source_folder + "/*.html",
    css: source_folder + "/scss/main.scss",
    js: source_folder + "/js/index.js",
    img: source_folder + "/img/**/*", // (**) only images
    fonts: source_folder + "/fonts/*.ttf",
  },
  //obj with pathes to files which we have to listen always and at every change, show result
  watch: {
    html: source_folder + "/**/*.html",
    css: source_folder + "/scss/**/*.scss", 
    js: source_folder + "/js/**/*.js",
    img: source_folder + "/img/**/*", // (**) only images
  },
  clean: "./" + project_folder + "/",
};


exports.fonts       = fonts;
exports.browsersync = browsersync;
exports.scripts     = scripts;
exports.styles      = styles; 
exports.media       = media; 
exports.html        = html;
exports.images      = images;
exports.cleanimg    = cleanimg;

exports.build = series(cleandist, styles, media, fonts, scripts, images, buildCopy);
exports.default = parallel(styles, media, fonts, scripts, browsersync, startWatch);
