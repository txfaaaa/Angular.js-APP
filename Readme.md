### 使用AngularJs实现一个招聘App

#### Web App 的模块划分   --招聘Web App 按照模块的顺序进行开发

* 职位
* 搜索
* 用户 

### 项目详情
 * 模块划分: 职位, 搜索, 用户
 * 页面详情: 职位列表页, 职位详情页, 公司详情页, 搜索页, 用户页, 投递记录页,收藏页,登录页,注册页

### 在线预览
[点我在线预览](https://txfaaaa.github.io/AngularJs_App)

### 搭建开发环境

* 开发工具 **AngluarJs**
* 构建工具 **Gulp** , 可能需要全局安装
```bash
  npm i -g gulp gulp-clean gulp-concat gulp-connect gulp-cssmin gulp-imagemin gulp-less gulp-load-plugins gulp-plumber gulp-uglify open
  ```
* 包(第三方依赖)管理工具 **Bower**
```bash
  npm i -g bower 
  bower install
  ```
* 开发时需要启动 gulp 任务,监听代码并实时编译
 ```bash
   gulp serve
  ```
* 浏览器输入http://localhost:3000/ 端口可在gulpfile.js中修改


