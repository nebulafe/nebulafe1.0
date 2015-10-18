define(function (require, exports, moudle) {
  $('#pay_btn').click(function (e) {
    $.post('pay/info')
  });
  var bankname = "CMB";
  var payMethodContainer = $('#pay_method_wrapper');
  $('#pay_method_wrapper input').get(0).checked = true;
  payMethodContainer.on('change', function (ev) {
    var method = parseInt($('#pay_method_wrapper input:checked').val());
    if (method == 2) {
      $('#banks').show();
      $('input[name="bankname"]').val(bankname);
    } else {
      $('#banks').hide();
    }

    $('input[name="isalipay"]').val(method - 1);

  });

  $('#banks input').get(0).checked = true;
  $('#banks').on('change', function (e) {
    var bank = $('#banks input:checked').attr("id");

    bankname = bank;
    $('input[name="bankname"]').val(bank);

  });

  $('input[name="showurl"]').val(location.protocol + '//' + location.host + $('input[name="showurl"]').val());

  $('#n_comment').on('change',function(e){
    var me = this;
    $('input[name="comment"]').val($(me).val())
  });

  function checkOrder(id){
    $.post('/pay/check', {courseid : id}, 'json').done(function (res) {
      if (res.errno == 0) {
        ALERT(res.data.haspay == 1 ? "支付成功！" : "支付失败！");
        location.href = res.data.showurl;
      }
    }).error(function (res) {
      ALERT("验证失败，请重新验证");
      location.reload()
    });
  }

  $(document.body).on('click',function(e){
    var _target = $(e.target);
    if($(_target).hasClass('repay')){
      $('#pay_modal').attr('data-courseid',$(_target).data('courseid')).modal('show')
    }
    if($(_target).hasClass('pay-success')){
      checkOrder($('#pay_modal').data('courseid'))
    }else if($(_target).hasClass('pay-error')){
      checkOrder($('#pay_modal').data('courseid'))
    }
  })
})