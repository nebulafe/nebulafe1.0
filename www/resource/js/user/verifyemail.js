define(function(require, exports, moudle) {
  $(function(){
    $('#verify_email').on('click',function(e){
      var email = $('#user_email').html();
      $.post('user/verifyemail', {
        verifycode:$('#verify_code').val(),
        email :email
      },function(data){
        if(data.errno == "0"){
          $("div.my-wrap").hide();
          $(".js-forgot-result").show().find("em").text(email);
          ALERT('提示','发送成功，请查收邮件！');
        }else{
          ALERT('错误',data.errmsg);
        }
      })
    });
    $("span.change-code").click(function(){
      var $p=$(this).prev("img");
      $p.attr("src",$p.attr("src").replace(/\?\d+|$/,"?"+(new Date()).getTime()));
    });

  })
})