// gulpプラグインの読み込み
var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var mqpacker = require('css-mqpacker');

// タスクを作成する
gulp.task('compile', function () {
	// ファイルを取得
	return gulp.src('scss/*.scss')
		// Sassのコンパイルを実行
		.pipe(sourcemaps.init())
		.pipe(sass({ outputStyle: 'expanded' }))
		.pipe(postcss(autoprefixer,mqpacker))
		/// ファイルを保存
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('css/'));
});

gulp.task('watch', function () {
	gulp.watch('scss/*.scss', ['compile']).on('change', browserSync.stream());
	gulp.watch('*.html').on('change', browserSync.reload);
});

gulp.task('browser-sync', function () {
	browserSync.init({
		server: {
			baseDir: './'
		}
	});
});

gulp.task('server', ['browser-sync','compile','watch']);
gulp.task('compile', ['compile']);
