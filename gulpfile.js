var gulp = require('gulp'),
    minifycss = require('gulp-minify-css'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    del = require('del'),
    react = require('gulp-react'),
    sourcemaps = require('gulp-sourcemaps'),
    replace = require('gulp-replace'),
    amdOptimize = require('amd-optimize'),
    bundle = require('gulp-bundle-assets');

var built = 'build';

gulp.task('jsx', function() {
    // Browserify/bundle the JS.
    return gulp.src(['collection*/**/*.js', 'model*/**/*.js', 'component*/**/*.js', '*.js'])
        .pipe(sourcemaps.init())
        .pipe(react())
        .pipe(replace(/jsx!/g, ""))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(built));
});

var amdOptions = {
    paths: {
        jquery: 'assets/common/js/jquery.min',
        react: 'assets/common/js/react-with-addons.min',
        "JSXTransformer": 'assets/common/js/JSXTransformer',
        backbone: 'assets/common/js/backbone-min',
        bootstrap: "assets/common/js/bootstrap.min",
        underscore: 'assets/common/js/underscore',
        jsx: 'assets/common/js/jsx',
        text: 'assets/common/js/text',
        'react.backbone': 'assets/common/js/react.backbone',
        'Scroll': 'assets/common/js/jq_scroll',
        'Page': 'assets/common/js/jquery.page',
        'Swipe': 'assets/common/js/idangerous.swiper.min',
        'MD5': 'assets/common/js/md5',
        jqueryForm: 'assets/common/js/jquery-form',
        birth: 'assets/default/js/birthdate',
        PCAS: 'assets/default/js/PCASClass',
        Confirm: 'assets/common/js/jquery-confirm',
        ajaxFileUpload: 'assets/default/js/ajaxfileupload',
        Ajax: 'assets/common/js/Ajax',
        'Wysiwyg': "assets/common/js/bootstrap-wysiwyg",
        'HotKeys': "assets/common/js/jquery.hotkeys"
    }
}

gulp.task('bundle', ['jsx'], function ()
{
    return gulp.src([built + '/**/*.js', 'assets*/**/*.js'])
        .pipe(amdOptimize('main', amdOptions))
        .pipe(concat('app.js'))
        .pipe(gulp.dest(built))
        .pipe(rename({suffix: '.min'}))   //rename压缩后的文件名
        .pipe(sourcemaps.init())
        .pipe(uglify())    //压缩
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(built));  //输出

});

gulp.task('minify-css', ['clean-css'], function() {
    return gulp.src('./bundle.config.js')
        .pipe(bundle())
        .pipe(gulp.dest('bundle'));
});
gulp.task('clean-css', function(cb) {
    return del(['bundle'], cb)
});

gulp.task('clean', function(cb) {
    return del([built], cb)
});

gulp.task('default', ['bundle', 'minify-css'], function() {
    console.log('Done.');
});