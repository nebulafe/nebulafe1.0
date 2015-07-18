var gulp = require('gulp'),
	imagemin = require('gulp-imagemin'),
	del = require('del'),
	path = require('path'),
	sass = require('gulp-ruby-sass'),
	livereload = require('gulp-livereload'),
	notify = require('gulp-notify');

gulp.task('img',function() {
	var img_src = './www/resource/img/*';
  var img_des = './www/resource/img';
	return gulp.src(img_src)
        .pipe(imagemin())
        .pipe(gulp.dest(img_des));
});
gulp.task('styles', function() {
	return sass( './www/resource/scss/pages', { style: 'expanded' })
		.pipe(gulp.dest('./www/resource/css'))
		.pipe(livereload())
		.pipe(notify({ message: 'SCSS编译完成' }));
});
gulp.task('default', function() {
  return gulp.start('img')
});
gulp.task('watch', function() {
	livereload.listen();
	gulp.watch('./www/resource/scss/pages/*.scss', ['styles']);
});