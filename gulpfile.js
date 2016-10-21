var gulp = require('gulp');
var less = require('gulp-less');
var LessAutoprefix = require('less-plugin-autoprefix');
var autoprefix = new LessAutoprefix({ browsers: ['last 2 versions'] });

gulp.task('default', function () {
    // place code for your default task here
    return gulp.src('src/*.less')
        .pipe(less({
            plugins: [autoprefix]
        }))
        .pipe(gulp.dest('dist'));

});
gulp.task('watch', function () {
      gulp.watch('src/*.less', ['default']);
});


module.exports = gulp;