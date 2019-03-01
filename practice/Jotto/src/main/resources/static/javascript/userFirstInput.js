$(document).ready(function() {

    $('#ai_answer').keyup(function(){
        var input = $('#ai_answer').val();
        if(input.length != 5){
            console.log("fail");
        }else{
            var pageNum = $("#flipbook").turn("page");
            $("#flipbook").turn("page", pageNum+2);


            //input valid check //duplication //only char

            var user_first_input = $("#ai_answer").val();
            $.ajax({
                type:"get",
                dataType: "json",
                url: "http://orangeJotto.com/user_first_input?"+user_first_input,
                success: function(data) {
                    if(data==0){
                        console.log("It works");

                        var pageNum = $("#flipbook").turn("page");
                        $("#flipbook").turn("page", pageNum+1);

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
