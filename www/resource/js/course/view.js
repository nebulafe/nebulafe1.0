define(function(require, exports, moudle) {
  alifenxi.track("course_view_view");
  var login = require('../index.js');
  $(function(){
    if($('#signin_user')[0]){
      $('#start_learn').attr({
        href : $('#start_learn').attr('data-href')
      })
      $('#learn_mater').attr({
        href :  $('#learn_mater').attr('data-href')
      })
    }else{
      $('#start_learn').on('click', function(e){
        login.signin();
      });
      $('#learn_mater').on('click', function(e){
        login.signin();
      })
    }
  })
})