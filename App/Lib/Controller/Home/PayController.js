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

    errAction:function(){
      var self = this;
      this.assign({
        section : 'pay',
        title : "支付出错",
        userInfo:self.userInfo,
        navLinks : navLinks
      })
      this.display();
    }
  };
})