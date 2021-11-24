var gulp = require( 'gulp' );
var gulpSequence = require( 'gulp-sequence' );


gulp.task( 'watch', [
	'sprite:watch',
	'sass:watch',
	'copy:watch',
	'html:watch',
	'font:watch',
	'js:watch'
] );


gulp.task( 'default', function( cb ) {
	gulpSequence(
		[ 'clean' ],
		[
			'html', 'font', 'sprite', 'copy',
			'js', 'sass', 'jslint', 'scss-lint'
		],
		[ 'server', 'watch' ]
	)( cb );
});


gulp.task( 'build', function( cb ) {
	gulpSequence(
		[ 'clean' ],
		[
			'html', 'font', 'sprite', 'copy',
			'js', 'jslint', 'sass', 'scss-lint'
		]
	)( cb );
});
