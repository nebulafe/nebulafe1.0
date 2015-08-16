/*
 * Service for more Detail from java
 */

var Service = Class(function(){
  var request = require('request');

  var API_REQUEST = request.defaults({
    baseUrl : 'http://' + C('api_host') + ':8080/' + C('api_host_part') + '-1.0.0-SNAPSHOT/api/1.0/'
  });

  function getRequst(url,data){
    var deferred = getDefer();
    API_REQUEST(url + "?" + toQueryString(data),function(err, response, body){
      if(err){
        deferred.reject(err)
      }else if(response && (response.statusCode == 200 || response.statusCode == 201)){
        var res = "";
        try{
          try{
            deferred.resolve(JSON.parse(body));
          }catch(e){
            deferred.resolve(body);
          }
        }catch(e){
          deferred.reject(e)
        }
      }
    })
    return deferred.promise;
  }

  return {
    /*Course API*/
    getAllCourses : function(data){
      return getRequst('course/retrieve', extend({_returntype : "detail"}, data));
    },

    getCourseById : function(data){
      return getRequst('course/retrieve',  extend({_returntype : "detail"}, data));
    },

    getCourseOrderByWeight : function(data){
      return getRequst('course/retrieve',  extend({_returntype : "detail", _desc:true ,_ordertype : 'int' , _orderby : 'weight'}, data));
    },

    getCoursesByTag : function(data){
      return getRequst('course/retrieve', extend({_returntype : "detail"}, data));
    },

    getCoursesByPartnerId : function(data){
      return getRequst('course/retrieve', extend({_returntype:'detail'}, data))
    },

    searchCourses : function(data){
      return getRequst('course/search' , extend({_returntype : "detail"}, data));
    },

    setCourseData : function(data){
      return getRequst('course/update', data);
    },

    addCourse : function(data){
      return getRequst('course/create', data);
    },

    /*Resource API*/

    getResourcesByCourseId : function(data){
      return getRequst('resource/retrieve' , extend({_returntype : "detail" ,_orderby : "weight", _ordertype:"int", _desc: false}, data));
    },

    getResourceById : function(data){
      return getRequst('resource/retrieve', extend({_returntype : "detail" }, data));
    },

    addResource : function(data){
      return getRequest('resource/create' , data);
    },

    /*Partner API*/
    getAllPartners : function(data){
      return getRequst('partner/retrieve', extend({_returntype:'detail'}, data));
    },

    getPartnerById : function(data){
      return getRequst('partner/retrieve', extend({_returntype:'detail'}, data));
    },

    addPartner : function(data){
      return getRequst('partner/create' , data);
    },

    // deletePartners : function(){
    //   return
    // }

    /*Teaacher API*/

    getALlTeachers : function(data){
      return getRequst('teacher/retrieve', extend({_returntype:'detail'}, data));
    },

    getTeachersByCourseId : function(data){
      return getRequst('teacher/retrieve', extend({_returntype:'detail'}, data));
    },

    addTeacher : function(data){
      return getRequst('teacher/create' , data);
    },

    /*User API*/
    createUser : function(data){
      return getRequst('user/create',data);
    },

    loginUser : function(data){
      return getRequst('user/login',data);
    },

    checkEmail : function(data){
      return getRequst('user/retrieve',data);
    },

    getUserById : function(data){
      return getRequst('user/retrieve', extend({'_returntype':'detail'} ,data))
    },

    updateUserById : function(data){
      return getRequst('user/update', data)
    },

    sendEmail : function(data){
      return getRequst('user/sendtextmail', data)
    },

    resetPwd : function(data){
      return getRequst('user/resetpassword' ,data)
    },

    setUserStatus : function(data){
      return getRequst('user/update', data);
    },

    /* Focus API */
    setUserFocus : function(data){
      return getRequst('focus/set',data)
    },

    unSetUserFocus : function(data){
      return getRequst('focus/unset',data)
    },

    getUserFocus : function(data){
      return getRequst('focus/retrieve' , data);
    },

    /* Comment API */
    setComment : function(data){
      return getRequst('comment/set', data)
    },

    getComment : function(data){
      return getRequst('comment/get' , extend({
        _returnType : 'detail',
        _page : 1,
        _limit : 10,
        _desc : true
      },data))
    },

    delComment : function(data){
      return getRequst('comment/unset' ,data)
    },

    /* User Course Resource progress*/

    setStudyProgress : function(data){
      return getRequst('user_course_resource/set' , data);
    },

    getStudyProgress : function(data){
      return getRequst('user_course_resource/get' , data);
    },

    /* Pay API*/
    pay : function(data){
      return getRequst('alipay/request' , data)
    }
  }
})

module.exports = new Service();
