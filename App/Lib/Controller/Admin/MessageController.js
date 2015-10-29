/**
 * controller
 * @return
 */
module.exports = Controller("Admin/BaseController", function () {
  "use strict";


  var Service = require("../../Service/Service");
  var oss = require("../../Service/Oss");


  return {
    indexAction: function () {
      var self = this;
      if (self.userInfo && self.userInfo.isAdmin == 1) {
        if (self.isGet()) {
          var courses = Service.getAllCourses();
          self.assign({
            header_index: 5,
            title: "管理后台-发布消息",
            courses: courses
          });
          self.display()

        }
      }
    },
    addAction: function () {
      var self = this;

      if (self.isPost()) {
        var data = self.post();
        Service
          .addNotice(data)
          .then(function (content) {
            self.success(content)
          })
          .catch(function (err) {
            self.error(err)
          })
      }
    },
    listAction: function () {
      var self = this;

      if (self.isGet()) {
        Service
          .getNoticeList()
          .then(function (content) {
            self.success(content)
          })
          .catch(function (err) {
            self.error(err)
          })
      }
    },
    updateAction: function () {
      var self = this;

      if (self.isPost()) {
        var data = self.post();
        Service
          .updateNotice(data)
          .then(function (content) {
            self.success(content)
          })
          .catch(function (err) {
            self.error(err)
          })
      }
    },
    deleteAction: function () {
      var self = this;

      if (self.isPost()) {
        var data = self.post();
        Service
          .deleteNotice(data)
          .then(function (content) {
            self.success(content)
          })
          .catch(function (err) {
            self.error(err)
          })
      }
    }
  }

});
