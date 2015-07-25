define(function(require, exports, moudle) {
  $(function(){
    $('#verify_email').on('click',function(e){
      $.post('user/verifyemail', {
        verifycode:$('#verify_code').val(),
        email : $('#user_email').html()
      },function(data){
        console.log(data)
      })
    })
  })
})