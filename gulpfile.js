var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var open = require('open');

var app= {
    srcPath: 'src/',
    devPath: 'build/', //开发目录
    prdPath: 'dist/'   //生产环境目录
};

//编写任务:lib,,读取bower下的依赖的js文件,并拷贝到build和dist文件夹下的vendor:保存后编译 gulp lib命令
gulp.task('lib', function(){
	gulp.src('bower_components/**/*.js')//读取文件
	.pipe(gulp.dest(app.devPath + 'vendor'))//将文件拷贝到目的地
	.pipe(gulp.dest(app.prdPath + 'vendor'))
  .pipe($.connect.reload());//通知服务器刷新

})

//编写任务:html, 读取src目录下的所有HTML,并拷贝到build和dist目录下,保存后编译gulp html 命令
gulp.task('html', function(){
	gulp.src(app.srcPath + '**/*.html')
	.pipe(gulp.dest(app.devPath))
	.pipe(gulp.dest(app.prdPath))
  .pipe($.connect.reload());//通知服务器刷新
})

//编写任务:json:不使用后端,所以自己手写的json数据,
gulp.task('json', function(){
	gulp.src(app.srcPath + 'data/**/*.json')
	.pipe(gulp.dest(app.devPath + 'data'))
	.pipe(gulp.dest(app.prdPath + 'data'))
  .pipe($.connect.reload());//通知服务器刷新
})

//编写任务:css:
gulp.task('less', function(){
	gulp.src(app.srcPath + 'style/index.less')//读取一个总的less文件
  .pipe($.plumber())
  .pipe($.less())//使用gulp-less插件将其编译为css文件,简写为$.less
	.pipe(gulp.dest(app.devPath + 'css'))
  .pipe($.cssmin())//使用gulp-cssmin插件将其压缩
	.pipe(gulp.dest(app.prdPath + 'css'))
  .pipe($.connect.reload());//通知服务器刷新
})

//编写任务:js
gulp.task('js', function(){
	gulp.src(app.srcPath + 'script/**/*.js')//读取一个总的less文件
  .pipe($.plumber())
  .pipe($.concat('index.js'))//使用gulp-concat插件将所有js文件合并
	.pipe(gulp.dest(app.devPath + 'js'))
//  .pipe($.uglify())//使用gulp-uglify插件将其压缩
	.pipe(gulp.dest(app.prdPath + 'js'))
  .pipe($.connect.reload());//通知服务器刷新
})

//编写任务image
gulp.task('image', function() {
  gulp.src(app.srcPath + 'image/**/*')
  .pipe($.plumber())
  .pipe(gulp.dest(app.devPath + 'image'))
  .pipe($.imagemin())//先进性压缩
  .pipe(gulp.dest(app.prdPath + 'image'))
  .pipe($.connect.reload());//通知服务器刷新
});

//总的任务:全部包含拷贝
gulp.task('build', ['image', 'js', 'less', 'lib', 'html', 'json']);

//编写clean任务:发布前清除旧的文件
gulp.task('clean', function() {
  gulp.src([app.devPath, app.prdPath])
  .pipe($.clean());
});

//编写服务,启动服务器,在服务器中瞬间build完成
gulp.task('serve', ['build'], function() {
  $.connect.server({//启动服务器
    root: [app.devPath],//从开发目录下读取
    livereload: true,//自动刷新浏览器
    port: 3000//定义端口
  });

  open('http://localhost:3000');

  //监控文件,来自动刷新
  gulp.watch('bower_components/**/*', ['lib']);
  gulp.watch(app.srcPath + '**/*.html', ['html']);
  gulp.watch(app.srcPath + 'data/**/*.json', ['json']);
  gulp.watch(app.srcPath + 'style/**/*.less', ['less']);
  gulp.watch(app.srcPath + 'script/**/*.js', ['js']);
  gulp.watch(app.srcPath + 'image/**/*', ['image']);
});

//执行gulp的时候,直接执行gulp serve和default
gulp.task('default', ['serve']);
