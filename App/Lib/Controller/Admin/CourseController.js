/**
 * controller
 * @return
 */
module.exports = Controller("Admin/BaseController", function() {
  "use strict";


  var Service = require("../../Service/Service");
  var oss = require("../../Service/Oss");


  return {
    indexAction: function(){
      var self = this;
      if(self.userInfo && self.userInfo.isAdmin == 1){
        var partners = Service.getAllPartners();
        self.assign({
          title : "管理后台-课程管理",
          partners : partners
        })
        self.display()
      }
    }
  };
});
