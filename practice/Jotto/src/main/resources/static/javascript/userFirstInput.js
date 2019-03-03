$(document).ready(function() {

    $("#first_input_btn").click(function(){
        var input = $('#ai_answer').val();

        if(input.length != 5){
            $('#ai_answer_inadquate').val("Input 5 characters");
        }else{
            let user_first_input = $("#ai_answer").val();

            //input valid check //duplication //only char

            $.ajax({
                type:"get",
                dataType: "json",
                url: "/user_first_input?user_first_input="+user_first_input,
                success: function(data) {
                    if(data==0){
                        console.log("It works");

                        var pageNum = $("#flipbook").turn("page");
                        $("#flipbook").turn("page", pageNum+2);

                    }else if(data==1){
                        console.log("Input word is not adequate");
                        $("#ai_answer_inadquate").text("wrong input");
                    }
                },error : function(request,err){
                    console.log('Fail!');
                }
            });
        }

    })



});
