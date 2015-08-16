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
        if(self.isGet()){
          var partners = Service.getAllPartners();
          self.assign({
            title : "管理后台-课程管理",
            partners : partners
          })
          self.display()
        }else if(self.isPost()){
          var data = self.post();
          var img = self.file('img');
          oss.put(img , {bucket:'n-course', key : 'pic/'}).then(function(res){
            if(res){
              Service.addCourse(extend(data,{img : img.originalFilename})).then(function(content){
                Service.success(content)
              })
            }
          }).catch(function(err){
            self.error(err)
          })
        }
      }
    }
  };
});
