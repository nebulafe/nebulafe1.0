/**
 * controller
 * @return
 */
module.exports = Controller("Home/BaseController", function(){
  "use strict";
  var Service = require("../../Service/Service");
  var c_data = {
    navLinks : navLinks,
    section : 'home'
  };
  return {
    indexAction: function(){
      var self = this;
      var userInfo = null;
      return self.session('userInfo').then(function(value){
        if (!isEmpty(value)) {
          userInfo = value;
        }
        var courses = Service.getCourseOrderByWeight({_limit:6,_page:1 });
        self.assign(extend({
          courses:courses,
          title : "首页",
          userInfo : userInfo
        },c_data))
        self.display();
      })
    }
  };
});
