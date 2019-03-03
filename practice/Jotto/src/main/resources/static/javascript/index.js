$(document).ready(function(){

    $(".prev").click(function(){

        var pageNum = $("#flipbook").turn("page");
        console.log(pageNum);
        $("#flipbook").turn("page", pageNum-1);
    });



});
