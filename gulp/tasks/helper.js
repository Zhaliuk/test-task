var gulp = require( 'gulp' );
var del = require( 'del' );


// clean build directory
gulp.task( 'clean', function() {
	return del( 'build' );
});
