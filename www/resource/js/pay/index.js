define(function(require, exports, moudle) {
    $('#pay_btn').click(function(e){
        $.post('pay/info')
    });
    var bankname = "CMB";
    var payMethodContainer = $('#pay_method_wrapper');
    $('#pay_method_wrapper input').get(0).checked = true;
    payMethodContainer.on('change',function(ev){
       var method = parseInt( $('#pay_method_wrapper input:checked').val());
        if(method == 2){
            $('#banks').show();
            $('input[name="bankname"]').val(bankname);
        }else{
            $('#banks').hide();
        }
        $('input[name="isalipay"]').val(method - 1);
    });

    $('#banks input').get(0).checked = true;
    $('#banks').on('change',function(e){
        var bank =  $('#banks input:checked').attr("id");
        bankname = bank;
        $('input[name="bankname"]').val(bank);
    });
})