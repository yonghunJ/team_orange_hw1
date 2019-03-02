$(document).ready(function(){
    var bb = $(".prev");
    console.log(bb);
    $(".prev").click(function(){

        var pageNum = $("#flipbook").turn("page");
        console.log(pageNum);
        $("#flipbook").turn("page", pageNum-1);
    });


    //5 input
    $('#userGuess').keyup(function(){
        var bla = $('#userGuess').val();
        if(bla.length != 5){
            console.log("fail");
        }else{
            console.log("succ");
            var user = $('<tr><td>'+bla+'</td></tr>');
            user.hide();
            $('#user_table > tbody > tr:first').before(user);
            user.fadeIn("slow");
            
            var ai = $('<tr><td>'+bla+'</td></tr>');
            ai.hide();
            $('#ai_table > tbody > tr:first').before(ai);
            ai.fadeIn("slow");
            $('#userGuess').val("");
            // round +=1;
        }
    });
});
