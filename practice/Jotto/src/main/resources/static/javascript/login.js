$(document).ready(function(){

    $("#login_btn").click(function(){
        var id = $("#login_id").val();
        var pw = $("#login_pw").val();
        $("#login_warning").text('Password is wrong');//1
        $("#login_form").hide();//2
        $("#main_menu").show();

        var request = $.ajax({
            type:"post",
            dataType: "json",
            url: "http://orangeJotto.com/" + id + "/tasks?callback=?",
            login_id: id,
            login_pw: pw,
            success: function(data) {
                console.log('Success!');
                console.log("User ID: " + this.login_id);
                if(data==0){
                    $("#login_form").hide();
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
