var babel = require( 'gulp-babel' );
var browserSync = require( 'browser-sync' );
var config = require( '../config' );
var eslint = require( 'gulp-eslint' );
var gulp = require( 'gulp' );
var gulpIf = require( 'gulp-if' );
var inject = require( 'gulp-inject-string' );
var uglify = require( 'gulp-uglify' );
var include = require( 'gulp-include' );
var notify = require( 'gulp-notify' );
var reload = browserSync.reload;
var sourcemaps = require( 'gulp-sourcemaps' );

var isDev = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';
var isProd = process.env.NODE_ENV  === 'prod';

// concat and trinspile all js
gulp.task( 'js', function() {
	gulp.src( config.src.js + '**/*.js' )
		.pipe( gulpIf( isDev, sourcemaps.init() ) )
		.pipe( include() )
		.on( 'error', function() {
			notify( 'Javascript include error' );
		})
		.pipe( babel({
			presets: [ 'es2015-script' ],
			minified: true
		}) )
		.on( 'error', function( error ) {
			notify.onError({
				title: 'JS Babel Error!',
				message: error.message
			});
			this.emit( 'end' );
		})
		.pipe( gulpIf( isDev, sourcemaps.write( './' ) ) )
		.pipe( gulpIf( isProd, uglify() ) )
		.pipe( gulp.dest( config.dest.js ) )
		.pipe( reload({ stream: true }) );
});


// watch js files and run [js] task after file changed
gulp.task( 'js:watch', function() {
	gulp.watch( config.src.js + '*', [ 'js' ] );
});


// lint js files
gulp.task( 'jslint', function() {
	gulp.src( [ config.src.js + '**/*.js' ] )
		.pipe( eslint() )
		.pipe( eslint.format( 'codeframe' ) );
});


// watch js files and run [jslint] task after file changed
gulp.task( 'jslint:watch', function() {
	gulp.watch( config.src.js + '*', [ 'jslint' ] );
});
