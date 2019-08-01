const mode = process.env.NODE_ENV || 'development';
const dev = mode === 'development';
const prod = mode === 'production';
var started = false;

const gulp          = require('gulp');
const del           = require('del');
const rename        = require('gulp-rename');
const nodemon       = require('gulp-nodemon');
const browserSync   = require('browser-sync').create();
//const webpack       = require('webpack-stream');
//const babel         = require('gulp-babel');
const rollup        = require('gulp-better-rollup');
const resolve       = require('rollup-plugin-node-resolve');
const commonjs      = require('rollup-plugin-commonjs');
const babel         = require('rollup-plugin-babel');
const replace       = require('rollup-plugin-replace');
const scss          = require('rollup-plugin-scss');

/*
 React Webpack bug on watch does not build
 React gulp-babel not working. Need to double checks
 React Rollup work but take a lot config correct.
*/
//https://stackoverflow.com/questions/51291553/how-to-bundle-react-app-with-rollup
//https://github.com/rollup/rollup/issues/487
//var frontend_config = require('./webpack.config.js');
var frontrollupconfig = {
    //input: 'src/main.js',
    external: [
        //'react', 
        //'react-proptypes'
    ],
    plugins: [
        scss({
            //output: true,
            output: 'public/bundle.css',
            //output: function (styles, styleNodes) {
                //writeFileSync('public/global.css', styles)
            //},
        }),
        resolve({
            browser: true,
        }),
        replace({
            'process.env.NODE_ENV': JSON.stringify('development')
        }),
        babel({
			exclude: "node_modules/**"
		}),
		commonjs({
            include: [
                'node_modules/**',
            ],
            exclude: [
                'node_modules/process-es6/**',
            ],
            namedExports: {
                'node_modules/react/index.js': ['Children', 'Component', 'PropTypes', 'createElement'],
                'node_modules/react-dom/index.js': ['render'],
            }
        }),
    ]
}

function frontend_build(done){
    return gulp.src('./src/client/index.js')
        .pipe(rollup(frontrollupconfig, 'umd'))
        //.pipe(webpack(frontend_config))
        /*
        .pipe(babel({
            // transpile ES6 to ES5
            presets: [
                "@babel/preset-env",
                "@babel/preset-react"
            ]
        }))
        */
        .pipe(rename('bundle.js'))
        .pipe(gulp.dest('public/'));
}
exports.frontend_build = frontend_build;


//===============================================
//
//===============================================
function backend_build(done){
    /*
    return gulp.src('./app.js')
		//.pipe(babel({
            //presets: ['@babel/preset-env', { modules: false }],
            //presets: ['@babel/preset-env'],
            //plugins: [
                //["add-module-exports"],
                //["@babel/plugin-syntax-dynamic-import"]
            //]
        //}))
        .pipe(rename('backend.js'))
        .pipe(gulp.dest('./'))
        */
    done();
}
exports.backend_build = backend_build;
async function cleanbundle(done){
    //del.sync([ 'public/bundle.js']);
    //return done();
    //return del.sync([ 'public/bundle.js']);
    //del.sync([ 'public/bundle.js'], done)
    del('./public/bundle.js', done)
}
exports.cleanbundle = cleanbundle;


function serve(done){
    var stream = nodemon({
        //nodemon: require('nodemon'),
        //script: 'backend.js',
        script: 'app.js',
        //watch:['src/client'],
        watch:['public/'],
        ext: 'js html scss',
        ignore: ['gulpfile.js','webpack.config.js','node_modules/','data/'],
        //tasks: ['cleanscript'],
        done: done,
	}).on('start', function () {
        console.log('===================================');
        console.log('started!');
		// to avoid nodemon being started multiple times
		// thanks @matthisk
		if (!started) {
			done();
			started = true; 
        } 
        console.log('started END=========!');
    }).on('restart', function () {
        console.log('===================================');
        console.log('restarted!');
        //cleanscript();
        if(browserSync){
            browserSync.reload();
        }
    }).on('crash', function() {
        console.log('===================================');
        console.error('Application has crashed!\n');
        stream.emit('restart', 5);  // restart the server in 5 seconds
    });
    return stream;
}
exports.serve = serve;
function refreshbrowser(cb){
    browserSync.reload();
    return cb();
}
exports.refreshbrowser = refreshbrowser;


async function cleanlib(done){
    del.sync([ './public/gunjstrustsharekey.js' ]);
    return done();
}
exports.cleanlib = cleanlib;

function lib_test(done){
    return gulp.src('./src/common/gunjstrustsharekey.js')
        .pipe(gulp.dest('public/'));
    //done();
}
exports.lib_test = lib_test;

function watch(done) {
    gulp.watch(['./server.js','./src/server/**/*.*'], gulp.series(backend_build));
    //gulp.watch(['./src/client/**/*.*'], gulp.series( cleanbundle, frontend_build, lib_test, refreshbrowser));
    //gulp.watch(['./src/common/**/*.*'], gulp.series( cleanlib, lib_test));
    //gulp.watch(['./src/client/**/*.*'], gulp.series( cleanbundle, frontend_build));
    gulp.watch(['./src/client/**/*.*'], gulp.series( frontend_build, copy_html));
    gulp.watch(['./src/common/**/*.*'], gulp.series( cleanlib, lib_test));
    
    return done();
}
exports.watch = watch;
function browser_sync(done){
    browserSync.init({
        proxy: "localhost:8080"
        ,files:['pulbic/**/*.*']
        //,browser: 'chrome'
        //,browser: 'firefox'
    });
    return done();
}
exports.browser_sync = browser_sync;
function copy_html(done){
    return gulp.src('src/client/index.html')
        .pipe(gulp.dest('public/'));
}
exports.copy_html = copy_html;
function copy_css(done){
    /*
    return gulp.src('src/client/global.css')
        .pipe(gulp.dest('public/'));
        */
    done()
}
exports.copy_css = copy_css;
function copy_svg(done){
    return gulp.src('src/client/icons/*.svg')
        .pipe(gulp.dest('public/'));
}
exports.copy_svg = copy_svg;

const build = gulp.series(
    frontend_build, 
    //backend_build, 
    //copy_css, 
    copy_html,
    //copy_svg, 
    watch, 
    serve, 
    //browser_sync,
    lib_test
);

const cleanscript = gulp.series(cleanbundle, frontend_build, lib_test);
exports.cleanscript = cleanscript;
const buildscript = gulp.series( frontend_build, lib_test);
exports.buildscript = buildscript;

/*
 * Export a default task
 */
exports.default  = build;