$(document).ready(function() {

    $('#ai_answer').keyup(function(){
        var input = $('#ai_answer').val();
        if(input.length != 5){
            console.log("fail");
        }else{

            //input valid check //duplication //only char

            var user_first_input = $("#ai_answer").val();
            $.ajax({
                type:"get",
                dataType: "json",
                url: "http://orangeJotto.com/user_first_input?"+user_first_input,
                success: function(data) {
                    if(data==0){
                        console.log("It works");
                    }else if(data==1){
                        console.log("Input word is not adequate");
                        $('#ai_answer').val("");
                        $("#ai_answer_inadquate").text("wrong input");
                    }
                },
                timeout: 2000
            }).fail(function() {
                console.log('Fail!');
            });
        }
    });



});
