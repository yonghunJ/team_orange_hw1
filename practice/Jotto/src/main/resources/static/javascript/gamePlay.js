$(document).ready(function(){
    let al_button = document.getElementsByClassName("raise");

    for(let i=0; i<al_button.length ; i++){
        al_button[i].addEventListener("click",function(){
            if(al_button[i].style.backgroundColor =="" || al_button[i].style.backgroundColor =="black"){
                al_button[i].style.backgroundColor ="green";
                let spans = $("table > tbody > tr td span");
                for(let j=0;j<spans.length;j++){
                    if(al_button[i].innerHTML.toLowerCase()== spans[j].innerText.toLowerCase()){
                        spans[j].style.color="green"
                    }
                }
            }else if(al_button[i].style.backgroundColor =="green"){
                al_button[i].style.backgroundColor ="red";
                let spans = $("table > tbody > tr td span");
                for(let j=0;j<spans.length;j++){
                    if(al_button[i].innerHTML.toLowerCase()== spans[j].innerText.toLowerCase()){
                        spans[j].style.color="red"
                    }
                }
            }else if(al_button[i].style.backgroundColor =="red"){
                al_button[i].style.backgroundColor ="black";
                let spans = $("table > tbody > tr td span");
                for(let j=0;j<spans.length;j++){
                    if(al_button[i].innerHTML.toLowerCase()== spans[j].innerText.toLowerCase()){
                        spans[j].style.color="black"
                    }
                }
            }
        });
    }

    //5 input
    $('#userGuess').keyup(function(){
        var bla = $('#userGuess').val();
        if(bla.length != 5){
            console.log("length !=5");
        }else{

            $.ajax({
                type:"get",
                url: "/user_guess?user_guess="+bla,
                dataType:'json',
                success : function(data) {
                    console.log(data);
                    if(data.is_valid_word == true){
                        let user_guess_count = data.user_guess_count;
                        let user_guess_word = data.user_guess_word;
                        let ai_guess_count = data.ai_guess_count;
                        let ai_guess = data.ai_guess;
                        let user_game_ended = data.user_game_ended;
                        let ai_game_ended = data.ai_game_ended;

                        let usr_split = user_guess_word.split("");
                        let round = '<tr><td>'+'round'+'</td>';
                        let user_guess = '<td><span>'+usr_split[0]+'</span><span>' +usr_split[1]+'</span><span>' +usr_split[2]+'</span><span>' +usr_split[3]+'</span><span>' +usr_split[4]+'</span></td>';
                        let user_guess_corr = '<td>'+user_guess_count+'</td></tr>'

                        let user_submit = $(round + user_guess + user_guess_corr);
                        user_submit.hide();
                        if($('#player_table > tbody > tr:first').length == 0) {
                            $('#player_table > tbody').append(user_submit);
                        }else{
                            $('#player_table > tbody > tr:first').before(user_submit);
                        }

                        let al_button = document.getElementsByClassName("raise");
                        for(let i=0; i<al_button.length ; i++){
                            if(al_button[i].style.backgroundColor =="" || al_button[i].style.backgroundColor =="black"){
                                let spans = $("table > tbody > tr td span");
                                for(let j=0;j<spans.length;j++){
                                    if(al_button[i].innerHTML.toLowerCase()== spans[j].innerText.toLowerCase()){
                                        spans[j].style.color="black"
                                    }
                                }
                            }else if(al_button[i].style.backgroundColor =="green"){
                                let spans = $("table > tbody > tr td span");
                                for(let j=0;j<spans.length;j++){
                                    if(al_button[i].innerHTML.toLowerCase()== spans[j].innerText.toLowerCase()){
                                        spans[j].style.color="green"
                                    }
                                }
                            }else if(al_button[i].style.backgroundColor =="red"){
                                let spans = $("table > tbody > tr td span");
                                for(let j=0;j<spans.length;j++){
                                    if(al_button[i].innerHTML.toLowerCase()== spans[j].innerText.toLowerCase()){
                                        spans[j].style.color="red"
                                    }
                                }
                            }
                        }

                        user_submit.fadeIn("slow");
                        var ai_split = ai_guess.split("");
                        let ui_guess = '<td><span>'+ai_split[0]+'</span><span>' +ai_split[1]+'</span><span>' +ai_split[2]+'</span><span>' +ai_split[3]+'</span><span>' +ai_split[4]+'</span></td>';
                        let ai_guess_corr = '<td>'+ai_guess_count+'</td></tr>'

                        let ai_submit = $(round + ui_guess + ai_guess_corr);
                        ai_submit.hide();
                        if($('#ai_table > tbody > tr:first').length == 0) {
                            $('#ai_table > tbody').append(ai_submit);
                        }else{
                            $('#ai_table > tbody > tr:first').before(ai_submit);
                        }
                        ai_submit.fadeIn("slow");

                        if (ai_game_ended=="True" && user_game_ended=="True"){
                            alert("user and ai win");
                        }else if(user_game_ended=="True"){
                            alert("user win")
                        }else if(ai_game_ended =="True"){
                            alert("Ai win")
                        }
                    }else{
                        $("invalid_word_check").text("This is not a word");
                    }
                },error : function(request,err){
                    console.log('Fail!');
                    console.log("User ID: " + this.login_pw);
                }
            });


            //text for ajax failed
            // var res = bla.split("");
            // let round = '<tr><td>'+'round'+'</td>';
            // let user_guess = '<td><span>'+res[0]+'</span><span>' +res[1]+'</span><span>' +res[2]+'</span><span>' +res[3]+'</span><span>' +res[4]+'</span></td>';
            // let guess_corr = '<td>'+'correct'+'</td></tr>'
            // let user_submit = $(round + user_guess + guess_corr);
            // user_submit.hide();
            // if($('#player_table > tbody > tr:first').length == 0) {
            //     $('#player_table > tbody').append(user_submit);
            // }else{
            //     $('#player_table > tbody > tr:first').before(user_submit);
            //     console.log("tr")
            // }
            //
            // let al_button2 = document.getElementsByClassName("raise");
            // for(let i=0; i<al_button.length ; i++){
            //     if(al_button2[i].style.backgroundColor =="" || al_button2[i].style.backgroundColor =="black"){
            //         let spans = $("table > tbody > tr td span");
            //         for(let j=0;j<spans.length;j++){
            //             if(al_button2[i].innerHTML.toLowerCase()== spans[j].innerText.toLowerCase()){
            //                 spans[j].style.color="black"
            //             }
            //         }
            //     }else if(al_button[i].style.backgroundColor =="green"){
            //         let spans = $("table > tbody > tr td span");
            //         for(let j=0;j<spans.length;j++){
            //             if(al_button[i].innerHTML.toLowerCase()== spans[j].innerText.toLowerCase()){
            //                 spans[j].style.color="green"
            //             }
            //         }
            //     }else if(al_button[i].style.backgroundColor =="red"){
            //         let spans = $("table > tbody > tr td span");
            //         for(let j=0;j<spans.length;j++){
            //             if(al_button[i].innerHTML.toLowerCase()== spans[j].innerText.toLowerCase()){
            //                 spans[j].style.color="red"
            //             }
            //         }
            //     }
            // }
            //
            //
            //
            // user_submit.fadeIn("slow");
            //
            // let ai_guess = $("<tr><td>aaa</td><td>bbb</td><td>ccc</td></tr>");
            // ai_guess.hide();
            // if($('#ai_table > tbody > tr:first').length==0){
            //     $('#ai_table > tbody').before(ai_guess);
            // }else{
            //     $('#ai_table > tbody > tr:first').before(ai_guess);
            // }
            // ai_guess.fadeIn("slow");
            //
            //
            // $('#userGuess').val("");
            // // round +=1;
        }
    });

});