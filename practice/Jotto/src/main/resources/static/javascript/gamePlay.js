$(document).ready(function(){

    $("body").on("click","#main_page_recall_btn",function(){
        var pageNum = $("#flipbook").turn("page");
        $("#flipbook").turn("page", pageNum-3);
    })

    $("#userGuess").keyup(function(event) {
        if (event.keyCode === 13) {
            $("#user_input").click();
            $("#userGuess").val("");
        }
    });


    let user_buttons = document.getElementsByClassName("raise");

    for(let i=0; i<user_buttons.length ; i++){
        user_buttons[i].addEventListener("click",function(){
            if(user_buttons[i].style.backgroundColor =="" || user_buttons[i].style.backgroundColor =="black"){
                user_buttons[i].style.backgroundColor ="green";
                let spans = $("#player_table > tbody > tr td span");
                for(let j=0;j<spans.length;j++){
                    if(user_buttons[i].innerHTML.toLowerCase()== spans[j].innerText.toLowerCase()){
                        spans[j].style.color="green"
                    }
                }
            }else if(user_buttons[i].style.backgroundColor =="green"){
                user_buttons[i].style.backgroundColor ="red";
                let spans = $("#player_table > tbody > tr td span");
                for(let j=0;j<spans.length;j++){
                    if(user_buttons[i].innerHTML.toLowerCase()== spans[j].innerText.toLowerCase()){
                        spans[j].style.color="red"
                    }
                }
            }else if(user_buttons[i].style.backgroundColor =="red"){
                user_buttons[i].style.backgroundColor ="black";
                let spans = $("#player_table > tbody > tr td span");
                for(let j=0;j<spans.length;j++){
                    if(user_buttons[i].innerHTML.toLowerCase()== spans[j].innerText.toLowerCase()){
                        spans[j].style.color="black"
                    }
                }
            }
        });
    }

    //5 input

    $("body").on("click","#user_input" ,function() {
        var bla = $('#userGuess').val();
        if(bla.length != 5){
            $("#invalid_word_check").text("Wrong input")
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
                        let game_round_number = data.game_round_number;
                        let ai_color_array;
                        let usr_split = user_guess_word.split("");
                        let round = '<tr><td>R'+game_round_number+'</td>';
                        let user_guess = '<td><span>'+usr_split[0]+'</span><span>' +usr_split[1]+'</span><span>' +usr_split[2]+'</span><span>' +usr_split[3]+'</span><span>' +usr_split[4]+'</span></td>';
                        let user_guess_corr = '<td>'+user_guess_count+'</td></tr>'
                        if (data.ai_color_array != null) {
                            ai_color_array = data.ai_color_array.aiColorArray;
                        }

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
                                let spans = $("#player_table > tbody > tr td span");
                                for(let j=0;j<spans.length;j++){
                                    if(al_button[i].innerHTML.toLowerCase()== spans[j].innerText.toLowerCase()){
                                        spans[j].style.color="black"
                                    }
                                }
                            }else if(al_button[i].style.backgroundColor =="green"){
                                let spans = $("#player_table > tbody > tr td span");
                                for(let j=0;j<spans.length;j++){
                                    if(al_button[i].innerHTML.toLowerCase()== spans[j].innerText.toLowerCase()){
                                        spans[j].style.color="green"
                                    }
                                }
                            }else if(al_button[i].style.backgroundColor =="red"){
                                let spans = $("#player_table > tbody > tr td span");
                                for(let j=0;j<spans.length;j++){
                                    if(al_button[i].innerHTML.toLowerCase()== spans[j].innerText.toLowerCase()){
                                        spans[j].style.color="red"
                                    }
                                }
                            }
                        }

                        user_submit.fadeIn("slow");
                        if (data.ai_color_array != null) {
                            var ai_split = ai_guess.split("");
                            let ui_guess = '<td>';
                            for(let k=0;k<5;k++){
                                if(ai_color_array[k] ==0){
                                    ui_guess+= '<span style="color:red">'+ai_split[k]+'</span>';
                                }else{
                                    ui_guess+= '<span style="color:green">'+ai_split[k]+'</span>';
                                }
                            }


                            ui_guess+= '</td>';
                            let ai_guess_corr = '<td>'+ai_guess_count+'</td></tr>'

                            let ai_submit = $(round + ui_guess + ai_guess_corr);
                            ai_submit.hide();

                            if($('#ai_table > tbody > tr:first').length == 0) {
                                $('#ai_table > tbody').append(ai_submit);
                            }else{
                                $('#ai_table > tbody > tr:first').before(ai_submit);
                            }
                            ai_submit.fadeIn("slow");
                        }

                        if(user_game_ended==true){//user win
                            $("#user_input").attr("disabled", "disabled");
                            $("#user_name").text(user_guess_word);
                            $("#ai_name").text(ai_guess);
                            $("#who_is_winner_player").text("Win");
                            $("#who_is_winner_ai").text("Lose");


                        }else if(ai_game_ended ==true){// AI win
                            $("#user_input").attr("disabled", "disabled");
                            $("#user_name").text(user_guess_word);
                            $("#ai_name").text(ai_guess);
                            $("#who_is_winner_player").text("Lose");
                            $("#who_is_winner_ai").text("Win");

                        }
                        $("#invalid_word_check").text("");
                    }else{
                        $("#invalid_word_check").text("This is not a word");
                    }
                },error : function(request,err){
                    console.log('Fail!');
                    console.log("User ID: " + this.login_pw);
                }
            })
        }
        $('#userGuess').val("");
    });
});