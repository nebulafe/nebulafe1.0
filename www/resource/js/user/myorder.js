define(function (require, exports, module) {
    function checkOrder(id){
        $.post('/pay/check', {order_id : id}, 'json').done(function (res) {
            if (res.errno == 0) {
                ALERT(res.data.haspay == 1 ? "支付成功！" : "支付失败！");
                location.href = res.data.showurl;
            }
        }).error(function (res) {
            ALERT("验证失败，请重新验证");
            location.reload()
        });
    }
    $(function(){
        $(document.body).on('click',function(e){
            var _target = $(e.target);
            if($(_target).hasClass('repay')){
                $('#pay_modal').attr('data-id',$(_target).data('id')).modal('show')
            }
            if($(_target).hasClass('pay-success')){
                checkOrder($('#pay_modal').data('id'))
            }else if($(_target).hasClass('pay-error')){
                checkOrder($('#pay_modal').data('id'))
            }
        })
    })
})