$(document).ready(function(){
//Paswword double check
    var password = document.getElementById("signup_pw");
    var confirm_password = document.getElementById("signup_pw2");

    function validatePassword(){
        if(password.value != confirm_password.value) {
            confirm_password.setCustomValidity("Passwords Don't Match");
        } else {
            confirm_password.setCustomValidity('');
        }
    }
    password.onchange = validatePassword;
    confirm_password.onkeyup = validatePassword;

    //signup from submittion
    $("#signup_btn").click(function(){
        var id = $("#login_id").val();
        var pw = $("#login_pw").val();
        $("#login_warning").text('Password is wrong');

        var request = $.ajax({
            type:"post",
            dataType: "json",
            url: "http://orangeJotto.com/" + id + "/tasks?callback=?",
            login_id: id,
            login_pw: pw,
            success: function(data) {
                console.log('Success!');
                console.log("User ID: " + this.login_id);
                if(data==1){
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
