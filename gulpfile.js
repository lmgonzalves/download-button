var gulp = require('gulp'),
    browserSync = require('browser-sync'),
    sass = require('gulp-sass'),
    prefix = require('gulp-autoprefixer');

gulp.task('serve', ['sass'], function() {
    browserSync.init({
        server: {
            baseDir: "./"
        },
        open: false,
        online: false,
        notify: false
    });

    gulp.watch('scss/*.scss', ['sass']);
    gulp.watch('js/download-button.js');
    gulp.watch(['*.html', 'js/*']).on('change', browserSync.reload);
});

gulp.task('sass', function () {
    return gulp.src('scss/*.scss')
        .pipe(sass({
            outputStyle: 'expanded',
            includePaths: ['scss']
        }))
        .pipe(prefix(['last 5 versions'], {cascade: true}))
        .pipe(gulp.dest('css'))
        .pipe(browserSync.reload({stream:true}));
});

gulp.task('default', ['serve']);
