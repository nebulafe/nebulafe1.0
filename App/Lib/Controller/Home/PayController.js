/**
 * controller
 * @return
 */
module.exports = Controller("Home/BaseController", function(){
  "use strict";
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
          self.assign({
            section : 'pay',
            title : "提交订单",
            userInfo:self.userInfo,
            navLinks : navLinks,
            WIDout_trade_no: 1000000011,
            WIDsubject: "星云会员购买",
            WIDtotal_fee: 0.02,
            WIDbody: "为了提供更多的优质的资源，欢迎您使用星云会员服务！",
            WIDshow_url : "http://www.nebulafe.com/pay/success/"
          })
          return self.display();
        }
      }
    }
  };
})