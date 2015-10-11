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
      console.log('buy');
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
          console.log('paying')
          Service.createOrder({
            user_id : self.userInfo.id,
            name : '金融英语',
            desc : '购买金融英语课程',
            detail :JSON.stringify([{
              'course_id' : Math.ceil(Math.random()*100000),
              'num' : 1
            }])
          }).then(function(content){
            if(content && content.errno === 0){
              Service.payOrder({
                order_unique_id : content.data,
                comment : "",
                showurl : 'http://www.nebufafe.com/',
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
      var data = self.post();
      console.log('notify');
      Service.cbOrder(data).then(function(content){
        if(content && content.errno === 0){
          return self.echo("success")
        }else{
          return self.echo('fail')
        }
      }).catch(function(err){
        return self.echo('fail')
      })
    },

    returnAction : function(){
      var self = this;
      var data = self.get();
      if(data['trade_status'] == 'TRADE_FINISHED' || data['trade_status'] == 'TRADE_SUCCESS'){
        self.assign({
          result : "付款成功！"
        })
      }else{
        self.assign({
          result : "付款失败！"
        })
      }
      return self.display()
    }
  };
})