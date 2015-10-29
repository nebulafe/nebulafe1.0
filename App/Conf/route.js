/**
 * 自定义路由
 * @type {Object}
 */
module.exports = [
  [/^login\/?$/, "admin/index/login"],
  [/^logout\/?$/, "admin/index/logout"],
  [/^admin$/, "admin/course/index"],
  //[/^admin\/course\/?$/, "admin/course/index"],
  //[/^admin\/partner\/?$/, "admin/partner/index"],
  //[/^manage\/resource\/?$/, "admin/resource/index"],
  //[/^manage\/teacher\/?$/, "admin/teacher/index"],
  //[/manage\/message/, "admin/message/index"],
  //['manage/message/list', "admin/message/list"],
  //[/^manage\/message\/?$/, "admin/message/index"],
  //[/^manage\/message\/?$/, "admin/message/index"],
  ["user/see/:id", "user/see"],
  ["user/avator/:id", "user/avator"],
  ["user/verifyemail/:id", "user/verifyemail"],
  ["user/setpwd/:id", "user/setpwd"],
  ["user/mycourse/:id", "user/mycourse"],
  ["course/view/:id", "course/view"],
  ["course/video/:id/:v_id", "course/video"],
  ["partner/view/:id", "partner/view"]
]
