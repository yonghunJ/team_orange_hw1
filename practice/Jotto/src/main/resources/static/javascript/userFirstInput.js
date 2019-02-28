$(document).ready(function() {

    $('#ai_answer').keyup(function(){
        var input = $('#ai_answer').val();
        if(input.length != 5){
            console.log("fail");
        }else{
            $('#ai_answer').val("");
            $("#ai_answer_inadquate").text("wrong input");
        }
    });
});
