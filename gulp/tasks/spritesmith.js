var gulp = require( 'gulp' );
var notify = require( 'gulp-notify' );
var spritesmith = require( 'gulp.spritesmith' );
var config = require( '../config' );


// generate image sprite from images from /src/img/icons directory
gulp.task( 'sprite', function() {
	var spriteData = gulp.src( config.src.img + '/icons/*.png' )
		.pipe( spritesmith({
			imgName: 'icons.png',
			cssName: '_sprite.sass',
			imgPath: '../img/icons.png',
			cssFormat: 'sass',
			padding: 10,
			cssTemplate: config.src.helpers + '/sprite.template.mustache'
		}) );

	// create sprite image
	spriteData.img
		.pipe( gulp.dest( config.dest.img ) );

	// create sprite scss file
	spriteData.css
		.pipe( gulp.dest( config.src.sass + '/lib/' ) )
		.pipe( notify( 'New sprite created!' ) );
});


// watch image files and run [sprite] task after file changed
gulp.task( 'sprite:watch', function() {
	gulp.watch( config.src.img + '/icons/*.png', [ 'sprite' ] );
});
