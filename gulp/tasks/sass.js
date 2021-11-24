var autoprefixer = require( 'autoprefixer' );
var cleanCSS = require( 'gulp-clean-css' );
var config = require( '../config' );
var cssimport = require( 'gulp-cssimport' );
var gulp = require( 'gulp' );
var gulpIf = require( 'gulp-if' );
var mqpacker = require( 'css-mqpacker' );
var notify = require( 'gulp-notify' );
var postcss = require( 'gulp-postcss' );
var sass = require( 'gulp-ruby-sass' );
var scsslint = require( 'gulp-scss-lint' );
var sourcemaps = require( 'gulp-sourcemaps' );

var isDev = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';
var isProd = process.env.NODE_ENV  === 'prod';


// build scss files
gulp.task( 'sass', function() {
	var processors = [
		autoprefixer({
			browsers: [ 'last 15 versions' ],
			cascade: false
		}),
		// mqpacker()
	];

	return sass( config.src.sass + '*.scss', {
		sourcemap: isDev,
		style: 'compact',
		emitCompileError: true
	})
	.on( 'error', function( error ) {
		notify.onError({
			title: 'Sass Error!',
			message: error.message
		});
		this.emit( 'end' );
	})
	.pipe( cssimport() )
	.pipe( postcss( processors ) )
	.pipe( gulpIf( isDev, sourcemaps.write( './' ) ) )
	.pipe( gulpIf( isProd, cleanCSS({ debug: true }, ( details ) => {
		var name = details.name;
		var originalSize = details.stats.originalSize;
		var minifiedSize = details.stats.minifiedSize;

		notify( `Original size of ${name}: ${originalSize}` );
		notify( `Minified size ${name}: ${minifiedSize}` );
	}) ) )
	.pipe( gulp.dest( config.dest.css ) );
});


// lint all scss files
gulp.task( 'scss-lint', function() {
	return gulp.src( [
		config.src.sass + '**/*.scss',
		'!' + config.src.sass + '_bootstrap-config.scss',
		'!' + config.src.sass + 'lib/*.*'
	] )
	.pipe( scsslint({
		options: {
			formatter: 'stylish',
			'merge-default-rules': false
		},
		config: '.scss-lint.yml'
	}) );
});


// watch scss files and run [sass] task after file changed
gulp.task( 'sass:watch', function() {
	gulp.watch( config.src.sass + '/**/*', [ 'sass', 'scss-lint' ] );
});
