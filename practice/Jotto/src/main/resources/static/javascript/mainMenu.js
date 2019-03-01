$(document).ready(function() {

    $("#main_menu").hide();

    $("#game_play").click(function(){
        console.log("game play clicked");
        var pageNum = $("#flipbook").turn("page");
        console.log(pageNum);
        $("#flipbook").turn("page", pageNum+1);
    });
    $("#past_result").click(function(){
        console.log("past_result clicked");
        var pageNum = $("#flipbook").turn("page");
        console.log(pageNum);
        $("#flipbook").turn("page", pageNum+1);
        setTimeout(function () {
            $("#flipbook").turn("page", pageNum+3);
        }, 1000);
        setTimeout(function () {
            $("#flipbook").turn("page", pageNum+5);
        }, 2000);


        




    });
});