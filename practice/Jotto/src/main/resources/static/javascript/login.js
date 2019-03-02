$(document).ready(function(){

    $("#login_btn").click(function(){
        var id = $("#login_id").val();
        var pw = $("#login_pw").val();



        $("#main_menu").show();//tempor
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
                    // $("#main_menu").show();
                }else if(data==1){
                    $("#login_warning").text('Password is wrong');

                }
            },error : function(request,err){
                console.log('Fail!');
                console.log("User ID: " + this.login_pw);
            }
        });
    });
});
