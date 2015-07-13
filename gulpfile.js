var gulp = require('gulp'),
	imagemin = require('gulp-imagemin'),
	del = require('del'),
	path = require('path');

gulp.task('img',function() {
	var img_src = './www/resource/img/*';
  var img_des = './www/resource/img';
	return gulp.src(img_src)
        .pipe(imagemin())
        .pipe(gulp.dest(img_des));
});

gulp.task('default', function() {
  return gulp.start('img')
});