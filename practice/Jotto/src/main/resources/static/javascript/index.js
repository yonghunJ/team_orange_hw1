$(document).ready(function(){

    $("#main_menu").hide();

    $(".prev").click(function(){
        var pageNum = $("#flipbook").turn("page");
        console.log(pageNum);
        $("#flipbook").turn("page", pageNum-1);
    });


    $("#game_play").click(function(){
        $("#flipbook").turn("page", 3);
    });
    $("#past_result").click(function(){

        $("#flipbook").turn("page", 3);
        setTimeout(function () {
            $("#flipbook").turn("page", 5);
        }, 1000);
    });

    //5 input
    $('#userGuess').keyup(function(){
        var bla = $('#userGuess').val();
        if(bla.length != 5){
            console.log("fail");
        }else{
            console.log("succ");
            // var user = $('<tr><td>'+bla+'</td></tr>');
            // user.hide();
            // $('#user_table > tbody > tr:first').before(user);
            // user.fadeIn("slow");
            //
            // var round_ = $('<tr><td>'+round+'</td></tr>');
            // round_.hide();
            // $('#round_table > tbody > tr:first').before(round_);
            // round_.fadeIn("slow");
            //
            // var ai = $('<tr><td>'+bla+'</td></tr>');
            // ai.hide();
            // $('#ai_table > tbody > tr:first').before(ai);
            // ai.fadeIn("slow");
            $('#userGuess').val("");
            // round +=1;
        }
    });
});
