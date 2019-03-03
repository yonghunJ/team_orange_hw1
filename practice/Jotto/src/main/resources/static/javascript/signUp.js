$(document).ready(function(){
    $("#signup_id").focusout(function() {


        var signup_id = $("#signup_id").val();

        $.ajax({
            type:"get",
            dataType: "json",
            url: "/signup_id?signup_id="+signup_id,
            success : function(data) {
                console.log('Success!');
                if(data==0){
                    $("#signup_btn").removeAttr("disabled");
                }else if(data==1){
                    $("#signup_id_warning").text("ID is dupliacted");
                    $("#signup_btn").attr("disabled","disabled")
                }
            },error : function(request,err){
                console.log('Fail!');
            }
        });




      });
    $("#signup_btn").click(function(){
        $("#signup_btn").attr("disabled:disabled");
    })

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
});
