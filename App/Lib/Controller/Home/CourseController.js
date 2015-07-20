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
      Service.getCourseOrderByWeight().then(function(data){
        self.assign({
          courses : data,
          section : 'course',
          userInfo : self.userInfo,
          navLinks : navLinks,
          title : "课程"
        });
        self.display();
      })
    },

    tagAction : function(){
      var self = this;
      Service.getCoursesByTag({
        tag : self.post("tag")
      }).then(function(data){
        self.success(data)
      })
    },

    searchAction : function(){
      var self = this;
      Service.searchCourses({
        wd : self.post('wd')
      }).then(function(data){
        self.success(data)
      })
    },

    viewAction: function(){
      var self = this;
      if(self.isGet()){
        var course_id = self.get('id');
        var user_id = "";
        if(self.userInfo){
          user_id = self.userInfo.id;
        }
        if(!course_id){
          return self.redirect("/course");
        }else{
          // Service.setCourseData({
          //   id : course_id,
          //   total_time : course_id==13 ? "10小时" : "1小时"
          // });
          Service.getCourseById({'id' : course_id , '_user_id' : user_id}).then(function(data){
            var course = data[0];
            var partner_id = course.partner;
            var partner = Service.getPartnerById({id : partner_id});
            var teachers = Service.getTeachersByCourseId({course : course_id});
            var resource = Service.getResourcesByCourseId({course : course_id, _limit : 1, _page : 1});
            self.assign({
              title: "课程",
              course : course,
              partner : partner,
              navLinks : navLinks,
              resource : resource,
              teachers : teachers,
              userInfo : self.userInfo,
              section : 'course'
            });
            self.display();
          })
        }
      }
    },

    setfocusAction : function(){
      var self = this;
      if(!self.userInfo){
        return self.redirect("/");
      }else{
        var data = self.post();
        var user_id = self.userInfo.id;
        if(data.focus == true){}
        (data.focus == true ? Service.setUserFocus : Service.unSetUserFocus)(extend({_user_id : user_id}, data)).then(function(data){
          return self.success();
        }).catch(function(err){
          return self.error(err.message || "系统异常，请稍后再试！");
        })
      }
    },

    videoAction : function(){
      var self = this;
      if(!self.userInfo){
        return self.redirect("/");
      }
      if(self.isGet()){
        var course_id = self.get('id');
        var video_id = self.get('v_id') - 0;

        if(!course_id){
          return self.redirect("/course");
        }
        var course = Service.getCourseById({id : course_id});
        var resources = Service.getResourcesByCourseId({course : course_id});
        Service.getResourcesByCourseId({course : course_id}).then(function(resources){
          if(!isNumber(video_id) || video_id <= 0){
            video_id = resources[0].id;
          }
          var c_course = Service.getResourceById({id : video_id});
          self.assign({
            title : "课程视频",
            course : course,
            navLinks : navLinks,
            userInfo : self.userInfo,
            resources : resources,
            cur_resource : c_course,
            section : 'course'
          })
          self.display();
        })
      }
    },

    materialAction : function(){
      var self = this;
      if(!self.userInfo){
        return self.redirect("/")
      }
      if(self.isGet()){
        var course_id = self.get('id');
        if(!course_id){
          return self.redirect("/course");
        }
        Service.getCourseById({id : course_id}).then(function(data){
          if(data && data[0]){
            return self.redirect(data[0].materialAction)
          }
        })
      }
    }
  };
})
