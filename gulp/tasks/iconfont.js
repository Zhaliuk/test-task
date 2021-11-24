var gulp = require( 'gulp' );
var notify = require( 'gulp-notify' );
var iconfont = require( 'gulp-iconfont' );
var consolidate = require( 'gulp-consolidate' );
var config = require( '../config' );
var browserSync = require( 'browser-sync' );
var reload = browserSync.reload;

var fontname = 'svgfont';


// generate icon font from svg images from /src/img/svg directory
gulp.task( 'font', function() {
	return gulp.src( config.src.img + 'svg/*.svg' )
	.pipe( iconfont({
		fontName: fontname,
		prependUnicode: true,
		formats: [ 'ttf', 'woff', 'woff2' ],
		normalize: true,
		fontHeight: 1001,
		fontStyle: 'normal',
		fontWeight: 'normal'
	}) )
	.on( 'error', function( error ) {
		notify.onError({
			title: 'Iconfont Error!',
			message: error.message
		});
		this.emit( 'end' );
	})
	.on( 'glyphs', function( glyphs ) {

		// generate style for svg font
		gulp.src( config.src.helpers + '_svgfont.sass' )
			.pipe( consolidate( 'lodash', {
				glyphs: glyphs,
				fontName: fontname,
				fontPath: 'fonts/',
				className: 'icon'
			}) )
			.pipe( gulp.dest( config.src.sass + 'lib/' ) );

		// generate html file with whole bunch of icons in /build directory
		gulp.src( config.src.helpers + 'icons.html' )
			.pipe( consolidate( 'lodash', {
				glyphs: glyphs,
				fontName: fontname,
				fontPath: 'fonts/',
				className: 'icon',
				htmlBefore: '<i class="icon ',
				htmlAfter: '"></i>',
				htmlBr: ''
			}) )
			.pipe( gulp.dest( config.dest.root ) );
	})
	.pipe( gulp.dest( config.dest.css + 'fonts/' ) )
	.pipe( reload({ stream: true }) )
	.pipe( notify( 'Icon font updated!' ) );
});


// watch svg files and run [font] task after file changed
gulp.task( 'font:watch', function() {
	gulp.watch( config.src.img + 'svg/*', [ 'font' ] );
});
