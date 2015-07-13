/*
 * Service for more Detail from java
 */

var Service = Class(function(){
  var request = require('request');

  var API_REQUEST = request.defaults({
    baseUrl : 'http://' + C('api_host') + ':8080/onlineLearningService-1.0.0-SNAPSHOT/api/1.0/'
  });

  function getRequst(url,data){
    var deferred = getDefer();
    API_REQUEST(url + "?" + toQueryString(data),function(err, response, body){
      if(err){
        deferred.reject(err)
      }else if(response && (response.statusCode == 200 || response.statusCode == 201)){
        try{
          deferred.resolve(JSON.parse(body));
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

    /*Resource API*/

    getResourcesByCourseId : function(data){
      return getRequst('resource/retrieve' , extend({_returntype : "detail" ,_orderby : "weight" , _ordertype:"int", _desc: false}, data));
    },

    /*Partner API*/
    getAllPartners : function(data){
      return getRequst('partner/retrieve', extend({_returntype:'detail'}, data));
    },

    getPartnerById : function(data){
      return getRequst('partner/retrieve', extend({_returntype:'detail'}, data));
    },

    /*Teaacher API*/

    getALlTeachers : function(data){
      return getRequst('teacher/retrieve', extend({_returntype:'detail'}, data));
    },

    getTeachersByCourseId : function(data){
      return getRequst('teacher/retrieve', extend({_returntype:'detail'}, data));
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
    }
  }
})

module.exports = new Service();
