define(function(require, exports, moudle) {
  var email = $('#js-user-set-form .ipt-email').val();
  var nickname = $('#js-user-set-form .ipt-nick').val();
  var id = $('#js-user-set-form .ipt-id').val();
  function setupMsg(selector){
    $error=$(selector);
    return function(msg){
        var msg=msg||""
            method=msg?"addClass":"removeClass";
        $error[method]("tips-error").html(msg);
    }
  }

  var forgotMsg=setupMsg("#js-g-forgot-error");
  $(".ipt").on("keyup",function(e){
        if($.trim($(this).val())!=$(this).attr("data-value")){
            $(this).attr("data-changed","true");
        }
  });
  $('#js-forgot-submit').on('click',function(e){
    var new_nickname =  $.trim($('#js-user-set-form .ipt-nick').val());
    var realname =  $.trim($('#js-user-set-form .ipt-realname').val());
    var idcard = $.trim($('#js-user-set-form .ipt-idcard').val());
    var mobile = $.trim($('#js-user-set-form .ipt-mobile').val());

    var data = {};

      ($('#js-user-set-form .ipt-nick').attr("data-changed")=="true") && (data.nickname = new_nickname);
      ($('#js-user-set-form .ipt-realname').attr("data-changed")=="true") && (data.realname = realname);
      ($('#js-user-set-form .ipt-idcard').attr("data-changed")=="true") && (data.nickname = idcard);
      ($('#js-user-set-form .ipt-mobile').attr("data-changed")=="true") && (data.mobile = mobile);
      data.id = id;
      data.verifycode= $('.form-control-verify input').val();
    if(!new_nickname){
          forgotMsg('请输入用户名！');
          return;
      }
    //if(nickname ==  new_nickname){
    //      forgotMsg('请输入不同的用户名！');
    //      return;
    //}
    $.ajax({
      url:"/user/update",
      data:data,
      type:"post",
      dataType:"json",
      success:function(data){
          if(data.errno===0){
              forgotMsg("修改成功");
            //$('.mmsg-box').show();
            setTimeout(function(){
                forgotMsg("");
              //$('.mmsg-box').animate({opacity:0}).hide().css({opacity:1})
            },2000)
          }else{
            forgotMsg(data.errmsg||"");
          }
      },
      error:function(){
          forgotMsg("服务错误，稍后重试");
      }
    });
  });


});