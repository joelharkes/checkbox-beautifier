var gulp = require('gulp');
var rename = require("gulp-rename");
var uglify = require('gulp-minify');


gulp.task('default', function () {
    // place code for your default task here
    return gulp.src('src/*.js')
        .pipe(uglify(
            {
                ext: {
                    min: ".min.js"
                },
                noSource : true
            }
        ))
        //.pipe(rename({suffix : '.min'}))
        .pipe(gulp.dest('dist'));
});