$(document).ready(function() {
    var destPageNum = $("#flipbook").turn("page");

    $("#main_menu").hide();
    function gameplayFunction() {
        $("#winner_color_change_user").css("background-color","transparent");
        $("#winner_color_change_ai").css("background-color","transparent");
        $("#winner_color_change_user").hover(
            function() {
                $(this).css('background-color', '#b696e9')
            }, function() {
                $(this).css('background-color', 'transparent')
        });
        $("#winner_color_change_ai").hover(
            function() {
                $(this).css('background-color', '#b696e9')
            }, function() {
                $(this).css('background-color', 'transparent')
            })
        $("ai_answer").val("");
        console.log("game play clicked");
        var pageNum = $("#flipbook").turn("page");
        console.log(pageNum);

        $("#flipbook").turn("page", pageNum+1);
        $("#user_input").removeAttr("disabled");
        $("#user_name").text("");
        $("#ai_name").text("");
        $("#who_is_winner_player").text("");
        $("#who_is_winner_ai").text("");
    }

    $("body").on("keyup", "#ai_answer", function () {
        if (event.keyCode === 13) {
            $("#first_input_btn").click();
            $("#ai_answer").val("");
        }
    })

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
        $("#flipbook").bind("turning", function (event, page) {
            destPageNum = $("#flipbook").turn("page");
        });

        $("#flipbook").bind("turned", function(event, page, view) {
            if (page == 5 && destPageNum == 6) {
                var pageNum = $("#flipbook").turn("page");
                setTimeout(function () {
                    $("#flipbook").turn("page", pageNum-1);
                }, 500);
                setTimeout(function () {
                    $("#flipbook").turn("page", pageNum-3);
                }, 1000);
                setTimeout(function () {
                    $("#flipbook").turn("page", 1);
                }, 1500);

                $("#game_play").on("click", gameplayFunction);
                $("#flipbook").turn("disable", true);
            }
            else if (page == 5 && destPageNum == 7){
                var pageNum = $("#flipbook").turn("page");
                setTimeout(function () {
                    $("#flipbook").turn("page", pageNum-2);
                }, 500);
                setTimeout(function () {
                    $("#flipbook").turn("page", pageNum-4);
                }, 1000);
                setTimeout(function () {
                    $("#flipbook").turn("page", 1);
                }, 1500);
                $("#flipbook").turn("disable", true);
            }
        });

        var pageNum = $("#flipbook").turn("page");
        console.log(pageNum);
        $("#flipbook").turn("page", pageNum+1);
        setTimeout(function () {
        $("#flipbook").turn("page", pageNum+3);
        }, 500);
        setTimeout(function () {
        $("#flipbook").turn("page", pageNum+5);
        }, 1000);

        $.ajax({
            type:"get",
            dataType: "json",
            url: "/pastGameResult",
            success : function(data) {
                console.log(data)
                $('#pastGameResult1 > ul').empty()
                $('#pastGameResult2 > ul').empty()

                if(data.length<17){
                    for(let i=0;i<data.length;i++){
                        $("#pastGameResult1 > ul").append('<li><a class="pastGameResultList">'+data[i]+'</a></li>');
                    }

                    $("#pastGameResult1 > ul > li > a").click(function(){
                        var pageNum = $("#flipbook").turn("page");
                        $("#flipbook").turn("page", pageNum+2);
                    })
                }
                else{
                    for(let i=0;i<17;i++){
                        $("#pastGameResult1 > ul").append('<li><a class="pastGameResultList">'+data[i]+'</a></li>');
                    }
                    for(let j=0;j<data.length-17;j++){
                        $("#pastGameResult2 > ul").append('<li><a class="pastGameResultList">'+data[j+17]+'</a></li>');
                    }
                    $("#pastGameResult1 > ul > li > a").click(function(){
                        var pageNum = $("#flipbook").turn("page");
                        $("#flipbook").turn("page", pageNum+2);
                    })
                    $("#pastGameResult2 > ul > li > a").click(function(){
                        var pageNum = $("#flipbook").turn("page");
                        $("#flipbook").turn("page", pageNum+1);
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
                                        var res = "";

                                        if (data.rounds[m].aiGuess != null)
                                            res = data.rounds[m].aiGuess.split("");


                                        if (res != "") {

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
                                        }

                                        // if(data.rounds[m].aiGuess ==data.userWord){
                                        //     $("#AI_pastgameresult_logo").css("background-color", "green");
                                        //     $("#player_pastgameresult_logo").css("background-color", "red");
                                        // }else if(data.rounds[m].aiGuess ==data.computerWord){
                                        //     $("#AI_pastgameresult_logo").css("background-color", "red");
                                        //     $("#player_pastgameresult_logo").css("background-color", "green");
                                        // }

                                    }

                                    console.log(data.rounds)
                                    for(let m=0;m<data.rounds.length;m++){
                                        var res = data.rounds[m].userGuess.split("");


                                        let num_round = m+1
                                        let round = '<tr><td  style="width:33%">R'+num_round+'</td>';
                                        let userGuess ="<td style='width:33%'>";
                                        console.log(data.rounds[m].userColorArray);
                                        for(let k=0;k<data.rounds[m].userColorArray.length;k++){
                                            if(data.rounds[m].userColorArray[k] ==0){
                                                console.log("red")
                                                userGuess+='<span style="color:red;display:inline!important">' +res[k]+'</span>'
                                            }else{
                                                console.log("green")
                                                userGuess+='<span style="color:green;display:inline!important">' +res[k]+'</span>'
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
                                        var res = "";

                                        if (data.rounds[m].aiGuess != null)
                                            res = data.rounds[m].aiGuess.split("");

                                        if (res != "") {
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
                                                userGuess+='<span style="color:green;display:inline!important">' +res[k]+'</span>'
                                            }
                                        }
                                        userGuess +="</td>";
                                        let corr ="<td  style='width:33%'>";
                                        corr += (data.rounds[m].userColorArray).filter(function (x) {
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
                                        var res = "";

                                        if (data.rounds[m].aiGuess != null)
                                            res = data.rounds[m].aiGuess.split("");


                                        if (res != "") {
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
                                                userGuess+='<span style="color:green;display:inline!important">' +res[k]+'</span>'
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