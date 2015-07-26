module.exports = {
  //配置项: 配置值
  api_host : '123.57.72.114', //java 服务地址
  port: 8361, //监听的端口
  db_type: 'mysql', // 数据库类型
  db_host: '123.57.72.114', // 服务器地址
  db_port: '', // 端口
  db_name: 'nodejs', // 数据库名
  db_user: 'nodejs', // 用户名
  db_pwd: '', // 密码
  db_prefix: 'think_', // 数据库表前缀
  app_group_list: ['Home', 'Admin'], //分组列表
  url_resource_reg: /^(upload\/|resource\/|static\/|favicon\.ico|robot\.txt)/ //判断是否是静态资源的正则
};