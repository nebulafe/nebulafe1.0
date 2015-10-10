/**
 * controller
 * @return
 */
module.exports = Controller("Home/BaseController", function(){
  "use strict";
  var Service = require("../../Service/Service");
  return {
    indexAction: function(){
      var self = this;
      if(!self.userInfo || !self.userInfo.id){
        return self.redirect("/");
      }
      this.assign({
        section : 'pay',
        title : "购买产品",
        userInfo:self.userInfo,
        navLinks : navLinks
      })
      this.display();
    },

    errAction: function(){
      var self = this;
      if(!self.userInfo || !self.userInfo.id){
        return self.redirect("/");
      }
      this.assign({
        section : 'pay',
        title : "支付出错",
        userInfo:self.userInfo,
        navLinks : navLinks
      })
      this.display();
    },

    successAction : function(){
      var self = this;
      if(!self.userInfo || !self.userInfo.id){
        return self.redirect("/");
      }
      this.assign({
        section : 'pay',
        title : "支付成功",
        userInfo:self.userInfo,
        navLinks : navLinks
      })
      this.display();
    },

    infoAction : function(){
      var self = this;
      if(self.isPost()){
        if(!self.userInfo){
          return self.error("请登录后进行购买！")
        }else{
          var data = self.post();
          Service.createOrder({
            user_id : self.userInfo.id,
            name : '金融英语',
            desc : '购买金融英语课程',
            detail :JSON.stringify([{
              'course_id' : 1,
              'num' : 1
            }])
          }).then(function(content){
            if(content && content.errno === 0){
              Service.payOrder({
                order_unique_id : content.data,
                comment : "",
                isalipay : data.isalipay,
                bankname : data.bankname
              }).then(function(ocontent){
                self.assign(extend({
                  section : 'pay',
                  title : "购买课程",
                  aliform : ocontent.request
                },ocontent))
                return self.display();
              })
            }else{
              throw new Error('抛出错误')
            }
          }).catch(function(err){
            return self.error(err);
          })
        }
      }
    },

    notifyAction : function(){
      var self = this;
      console.log(self.get())
      console.log(self.post())
    }
  };
})