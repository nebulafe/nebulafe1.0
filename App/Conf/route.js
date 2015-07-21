/**
 * 自定义路由
 * @type {Object}
 */
module.exports = [
  [/^login\/?$/, "admin/index/login"],
  [/^logout\/?$/, "admin/index/logout"],
  ["user/see/:id", "user/see"],
  ["course/view/:id", "course/view"],
  ["course/video/:id/:v_id", "course/video"],
  ["partner/view/:id", "partner/view"]
]