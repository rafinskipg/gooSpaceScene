var gulp = require('gulp'),
    lr = require('tiny-lr'),
    gutil = require('gulp-util'),
    watch = require('gulp-watch'),
    livereload = require('gulp-livereload'),
    open = require("gulp-open"),
    server = lr();
var connect = require('connect')
  , http = require('http');




gulp.task("url", function(){
var app = connect()
  .use(connect.logger('dev'))
  .use(connect.static('app'))
  .use(function(req, res){
    res.end('hello world\n');
  })

  http.createServer(app).listen(3000);
  var options = {
    url: "http://localhost:3000",
    app: "firefox"
  };
  gulp.src("./app/index.html")
  .pipe(open("", options));
});

gulp.task('default', function(){
  server.listen(35729, function (err) {
    if (err) return console.log(err);

    
  });
  gulp.run('url')
  return gulp.src('app/**.**')
        .pipe(watch())
        .pipe(livereload(server));
});