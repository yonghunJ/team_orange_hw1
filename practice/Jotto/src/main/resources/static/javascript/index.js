$(document).ready(function(){
    var bb = $(".prev");
    console.log(bb);
    $(".prev").click(function(){

        var pageNum = $("#flipbook").turn("page");
        console.log(pageNum);
        $("#flipbook").turn("page", pageNum-1);
    });



});
