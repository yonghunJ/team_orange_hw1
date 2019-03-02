$(document).ready(function(){
    let al_button = document.getElementsByClassName("raise");

    for(let i=0; i<al_button.length ; i++){
        al_button[i].addEventListener("click",function(){
            if(al_button[i].style.backgroundColor =="" || al_button[i].style.backgroundColor =="black"){
                console.log("wdde")
                al_button[i].style.backgroundColor ="green";
            }else if(al_button[i].style.backgroundColor =="green"){
                console.log("wecc")
                al_button[i].style.backgroundColor ="red";
            }else if(al_button[i].style.backgroundColor =="red"){
                al_button[i].style.backgroundColor ="black";

            }else{
                console.log(al_button[i].style.backgroundColor+"waae")
            }
        });
    }
    // $(".jt_button").click(function(){
    //     console.log($(this).style.backgroundColor)
    //
    // })


});