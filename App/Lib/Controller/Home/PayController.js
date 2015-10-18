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
      var course_id = self.get('id');
      if(!course_id){
        return self.error("请选择要购买的课程！")
      }
      Service.getCourseById({id : course_id}).then(function(data){
        var course = data[0];
        var mydate = new Date();
        mydate.setFullYear(mydate.getFullYear() + 1);
        self.assign({
          section : 'pay',
          title : "购买产品",
          userInfo:self.userInfo,
          navLinks : navLinks,
          valid_date : getDate(mydate),
          course : course
        })
        self.display();
      })
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
          if(data.order_id){
            console.log('repay');
            Service.getOrderDetail({
              order_id :data.order_id
            }).then(function(content){
              if(content){
                if(content.has_pay !== 1 || getPayValidDate(gcontent.pay_valid_from) < new Date().getTime()){
                  Service.payOrder(extend({bankname:"",showurl:content.show_url || " "},content)).then(function(ocontent){
                    self.assign(extend({
                      section : 'pay',
                      title : "购买课程",
                      aliform : ocontent.request
                    },ocontent))
                    return self.display();
                  })
                }else{
                  throw new Error('您已经购买该课程，无需重复购买！')
                }
              }else{
                throw new Error('抛出错误')
              }
            }).catch(function(err){
              return self.error(err.msg || "系统异常，请稍后再试！")
            })
          }else{
            console.log('paying')
            Service.getOrderStatusByUserId({
              user_id : self.userInfo.id,
              course_id : data.courseid
            }).then(function(gcontent){
              if(gcontent.has_pay !== 1 || getPayValidDate(gcontent.pay_valid_from) < new Date().getTime()){
                Service.createOrder({
                  user_id : self.userInfo.id,
                  name : data.name,
                  desc : '购买课程：' + data.name,
                  detail :JSON.stringify([{
                    'course_id' : data.courseid,
                    'num' : 1
                  }])
                }).then(function(content){
                  if(content && content.errno === 0){
                    Service.payOrder({
                      order_unique_id : content.data,
                      comment : data.comment,
                      showurl : data.showurl,
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
                })
              }else{
                throw new Error('您已经购买该课程，无需重复购买！')
              }
            }).catch(function(err){
              return self.error(err);
            })
          }
        }
      }
    },

    notifyAction : function(){
      var self = this;
      var data = self.post();
      console.log('notify');
      Service.cbOrder(data).then(function(content){
        if(content && content.errno === 0){
          console.log('notify_success');
          self.end("success")
        }else{
          console.log('notify_fail');
          self.end('fail')
        }
      }).catch(function(err){
        console.log('notify_fail');
        return self.end('fail')
      })
    },

    returnAction : function(){
      var self = this;
      var data = self.get();
      console.log('return');
      if(data['trade_status'] == 'TRADE_FINISHED' || data['trade_status'] == 'TRADE_SUCCESS'){
        return self.redirect('/pay/success');
      }else{
        return self.redirect('/pay/err');
      }
    },

    checkAction : function(){
      var self = this;
      if(self.isPost()){
        var userInfo = self.userInfo;
        if(!userInfo || !userInfo.id){
          return self.error("请登录后再查询！")
        }
        var data = self.post();
        if(data.order_id){
          Service.getOrderDetail({
            order_id : data.order_id
          }).then(function(content){
            if(content.has_pay == 1 && getPayValidDate(content.pay_valid_from) < new Date().getTime()){
              return self.success({
                haspay : 1,
                showurl : content.show_url || '/pay/success'
              })
            }else{
              return self.success({
                haspay : 0,
                showurl : '/pay/err'
              })
            }
          })
        }else{
          if(data.courseid){
            Service.getOrderStatusByUserId({
              user_id : userInfo.id,
              course_id : data.courseid
            }).then(function(content){
            if(content.has_pay == 1 && getPayValidDate(content.pay_valid_from) < new Date().getTime()){
              return self.success({
                haspay : 1,
                showurl : content.show_url
              })
            }else{
              return self.success({
                haspay : 0,
                showurl : '/pay/err'
              })
            }
          })
          }
        }
      }
    },

    delAction : function(){
      var self = this;
      if(self.isPost()){
        var userInfo = self.userInfo;
        if(!userInfo || !userInfo.id){
          return self.error("请登录后再操作！")
        }
        var data = self.post();
        if(data.order_id){
          Service.delOrder({
            order_id : data.order_id
          }).then(function(content){
            if(content){
              return self.success(content)
            }else{
              return self.error("系统出错，请稍后再试")
            }
          })
        }else{
          return self.error("请选择订单！")
        }
      }
    }


  };
})