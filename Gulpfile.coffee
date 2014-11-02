gulp = require 'gulp'
$ = require('gulp-load-plugins')({ camelize: true })
del = require 'del'
ignore = require 'gulp-ignore'
pngcrush = require 'imagemin-pngcrush'
args = require('yargs').argv
path = require 'path'
connect = require('gulp-connect')

# Environments
# To change environment add the --env=prod argument
DEVELOPMENT = 'dev'
PRODUCTION = 'prod'

config =
  environment : args.env || DEVELOPMENT
  root: './app'
  sass_path: 'app/assets/css/scss/'
  css_path: 'app/assets/css/'
  coffee_path: 'app/assets/js/coffee/'
  js_path: 'app/assets/js/'
  libs_path: 'app/assets/js/libs/'
  images_path: 'app/assets/images/'
  vendors_path: 'app/assets/vendors'
  sass_includes: [
    'vendors/bourbon/dist/bourbon.scss'
    'vendors/neat/app/assets/stylesheets/neat.scss'
    'vendors/normalize-scss/normalize.scss'
  ],
  public_path: './public'
  port: 35729

# Prepend sass path to includes
config.sass_includes.unshift config.sass_path

# Prepend the CWD to each SASS include (above)
config.sass_includes = config.sass_includes.map (includePath) ->
  path.join process.cwd(), includePath

onError = (err) ->
  $.util.beep()
  console.log err
  $.notify().write(err)

gulp.task('styles', ->
  gulp.src config.sass_path + 'styles.scss'
    .pipe $.plumber
      errorHandler: onError
    .pipe $.scssLint()
    .pipe $.rubySass
      sourcemap: config.environment is not PRODUCTION
      trace: true
      precision: 10
      loadPath: config.sass_includes
      style: if config.environment is PRODUCTION then 'compressed' else 'expanded'
    .pipe gulp.dest config.css_path
    .pipe $.pleeease
      fallbacks:
        autoprefixer: ['last 4 versions', 'ie 9', '> 5%']
      optimizers:
        minifier: if config.environment is PRODUCTION then true else false
      sourcemap: true
    .pipe $.if config.environment is PRODUCTION, $.combineMediaQueries
      log: true
    .pipe $.if config.environment is PRODUCTION, $.csscomb()
    .pipe $.if config.environment is PRODUCTION, $.compressor
      'compress-css': true
    .pipe gulp.dest config.css_path
    .pipe connect.reload()
)

# Scripts
gulp.task 'scripts', ->
  gulp.src config.coffee_path + '**/*.coffee'
    .pipe $.plumber
      errorHandler: onError
    .pipe $.coffeelint()
    .pipe $.coffeelint.reporter()
    .pipe $.coffee
      bare: true
    .pipe $.if config.environment is PRODUCTION, $.uglify()
    .pipe $.concat 'app.js'
    .pipe gulp.dest config.js_path
    .pipe connect.reload()

gulp.task 'gulplint', ->
  gulp.src './gulpfile.coffee'
    .pipe $.plumber
      errorHandler: onError
    .pipe $.coffeelint('./coffeelint.json')
    .pipe $.coffeelint.reporter()

# Vendors
files = [
  config.vendors_path + '/angular/angular.js'
  config.vendors_path + '/angular-route/angular-route.js'
  config.vendors_path + '/angular-animate/angular-animate.js'
  config.vendors_path + '/angular-sanitize/angular-sanitize.js'
  config.vendors_path + '/angular-placeholder-tai/lib/tai-placeholder.js'
  config.vendors_path + '/angular-modal-service/dst/angular-modal-service.js'
  config.vendors_path + '/angular-elastic/elastic.js'
  config.vendors_path + '/moment/moment.js'
  config.vendors_path + '/underscore/underscore.js'
]

gulp.task 'move', ->
  if files.length
    gulp.src files
    .pipe gulp.dest config.libs_path

gulp.task 'vendors', ['move'], ->
  gulp.src(config.libs_path + '*.js')
  .pipe $.concat('plugins.js')
  .pipe $.if config.environment is PRODUCTION, $.uglify()
  .pipe gulp.dest config.js_path

# Images
gulp.task 'images', ->
  gulp.src config.images_path + '/**/*.{jpg, png, svg}'
    .pipe $.plumber
      errorHandler: onError
    .pipe $.cache $.imagemin
      interlaced: true
      progressive: true
      svgoPlugins:
        removeViewBox: false
      use:
        pngcrush()
    .pipe gulp.dest config.images_path
    .pipe connect.reload()

gulp.task 'server', ->
  connect.server
    root: 'app'
    port: 8000
    livereload: true

# Production Tasks
gulp.task 'clean', (cb) ->
  del([config.public_path], cb)

gulp.task 'moveImages', ->
  gulp.src config.images_path + '/**/*'
    .pipe gulp.dest config.public_path + '/assets/images'

gulp.task 'moveData', ->
  gulp.src config.root + '/data/*'
    .pipe $.jsonminify()
    .pipe gulp.dest config.public_path + '/data'

gulp.task 'moveViews', ->
  gulp.src config.root + '/views/**/*'
    .pipe gulp.dest config.public_path + '/views'

gulp.task 'moveFavicon', ->
  gulp.src config.root + '/favicon.ico'
    .pipe gulp.dest config.public_path

gulp.task 'compile', ['moveData', 'moveViews', 'moveFavicon', 'moveImages'], ->
  gulp.src config.root + '/*.html'
    .pipe $.usemin
      js: [$.ngAnnotate(), $.uglify(), $.rev()]
      css: [$.rev()]
      html: [$.minifyHtml({empty: true})]
    .pipe gulp.dest config.public_path

# Default build tasks
gulp.task 'default', ['gulplint', 'server', 'build'], ->
  gulp.watch config.sass_path + '**/*.scss', ['styles']
  gulp.watch config.js_path + '**/*.js', ->
    connect.reload()
  gulp.watch(config.root + '**/*.html').on 'change', ->
    connect.reload()

gulp.task 'build', [
  'styles'
  'vendors'
]

gulp.task 'build:public', [
  'build'
  'clean'
  'compile'
]