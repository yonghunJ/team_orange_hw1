$(document).ready(function(){

    $("#login_btn").click(function(){
        var id = $("#login_id").val();
        var pw = $("#login_pw").val();


        $("#main_menu").show();//tempor
        var request = $.ajax({
            type:"post",
            dataType: "json",
            url: "/login",
            data: {
                login_id: id,
                login_pw: pw,
            },
            success: function(data) {
                console.log('Success!');
                console.log("User ID: " + this.login_id);
                if(data==0){
                    $("#login_form").hide();
                    // $("#main_menu").show();
                }else if(data==1){
                    $("#login_warning").text('Password is wrong');

                }
            },
            timeout: 2000
        }).fail(function() {
            console.log('Fail!');
            console.log("User ID: " + this.login_pw);
        });
    });
});
