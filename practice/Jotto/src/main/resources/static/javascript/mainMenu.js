$(document).ready(function() {
    function gameplayFunction() {
        console.log("game play clicked");
        var pageNum = $("#flipbook").turn("page");
        console.log(pageNum);

        $("#flipbook").turn("page", pageNum+1);
        $("#user_input").removeAttr("disabled");
        $("#user_name").text("User");
        $("#ai_name").text("AI");
        $("#who_is_winner_player").text("");
        $("#who_is_winner_ai").text("");
    }

    $("#ai_answer").keyup(function(event) {
        if (event.keyCode === 13) {
            $("#first_input_btn").click();
            $("#ai_answer").val("");
        }
    });


    $("#main_menu").hide();

    $("body").on("click", "#game_play",gameplayFunction);

    $("#flipbook").bind("turned", function(event, page, view) {
        if (page==1) {
            $("#flipbook").turn("disable", true);
            $("#past_result").on("click", pastGameResultFunction);
            $("#game_play").on("click", gameplayFunction);
        }
    });
    
    function pastGameResultFunction() {
        console.log("past_result clicked");
        $("#flipbook").turn("disable", false);
        $("#flipbook").bind("turned", function(event, page, view) {
            if (page==5) {
                var pageNum = $("#flipbook").turn("page");
                $("#flipbook").turn("page", --pageNum);
                $("#flipbook").turn("page", --pageNum);
                $("#flipbook").turn("page", --pageNum);
                $("#flipbook").turn("page", --pageNum);

                $("#game_play").on("click", gameplayFunction);
            }
        });

        var pageNum = $("#flipbook").turn("page");
        console.log(pageNum);
        $("#flipbook").turn("page", pageNum+1);
        setTimeout(function () {
            $("#flipbook").turn("page", pageNum+3);
        }, 1000);
        setTimeout(function () {
            $("#flipbook").turn("page", pageNum+5);
        }, 2000);





        $.ajax({
            type:"get",
            dataType: "json",
            url: "/pastGameResult",
            success : function(data) {
                console.log(data)
                if(data.length<17){
                        for(let i=0;i<data.length;i++){
                            $("#pastGameResult1 > ul").append('<li><a class="pastGameResultList">'+data[i]+'</a></li>');
                        }

                        $("#pastGameResult1 > ul > li > a").click(function(){
                            var pageNum = $("#flipbook").turn("page");
                            $("#flipbook").turn("page", pageNum+2);
                        })
                    }else{
                        for(let i=0;i<17;i++){
                            $("#pastGameResult1 > ul").append('<li><a class="pastGameResultList">'+data[i]+'</a></li>');
                        }
                        for(let j=0;j<data.length-20;j++){
                            $("#pastGameResult2 > ul").append('<tli><a class="pastGameResultList">'+data[i]+'</a></tli>');
                        }
                        $("#pastGameResult1 > ul > li > a").click(function(){
                            var pageNum = $("#flipbook").turn("page");
                            $("#flipbook").turn("page", pageNum+2);
                        })
                }



                let list1 = $("#pastGameResult1 > ul >li");
                let list2 = $("#pastGameResult2 > ul >li");
                if(list1.length <17){
                    for(let i=0; i<list1.length ; i++) {
                        list1[i].addEventListener("click",function(){
                            $("#ai_result_table > tbody").empty();
                            $("#player_result_table > tbody").empty();
                            $.ajax({
                                type:"get",
                                dataType: "json",
                                url: "/pastGameResult/data?data="+data[i],
                                success : function(data) {
                                    console.log(data)
                                    for(let m=0;m<data.rounds.length;m++){

                                        var res = data.rounds[m].aiGuess.split("");
                                        let num_round = m+1
                                        let round = '<tr><td  style="width:33%">R'+num_round+'</td>';
                                        let ai_guess ="<td  style='width:33%'>";
                                        for(let k=0;k<data.rounds[m].aiColorArray.length;k++){
                                            if(data.rounds[m].aiColorArray[k] ==0){
                                                ai_guess+='<span style="color:red;display:inline!important">' +res[k]+'</span>'
                                            }else{
                                                ai_guess+='<span style="color:green;display:inline!important">' +res[k]+'</span>'
                                            }
                                        }

                                        ai_guess +="</td>";

                                        let corr ="<td style='width:33%'>";
                                        corr += (data.rounds[m].aiColorArray).filter(function (x) {
                                            return x ==1;
                                        }).length;
                                        corr +="</td></tr>"
                                        let ai_submit = $(round + ai_guess + corr);
                                        if($('#ai_result_table > tbody > tr:first').length == 0) {
                                            $('#ai_result_table > tbody').append(ai_submit);
                                        }else{
                                            $('#ai_result_table > tbody > tr:first').before(ai_submit);
                                        }
                                        // if(data.rounds[m].aiGuess ==data.userWord){
                                        //     $("#AI_pastgameresult_logo").css("background-color", "green");
                                        //     $("#player_pastgameresult_logo").css("background-color", "red");
                                        // }else if(data.rounds[m].aiGuess ==data.computerWord){
                                        //     $("#AI_pastgameresult_logo").css("background-color", "red");
                                        //     $("#player_pastgameresult_logo").css("background-color", "green");
                                        // }

                                    }


                                    for(let m=0;m<data.rounds.length;m++){
                                        var res = data.rounds[m].userGuess.split("");


                                        let num_round = m+1
                                        let round = '<tr><td  style="width:33%">R'+num_round+'</td>';
                                        let userGuess ="<td style='width:33%'>";
                                        for(let k=0;k<data.rounds[m].userColorArray.length;k++){
                                            if(data.rounds[m].userColorArray[k] ==0){
                                                userGuess+='<span style="color:red;display:inline!important">' +res[k]+'</span>'
                                            }else{
                                                userGuess+='<span style="color:red;display:inline!important">' +res[k]+'</span>'
                                            }
                                        }
                                        userGuess +="</td>";
                                        let corr ="<td style='width:33%'>";
                                        corr += (data.rounds[m].userColorArray).filter(function (x) {
                                            return x ==1;
                                        }).length;
                                        corr +="</td></tr>"
                                        let user_submit = $(round + userGuess+corr);
                                        //user_submit.hide();
                                        if($('#player_result_table > tbody > tr:first').length == 0) {
                                            $('#player_result_table > tbody').append(user_submit);
                                        }else{
                                            $('#player_result_table > tbody > tr:first').before(user_submit);
                                        }
                                    }

                                },error : function(request,err){
                                    console.log('Fail!');
                                }
                            });
                        });
                    }
                }else{ //The number of list >20
                    for(let i=0; i<list1.length ; i++) {
                        list1[i].addEventListener("click",function(){
                            $("#ai_result_table > tbody").empty();
                            $("#player_result_table > tbody").empty();
                            $.ajax({
                                type:"get",
                                dataType: "json",
                                url: "/pastGameResult/data?data="+data[i],
                                success : function(data) {
                                    console.log(data)
                                    for(let m=0;m<data.rounds.length;m++){

                                        var res = data.rounds[m].aiGuess.split("");
                                        let num_round = m+1
                                        let round = '<tr><td style="width:33%">R'+num_round+'</td>';
                                        let ai_guess ="<td style='width:33%'>";
                                        for(let k=0;k<data.rounds[m].aiColorArray.length;k++){
                                            if(data.rounds[m].aiColorArray[k] ==0){
                                                ai_guess+='<span style="color:red;display:inline!important">' +res[k]+'</span>'
                                            }else{
                                                ai_guess+='<span style="color:green;display:inline!important">' +res[k]+'</span>'
                                            }
                                        }

                                        ai_guess +="</td>";
                                        let corr ="<td style='width:33%'>";
                                        corr += (data.rounds[m].userColorArray).filter(function (x) {
                                            return x ==1;
                                        }).length;
                                        corr +="</td></tr>"
                                        let ai_submit = $(round + ai_guess+corr);
                                        //ai_submit.hide();
                                        if($('#ai_result_table > tbody > tr:first').length == 0) {
                                            $('#ai_result_table > tbody').append(ai_submit);
                                        }else{
                                            $('#ai_result_table > tbody > tr:first').before(ai_submit);
                                        }
                                    }


                                    for(let m=0;m<data.rounds.length;m++){
                                        var res = data.rounds[m].userGuess.split("");
                                        let num_round = m+1
                                        let round = '<tr><td  style="width:33%">R'+num_round+'</td>';
                                        let userGuess ="<td  style='width:33%'>";
                                        for(let k=0;k<data.rounds[m].userColorArray.length;k++){
                                            if(data.rounds[m].userColorArray[k] ==0){
                                                userGuess+='<span style="color:red;display:inline!important">' +res[k]+'</span>'
                                            }else{
                                                userGuess+='<span style="color:red;display:inline!important">' +res[k]+'</span>'
                                            }
                                        }
                                        userGuess +="</td>";
                                        let corr ="<td  style='width:33%'>";
                                        corr += (data.rounds[m].aiColorArray).filter(function (x) {
                                            return x ==1;
                                        }).length;
                                        corr +="</td></tr>"
                                        let user_submit = $(round + userGuess+ corr);
                                        //user_submit.hide();
                                        if($('#player_result_table > tbody > tr:first').length == 0) {
                                            $('#player_result_table > tbody').append(user_submit);
                                        }else{
                                            $('#player_result_table > tbody > tr:first').before(user_submit);
                                        }
                                    }

                                },error : function(request,err){
                                    console.log('Fail!');
                                }
                            });
                        });
                    }
                    for(let i=0; i<list2.length ; i++) {
                        list2[i].addEventListener("click",function(){
                            $("#ai_result_table > tbody").empty();
                            $("#player_result_table > tbody").empty();
                            $.ajax({
                                type:"get",
                                dataType: "json",
                                url: "/pastGameResult/data?data="+data[i+20],
                                success : function(data) {
                                    for(let m=0;m<data.rounds.length;m++){

                                        var res = data.rounds[m].aiGuess.split("");
                                        let num_round = m+1
                                        let round = '<tr><td  style="width:33%">R'+num_round+'</td>';
                                        let ai_guess ="<td  style='width:33%'>";
                                        for(let k=0;k<data.rounds[m].aiColorArray.length;k++){
                                            if(data.rounds[m].aiColorArray[k] ==0){
                                                ai_guess+='<span style="color:red;display:inline!important">' +res[k]+'</span>'
                                            }else{
                                                ai_guess+='<span style="color:green;display:inline!important">' +res[k]+'</span>'
                                            }
                                        }
                                        ai_guess +="</td>";
                                        let corr ="<td  style='width:33%'>";
                                        corr += (data.rounds[m].aiColorArray).filter(function (x) {
                                            return x ==1;
                                        }).length;
                                        corr +="</td></tr>"
                                        let ai_submit = $(round + ai_guess + corr);
                                        //ai_submit.hide();
                                        if($('#ai_result_table > tbody > tr:first').length == 0) {
                                            $('#ai_result_table > tbody').append(ai_submit);
                                        }else{
                                            $('#ai_result_table > tbody > tr:first').before(ai_submit);
                                        }
                                    }


                                    for(let m=0;m<data.rounds.length;m++){
                                        var res = data.rounds[m].userGuess.split("");
                                        let num_round = m+1
                                        let round = '<tr><td  style="width:33%">R'+num_round+'</td>';
                                        let userGuess ="<td  style='width:33%'>";
                                        for(let k=0;k<data.rounds[m].userColorArray.length;k++){
                                            if(data.rounds[m].userColorArray[k] ==0){
                                                userGuess+='<span style="color:red;display:inline!important">' +res[k]+'</span>'
                                            }else{
                                                userGuess+='<span style="color:red;display:inline!important">' +res[k]+'</span>'
                                            }
                                        }
                                        userGuess +="</td>";
                                        let corr ="<td  style='width:33%'>";
                                        corr += (data.rounds[m].aiColorArray).filter(function (x) {
                                            return x ==1;
                                        }).length;
                                        corr +="</td></tr>"
                                        let user_submit = $(round + userGuess+ corr);

                                        //user_submit.hide();
                                        if($('#player_result_table > tbody > tr:first').length == 0) {
                                            $('#player_result_table > tbody').append(user_submit);
                                        }else{
                                            $('#player_result_table > tbody > tr:first').before(user_submit);
                                        }
                                    }

                                },error : function(request,err){
                                    console.log('Fail!');
                                }
                            });
                        });
                    }
                }
            },error : function(request,err){
                console.log('Fail!');
            }
        });
    }

    $("body").on("click", "#past_result",pastGameResultFunction);
});