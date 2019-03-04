
$(document).ready(function(){

    var isValid = false;
    var bb = $(".prev");
    console.log(bb);
    $(".prev").click(function(){

        var pageNum = $("#flipbook").turn("page");
        console.log(pageNum);
        $("#flipbook").turn("page", pageNum-1);
    });

    function validateForm() {
        if (isValid == false) {
            isValid = true;
            return true;
        } else {
            return false;
        }
    }

});


