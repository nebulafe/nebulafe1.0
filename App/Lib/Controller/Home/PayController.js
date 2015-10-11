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
          console.log('paying')
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
          self.end("success")
        }else{
          self.end('fail')
        }
      }).catch(function(err){
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
    }
  };
})