$(document).ready(function(){
    var al_button = document.getElementsByClassName("raise");

    for(let i=0; i<al_button.length ; i++){
        al_button[i].addEventListener("click",function(){
            if(al_button[i].style.backgroundColor ==""){
                al_button[i].style.backgroundColor ="blue";
            }else if(al_button[i].style.backgroundColor =="blue"){
                al_button[i].style.backgroundColor ="red";
            }else if(al_button[i].style.backgroundColor =="red"){
                al_button[i].style.backgroundColor ="green";
            }else{
                al_button[i].style.backgroundColor ="";
            }
        });
    }


    function openNav() {
        document.getElementById("mySidenav").style.width = "200px";
    }

    function closeNav() {
        document.getElementById("mySidenav").style.width = "0";
    }


});
