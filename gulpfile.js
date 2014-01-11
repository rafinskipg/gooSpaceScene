var gulp = require('gulp'),
    lr = require('tiny-lr'),
    gutil = require('gulp-util'),
    watch = require('gulp-watch'),
    livereload = require('gulp-livereload'),
    open = require("gulp-open"),
    server = lr(),
    connect = require('connect'), 
    http = require('http');


gulp.task("server", function(){
    var options = {
        url: "http://localhost:3000",
        app: "firefox"
    };
    var app = connect()
            .use(connect.logger('dev'))
            .use(connect.static('app'))
            .use(function(req, res){
                res.end('hello world\n');
            });

    http.createServer(app).listen(3000);

    gulp.src("./app/index.html")
        .pipe(open("", options));
});

gulp.task('default', function(){
  server.listen(35729, function (err) {
    if (err) return console.log(err);
    //TODO : livereload
  });

  gulp.run('server');

  return gulp.src('app/**/**.**')
        .pipe(watch())
        .pipe(livereload(server));
});