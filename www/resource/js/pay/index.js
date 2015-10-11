define(function(require, exports, moudle) {
    $('#pay_btn').click(function(e){
        $.post('pay/info')
    });

    var payMethodContainer = $('#pay_method_wrapper');
    $('#pay_method_wrapper input').get(0).checked = true;
    payMethodContainer.on('change',function(ev){
       var method = parseInt( $('#pay_method_wrapper input:checked').val());
        if(method == 2){
            $('#banks').show();
        }else{
            $('#banks').hide();
        }
        //alert(method);
    });

    $('#banks input').get(0).checked = true;
    $('#banks').on('change',function(e){
        var bank =  $('#banks input:checked').attr("id");
        //alert(bank);
    });
})