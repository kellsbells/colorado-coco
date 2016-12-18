/**
 * Define extensions, paths
 */

var gulp = require( 'gulp' ),
	sass = require( 'gulp-sass' ),
	prefix = require( 'gulp-autoprefixer' ),
	cssnano = require( 'gulp-cssnano' ),
	concat = require( 'gulp-concat' ),
	uglify = require( 'gulp-uglify' ),
	rename = require( 'gulp-rename' ),
	jshint = require( 'gulp-jshint' ),
	notify = require( 'gulp-notify' ),
	livereload = require( 'gulp-livereload' ),
	imagemin = require( 'gulp-imagemin' ),
	bower = require( 'gulp-bower' ),
	path = {
		WATCH_JS: [
			'assets/js/*.js',
			'assets/js/**/*.js'
		],
		WATCH_CSS: [
			'assets/scss/*.scss',
			'assets/scss/**/*.scss'
		],
		JS: 'assets/js/',
		CSS: 'assets/scss/',
		IMG: 'assets/img/',
		FONT: 'assets/fonts/',
		VENDOR: 'assets/vendor/',
		BUILD: 'assets/build',
		DIST: 'assets/dist'
	};


/**
 * Install Tasks
 */

// Install Bower components
gulp.task( 'install', function() {
	return bower( path.VENDOR )
		.pipe( gulp.dest( path.VENDOR ) );
} );


/**
 * Development Tasks
 */

// Compile Sass files
gulp.task( 'sass', function() {
	gulp.src( [ path.CSS + '*.scss', path.CSS + '**/*.scss' ] )
		.pipe( sass()
			.on( 'error', notify.onError( {
				message: 'Sass failed. Check console for errors'
			} ) )
			.on( 'error', sass.logError ) )
		.pipe( prefix({ browsers: '> 1%, not ie <=8' }) )
		.pipe( gulp.dest( path.BUILD ) )
		.pipe( livereload() )
		.pipe( notify( 'Sass successfully compiled' ) );
} );

// Lint JS
gulp.task( 'lint', function() {
	gulp.src( [ path.JS + '*.js', path.JS + '**/*.js' ] )
		.pipe( jshint() )
		.pipe( jshint.reporter( 'default' ) )
			.on( 'error', notify.onError( function( file ) {
				if ( !file.jshint.success ) {
					return 'JSHint failed. Check console for errors';
				}
			} ) );
} );

// Compile JS
gulp.task( 'js', [ 'lint' ], function() {
	gulp.src( path.WATCH_JS )
		.pipe( concat( 'scripts.js' ) )
		.pipe( livereload() )
		.pipe( gulp.dest( path.BUILD ) )
		.pipe( notify( 'JS successfully compiled' ) );
} );

// Build Angular App (Optional)
/* gulp.task( 'ngApp', function() {
	// ng-annotate, concatenate, minify
	gulp.src( [ path.NG_APP ] )
		.pipe( concat( 'dashboard-app.js' ) )
		.pipe( ngAnnotate() )
			.on( 'error', notify.onError( 'Error: <%= error.message %>' ) )
		.pipe( gulp.dest( path.BUILD ) )
		.pipe( livereload() )
		.pipe( notify( 'App successfully compiled' ) );
} ); */

// Default
gulp.task( 'default', [ 'sass', 'js' ] );


/**
 * Production Tasks
 */

// Concatenate, minify, move style files
gulp.task( 'buildCss', function() {
	gulp.src( [ path.BUILD + '/*.css', path.BUILD + '/**/*.css' ] )
		.pipe( rename({ suffix: '.min' }) )
		.pipe( cssnano() )
		.pipe( gulp.dest( path.DIST ) );
} );

// Concatenate, minify, move script files
gulp.task( 'buildJs', function() {
	gulp.src( [ path.BUILD + '/*.js', path.BUILD + '/**/*.js' ] )
		.pipe( rename({ suffix: '.min' }) )
		.pipe( uglify() )
		.pipe( gulp.dest( path.DIST ) );
} );

// Optimize images
gulp.task( 'compressImgs', function() {
	return gulp.src( [ path.IMG + '*.*', path.IMG + '**/*.*' ] )
		.pipe( imagemin() )
		.pipe( gulp.dest( path.IMG ) );
} );

// Build tasks
gulp.task( 'watch', function() {
	gulp.watch( path.WATCH_JS, [ 'js' ] );
	gulp.watch( path.WATCH_CSS, [ 'sass' ] );
	
	livereload.listen();
} );
gulp.task( 'stage', [ 'buildCss', 'buildJs' ] );
gulp.task( 'prod', [ 'buildCss', 'buildJs', 'compressImgs' ] );
