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





        $.ajax({
            type:"get",
            dataType: "json",
            url: "/pastGameResult",
            success : function(data) {
                console.log('Success!');

                if(data.length<20){
                    for(let i=0;i<data.length;i++){
                        $("#pastGameResult1 > ul").append("list");
                    }
                }else{
                    for(let i=0;i<20;i++){
                        $("#pastGameResult1 > ul").append("list");
                    }
                    for(let j=0;j<data.length-20;j++){
                        $("#pastGameResult2 > ul").append("list");
                    }
                }


            },error : function(request,err){
                console.log('Fail!');
            }
        });




    });
});