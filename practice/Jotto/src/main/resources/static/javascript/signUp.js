$(document).ready(function(){
    $("#signup_id").focusout(function() {
        console.log("signup id duplication ajax request");
        var signup_id = $("#signup_id").val();
        console.log(signup_id);

        $.ajax({
            type:"get",
            dataType: "json",
            url: "/lsignup_id?signup_id="+signup_id,
            success : function(data) {
                console.log('Success!');
                if(data==0){
                    console.log("there is no id dupliacted");
                }else if(data==1){
                    console.log("ID is duplicated");
                }
            },error : function(request,err){
                console.log('Fail!');
            }
        });




      });

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
