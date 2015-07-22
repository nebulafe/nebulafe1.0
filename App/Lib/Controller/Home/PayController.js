/**
 * controller
 * @return
 */
module.exports = Controller("Home/BaseController", function(){
  "use strict";
  return {
    indexAction: function(){
      var self = this;
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
      this.assign({
        section : 'pay',
        title : "支付成功",
        userInfo:self.userInfo,
        navLinks : navLinks
      })
      this.display();
    },

    payAction : function(){
      var self = this;
      if(self.isPost()){
        if(!self.userInfo){
          return self.error("请登录后进行购买！")
        }else{
          Service.pay({
            WIDout_trade_no: 1000001,
            WIDsubject: "星云会员购买",
            WIDtotal_fee: 149,
            WIDbody: "为了提供更多的优质的资源，欢迎您使用星云会员服务！"
          })
        }
      }
    }
  };
})