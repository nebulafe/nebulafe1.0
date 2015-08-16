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
          self.assign({
            title : "管理后台-机构管理"
          })
          self.display()
        }else if(self.isPost()){
          var data = self.post();
          var banner = self.file('banner');
          var logo = self.file('img');

          Promise.all([oss.put(banner ,{bucket:'n-partner', key : 'banner/'}),oss.put(logo , {bucket:'n-partner', key : 'logo_120/'})]).then(function(datas){
            Service.addPartner({
              'banner' : banner.originalFilename,
              'img' : logo.originalFilename,
              'name' : data.name,
              'introduction' : data.introduction
            }).then(function(content){
              self.success(content)
            })
          }).catch(function(err){
            self.error(err)
          })

        }
      }
    }
  };
});
