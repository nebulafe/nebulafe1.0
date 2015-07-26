var gulp = require('gulp'),
	imagemin = require('gulp-imagemin'),
	pngquant = require('imagemin-pngquant'),
	sass = require('gulp-sass'),
	livereload = require('gulp-livereload'),
	notify = require('gulp-notify');

gulp.task('img',function() {
	var img_src = './www/resource/simg/*';
  var img_des = './www/resource/img';
	return gulp.src(img_src)
		.pipe(imagemin({
      progressive: true,
      svgoPlugins: [{removeViewBox: false}],
      use: [pngquant()]
    }))
    .pipe(gulp.dest(img_des));
});
gulp.task('styles', function() {
	return gulp.src('./www/resource/scss/pages/**/*.scss')
		.pipe(sass({outputStyle: 'compressed'}))
		.pipe(gulp.dest('./www/resource/css'))
		.pipe(notify({ message: 'SCSS编译完成' }));
});
gulp.task('default', function() {
  return gulp.start('styles' , 'img')
});
gulp.task('watch', function() {
	livereload.listen();
	gulp.watch('./www/resource/scss/pages/**/*.scss', ['styles']);
});