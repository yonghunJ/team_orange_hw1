$(document).ready(function(){


    $("#login_btn").click(function(){
        var id = $("#login_id").val();
        var pw = $("#login_pw").val();


        // $("#login_warning").text('ID or Password is wrong');
        // $("#main_menu").show();//tempor
        $.ajax({
            type:"post",
            url: "/login",
            data: {
                login_id: id,
                login_pw: pw
            },
            dataType:'json',
            success : function(data) {
                if(data==0){
                    $("#login_form").hide();
                    $("#gameTitle").hide();
                    $("#main_menu").show();
                }else {
                    $("#login_warning").text('ID or Password is wrong');
                }
            },error : function(request,err){
                console.log('login Fail!');
                $("#login_warning").text('ID or Password is wrong');
            }
        });
    });

    $("#login_pw").keyup(function(event) {
        if (event.keyCode === 13) {
            $("#login_btn").click();
            $("#login_pw").val("");
            $("#login_id").val("");
        }
    });


});
