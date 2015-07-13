/**
 * controller
 * @return
 */
module.exports = Controller("Home/BaseController", function(){
  "use strict";
  var Service = require("../../Service/Service");
  var captchapng = require('captchapng');
  var crypto = require('crypto');
  var secret = "ahshsd123";
  //加密
  function encrypt(str) {
      var cipher = crypto.createCipher('aes192', secret);
      var enc = cipher.update(str, 'utf8', 'hex');
      enc += cipher.final('hex');
      return enc;
  }
  //解密
  function decrypt(str) {
      var decipher = crypto.createDecipher('aes192', secret);
      var dec = decipher.update(str, 'hex', 'utf8');
      dec += decipher.final('utf8');
      return dec;
  }
  return {
    updateAction: function(){
      var self = this;
      if(self.isGet()){
        return self.redirect("/");
      }else if(self.isPost()){
        var user_id = self.post('id');
        return self.session('userInfo').then(function(value){
          if (!isEmpty(value)) {
            if(value.id == user_id){
              return Service.updateUserById(self.post()).then(function(content){
                if(content == 0){
                  return self.success()
                }else if(content == -1){
                  throw new Error('没有找到该用户！')
                }
              }).catch(function(err){
                return self.error(err.message || "系统异常，请稍后再试！")
              })
            }else{
              self.session('userInfo', '');
              self.redirect('/');
            }
          }else{
            self.redirect('/');
          }
        })
      }
    },

    logoutAction: function() {
      var self = this;
      if(self.isGet()){
        self.session('userInfo', '');
        self.redirect('/');
      }
    },

    signinAction: function(){
      var self = this;
      if(self.isGet()){

      }else if(self.isPost()){
        var data = self.post();
        if(!data.username || !data.password){
          return self.error("请输入正确的用户名和密码")
        }
        Service.createUser(data).then(function(content){
          if(isNumber(content)){
            if(content == -1){
              throw new Error("用户已经存在！")
            }else if(content == -2){
              throw new Error("系统异常，请稍后再试！")
            }else{
              self.session('userInfo',extend({},data,{id:content}))
              return self.success(content);
            }
          }else{
            throw new Error("系统异常，请稍后再试！")
          }
        }).catch(function(err){
          return self.error(err.message || "系统异常，请稍后再试！")
        })
      }
    },

    loginAction: function(){
      var self = this;
      if(self.isGet()){

      }else if(self.isPost()){
        var data = self.post();
        if(!data.username || !data.password){
          return self.err("请输入正确的用户名和密码")
        }
        Service.loginUser(data).then(function(content){
          if(isNumber(content)){
            if(content == -1){
              throw new Error("没有找到该用户！")
            }else if(content == -2){
              throw new Error("用户名或者密码错误！")
            }else{
              self.session('userInfo',extend({},data,{id:content}))
              return self.success();
            }
          }else{
            throw new Error("系统异常，请稍后再试！")
          }
        }).catch(function(err){
          self.error(err.message || "系统异常，请稍后再试！");
        })
      }
    },

    checkemailAction: function(){
      var self = this;
      Service.checkEmail({"username" : this.param('username')}).then(function(content){
        if(content == 0){
          return self.success({num : content})
        }else if(content == 1){
          return self.success({num : content , msg : "用户已经存在！"})
        }
      }).catch(function(err){
        self.error(err);
      })
    },

    forgetAction: function(){
      var self = this;
      if(self.isGet()){
        self.assign({
          title : "忘记密码",
          section : 'user',
          userInfo : self.userInfo
        })
        return self.display()
      }else if(self.isPost()){
        var data = self.post();
        self.session('captchacode').then(function(res){
          if(data.verifycode == res){
            Service.sendEmail({
              email: data.email,
              subject : "找回密码",
              message : "http://www.nebulafe.com/user/reset/?verify=" + encrypt(data.email)
            })
            return self.success();
          }else{
            self.error("验证码错误！");
          }
        })
      }
    },

    seeAction: function(){
      var self = this;
      if(self.isGet()){
        var user_id = self.get('id');
        if(!user_id){
          return self.redirect("/");
        }
        return self.session('userInfo').then(function(value){
          if (!isEmpty(value)) {
            if(value.id == user_id){
              return Service.getUserById({id:user_id}).then(function(content){
                self.assign({
                  title : "查看用户",
                  section : 'user',
                  userInfo : content[0]
                })
                return self.display()
              }).catch(function(err){

              })
            }else{
              self.session('userInfo', '');
              self.redirect('/');
            }
          }else{
            self.redirect('/');
          }
        })
      }
    },

    resetAction: function(){
      var self = this;
      if(self.isGet()){
        var id = self.get('verify');
        if(!id){
          self.redirect("/")
        }else{
          try{
            var email = decrypt(id);
            if(!isEmail(email)){
              self.redirect("/")
            }
            self.assign({
              title : "重置密码",
              section : 'user',
              userInfo : self.userInfo,
              email: email
            });
            self.display()
          }catch(e){
            return self.redirect("/")
          }
        }
      }else if(self.isPost()){
        var data = self.post();
        Service.resetPwd(data).then(function(res){
          self.success(res)
        }).catch(function(e){
          self.error("系统异常，请稍后再试！");
        })
      }
    },

    getcodeAction: function(){
      var self = this;
      var captchacode = parseInt(Math.random()*9000+1000);
      self.session('captchacode', captchacode);
      var p = new captchapng(70,38,captchacode);
      p.color(0, 12, 0, 0);
      p.color(80, 80, 200, 255);

      var img = p.getBase64();
      var imgbase64 = new Buffer(img,'base64');
      self.header({
          'Content-Type': 'image/png'
      })
      self.end(imgbase64);
    }
  };
})
