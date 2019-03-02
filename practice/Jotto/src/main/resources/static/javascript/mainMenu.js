$(document).ready(function() {

    $("#main_menu").hide();

    $("#game_play").click(function(){
        console.log("game play clicked");
        var pageNum = $("#flipbook").turn("page");
        console.log(pageNum);
        $("#flipbook").turn("page", pageNum+1);
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
                        $("#pastGameResult1 > ul").append("list");
                    }
                }else{
                    for(let i=0;i<20;i++){
                        $("#pastGameResult1 > ul").append("list");
                    }
                    for(let j=0;j<data.length-20;j++){
                        $("#pastGameResult2 > ul").append("list");
                    }
                }



                let list1 = $("#pastGameResult1 > ul");
                let list2 = $("#pastGameResult2 > ul");

                for(let i=0; i<list1.length ; i++) {
                    list1[i].addEventListener("click",function(){
                        $.ajax({
                            type:"get",
                            dataType: "json",
                            url: "/pastGameResult/data?data="+data,
                            success : function(data) {


                                for(let m=0;m<data.length;m++){
                                    var res = data.ai_answer[0].split("");
                                    let round = '<tr><td>'+'round'+'</td>';
                                    let user_guess = '<td><span>'+res[0]+'</span><span>' +res[1]+'</span><span>' +res[2]+'</span><span>' +res[3]+'</span><span>' +res[4]+'</span></td>';
                                    let guess_corr = '<td>'+'correct'+'</td></tr>'
                                    let user_submit = $(round + user_guess + guess_corr);
                                    user_submit.hide();
                                    if($('#ai_result_table > tbody > tr:first').length == 0) {
                                        $('#ai_result_table > tbody').append(user_submit);
                                    }else{
                                        $('#ai_result_table > tbody > tr:first').before(user_submit);
                                    }
                                }
                                for(let m=0;m<data.length;m++){
                                    var res = data.user_answer[0].split("");
                                    let round = '<tr><td>'+'round'+'</td>';
                                    let user_guess = '<td><span>'+res[0]+'</span><span>' +res[1]+'</span><span>' +res[2]+'</span><span>' +res[3]+'</span><span>' +res[4]+'</span></td>';
                                    let guess_corr = '<td>'+'correct'+'</td></tr>'
                                    let user_submit = $(round + user_guess + guess_corr);
                                    user_submit.hide();
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

                for(let i=0; i<list1.length ; i++) {
                    list2[i].addEventListener("click",function(){
                        $.ajax({
                            type:"get",
                            dataType: "json",
                            url: "/pastGameResult/data?data="+data,
                            success : function(data) {


                                for(let m=0;m<data.length;m++){
                                    var res = data.ai_answer[0].split("");
                                    let round = '<tr><td>'+'round'+'</td>';
                                    let user_guess = '<td><span>'+res[0]+'</span><span>' +res[1]+'</span><span>' +res[2]+'</span><span>' +res[3]+'</span><span>' +res[4]+'</span></td>';
                                    let guess_corr = '<td>'+'correct'+'</td></tr>'
                                    let user_submit = $(round + user_guess + guess_corr);
                                    user_submit.hide();
                                    if($('#ai_result_table > tbody > tr:first').length == 0) {
                                        $('#ai_result_table > tbody').append(user_submit);
                                    }else{
                                        $('#ai_result_table > tbody > tr:first').before(user_submit);
                                    }
                                }
                                for(let m=0;m<data.length;m++){
                                    var res = data.user_answer[0].split("");
                                    let round = '<tr><td>'+'round'+'</td>';
                                    let user_guess = '<td><span>'+res[0]+'</span><span>' +res[1]+'</span><span>' +res[2]+'</span><span>' +res[3]+'</span><span>' +res[4]+'</span></td>';
                                    let guess_corr = '<td>'+'correct'+'</td></tr>'
                                    let user_submit = $(round + user_guess + guess_corr);
                                    user_submit.hide();
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

            },error : function(request,err){
                console.log('Fail!');
            }
        });




    });
});