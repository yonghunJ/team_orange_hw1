$(document).ready(function() {

    $("#main_menu").hide();

    $("#game_play").click(function(){
        console.log("game play clicked");
        var pageNum = $("#flipbook").turn("page");
        console.log(pageNum);
        $("#flipbook").turn("page", pageNum+1);
        $("#user_input").removeAttr("disabled");
    });
    $("#past_result").click(function(){
        console.log("past_result clicked");
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
                if(data.length<20){
                        for(let i=0;i<data.length;i++){
                            $("#pastGameResult1 > ul").append('<li><a class="pastGameResultList">'+data[i]+'</a></li>');
                        }
                    }else{
                        for(let i=0;i<20;i++){
                            $("#pastGameResult1 > ul").append('<li><a class="pastGameResultList">'+data[i]+'</a></li>');
                        }
                        for(let j=0;j<data.length-20;j++){
                            $("#pastGameResult2 > ul").append('<tli><a class="pastGameResultList">'+data[i]+'</a></tli>');
                        }
                }



                let list1 = $("#pastGameResult1 > ul >li");
                let list2 = $("#pastGameResult2 > ul >li");
                if(list1.length <20){
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
                                        console.log("res"+res)
                                        let round = '<tr><td>'+'round'+'</td>';
                                        let ai_guess ="<td>";
                                        for(let k=0;k<data.rounds[m].aiColorArray.length;k++){
                                            if(data.rounds[m].aiColorArray[k] ==0){
                                                ai_guess+='<span style="color:red;display:inline!important">' +res[k]+'</span>'
                                            }else{
                                                ai_guess+='<span style="color:green;display:inline!important">' +res[k]+'</span>'
                                            }
                                        }

                                        ai_guess +="</td></tr>";
                                        console.log("ai_guess"+ai_guess)
                                        let ai_submit = $(round + ai_guess);
                                        //ai_submit.hide();
                                        if($('#ai_result_table > tbody > tr:first').length == 0) {
                                            $('#ai_result_table > tbody').append(ai_submit);
                                        }else{
                                            $('#ai_result_table > tbody > tr:first').before(ai_submit);
                                        }
                                    }


                                    for(let m=0;m<data.rounds.length;m++){
                                        var res = data.rounds[m].userGuess.split("");
                                        let round = '<tr><td>'+'round'+'</td>';
                                        let userGuess ="<td>";
                                        for(let k=0;k<data.rounds[m].userColorArray.length;k++){
                                            if(data.rounds[m].userColorArray[k] ==0){
                                                userGuess+='<span style="color:red;display:inline!important">' +res[k]+'</span>'
                                            }else{
                                                userGuess+='<span style="color:red;display:inline!important">' +res[k]+'</span>'
                                            }
                                        }

                                        userGuess +="</td></tr>";
                                        let user_submit = $(round + userGuess);
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
                                        console.log("res"+res)
                                        let round = '<tr><td>'+'round'+'</td>';
                                        let ai_guess ="<td>";
                                        for(let k=0;k<data.rounds[m].aiColorArray.length;k++){
                                            if(data.rounds[m].aiColorArray[k] ==0){
                                                ai_guess+='<span style="color:red;display:inline!important">' +res[k]+'</span>'
                                            }else{
                                                ai_guess+='<span style="color:green;display:inline!important">' +res[k]+'</span>'
                                            }
                                        }

                                        ai_guess +="</td></tr>";
                                        console.log("ai_guess"+ai_guess)
                                        let ai_submit = $(round + ai_guess);
                                        //ai_submit.hide();
                                        if($('#ai_result_table > tbody > tr:first').length == 0) {
                                            $('#ai_result_table > tbody').append(ai_submit);
                                        }else{
                                            $('#ai_result_table > tbody > tr:first').before(ai_submit);
                                        }
                                    }


                                    for(let m=0;m<data.rounds.length;m++){
                                        var res = data.rounds[m].userGuess.split("");
                                        let round = '<tr><td>'+'round'+'</td>';
                                        let userGuess ="<td>";
                                        for(let k=0;k<data.rounds[m].userColorArray.length;k++){
                                            if(data.rounds[m].userColorArray[k] ==0){
                                                userGuess+='<span style="color:red;display:inline!important">' +res[k]+'</span>'
                                            }else{
                                                userGuess+='<span style="color:red;display:inline!important">' +res[k]+'</span>'
                                            }
                                        }

                                        userGuess +="</td></tr>";
                                        let user_submit = $(round + userGuess);
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
                                        console.log("res"+res)
                                        let round = '<tr><td>'+'round'+'</td>';
                                        let ai_guess ="<td>";
                                        for(let k=0;k<data.rounds[m].aiColorArray.length;k++){
                                            if(data.rounds[m].aiColorArray[k] ==0){
                                                ai_guess+='<span style="color:red;display:inline!important">' +res[k]+'</span>'
                                            }else{
                                                ai_guess+='<span style="color:green;display:inline!important">' +res[k]+'</span>'
                                            }
                                        }

                                        ai_guess +="</td></tr>";
                                        console.log("ai_guess"+ai_guess)
                                        let ai_submit = $(round + ai_guess);
                                        //ai_submit.hide();
                                        if($('#ai_result_table > tbody > tr:first').length == 0) {
                                            $('#ai_result_table > tbody').append(ai_submit);
                                        }else{
                                            $('#ai_result_table > tbody > tr:first').before(ai_submit);
                                        }
                                    }


                                    for(let m=0;m<data.rounds.length;m++){
                                        var res = data.rounds[m].userGuess.split("");
                                        let round = '<tr><td>'+'round'+'</td>';
                                        let userGuess ="<td>";
                                        for(let k=0;k<data.rounds[m].userColorArray.length;k++){
                                            if(data.rounds[m].userColorArray[k] ==0){
                                                userGuess+='<span style="color:red;display:inline!important">' +res[k]+'</span>'
                                            }else{
                                                userGuess+='<span style="color:red;display:inline!important">' +res[k]+'</span>'
                                            }
                                        }

                                        userGuess +="</td></tr>";
                                        let user_submit = $(round + userGuess);
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




    });
});