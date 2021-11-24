var gulp  = require( 'gulp' );
var include = require( 'gulp-include' );
var config = require( '../config' );
var notify = require( 'gulp-notify' );
var browserSync = require( 'browser-sync' );
var reload = browserSync.reload;
var newer = require( 'gulp-newer' );


// copy all html files form /src directory
gulp.task( 'html', function() {
	gulp.src( config.src.root + '*.html' )
		.pipe( include() )
		.on( 'error', function() {
			notify( 'HTML include error' );
		})
		//.pipe( newer( config.dest.root ) )
		.pipe( gulp.dest( config.dest.root ) )
		.pipe( reload({
			stream: true
		}) );
});


// watch *.html files and copy when changed
gulp.task( 'html:watch', function() {
	gulp.watch( [
		config.src.root + '*.html',
		config.src.root + 'partials/*.html'
	], [ 'html' ] );
});
