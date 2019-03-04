$(document).ready(function() {
    console.log("pageGameReuslt");
    var btn = $("#aaaaa");
    console.log(btn);

    var element = document.getElementById("aaaaa");
    console.log(element );

    $("#aaaaa").click(function(){
        console.log("haha");
        var pageNum = $("#flipbook").turn("page");
        console.log(pageNum);
        $("#flipbook").turn("page", pageNum+2);
    });

    //alert("#flipbook has " + $("#flipbook").turn("pages") + " pages");
    $("#flipbook").bind("turning", function(event, page, view) {
        if (page==10) {
            event.preventDefault();
        }
    });

    $("#flipbook").bind("turning", function(event, page, view) {
        console.log("Turning the page to: "+page);
    });
});
