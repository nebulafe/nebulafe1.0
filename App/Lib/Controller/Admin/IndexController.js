/**
 * controller
 * @return
 */
module.exports = Controller("Admin/BaseController", function() {
  "use strict";
  return {
    loginAction: function() {
      var self = this;
      if(self.isPost()){
        var name = self.post('email').trim(),
          pwd = self.post("pwd").trim();


        return D('User').where({ //根据用户名和密码查询符合条件的数据
            name: name,
            pwd: md5(pwd)
        }).find().then(function(data) {
            if (isEmpty(data)) {
                return self.error(403, '用户名或者密码不正确');
            } else {
                return self.session('userinfo', data);
            }
        }).then(function() {
            return self.success();
        });
      }else{
        this.display()
      }
    },
    logoutAction: function(){
      var self = this;
      self.session("userinfo","");
      self.redirect("/login");
    },
    indexAction: function(){
      var self = this;
      self.redirect('/')
    }
  };
});
