/**
 * 自定义路由
 * @type {Object}
 */
module.exports = [
  [/^login\/?$/, "admin/index/login"],
  [/^logout\/?$/, "admin/index/logout"],
  ["user/see/:id", "user/see"],
  ["partner/view/:id", "partner/view"]
]