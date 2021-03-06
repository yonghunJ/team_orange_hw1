<!DOCTYPE html>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<html lang="en" dir="ltr" style="height:100%">
<head>

    <meta charset="utf-8">
    <title>Jotto</title>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/css/bootstrap.min.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/js/bootstrap.min.js"></script>
    <script src="/javascript/turn.js"></script>
    <script src="/javascript/login.js"></script>
    <script src="/javascript/signUp.js"></script>
    <script src="/javascript/index.js"></script>
    <script src="/javascript/mainMenu.js"></script>
    <script src="/javascript/userFirstInput.js"></script>
    <script src="/javascript/pastGameResult.js"></script>
    <script src="/javascript/gamePlay.js"></script>

    <link rel="stylesheet" href="/css/index.css">
    <link rel="stylesheet" href="/css/gamePlay.css">
    <link rel="stylesheet" href="/css/login.css">
    <link rel="stylesheet" href="/css/signUp.css">
    <link rel="stylesheet" href="/css/userFirstInput.css">
    <style>
        * {
            font-family: "whatever it takes";
        }

    </style>
    <link rel="stylesheet" href="/css/pastGameResult.css">
    <link rel="icon" href="/image/logo.png">

</head>
<body>

<div id="canvas">

    <div id="flipbook" style="background-color:transparent">
        <%--Book Cover--%>
        <div class="">
            <div id="gameTitle">

                <div id="title1">Jotto</div>
                <div id="title2">Game</div>
            </div>
            <div id="login_form" stlye="position:absolute; top 100px;right:0px;">
                <p><span>ID:</span><input type="text" id="login_id" name="login_id" placeholder="User Name" class="input_login"></p>
                <p><span>Password:</span><input type="password" id="login_pw"  name="login_pw" class="input_login" placeholder="Password"></p>
                <button type="submit" id = "login_btn" class="yh_btn">Log In</button>

                <button type="button" class="yh_btn" data-toggle="modal" data-target="#darkModalForm" >SignUp</button>
                <div id="login_warning" style="color:red;"></div>
            </div>
            <div id="main_menu">
                <%--<a id="game_play" class="intro-banner-vdo-play-btn pinkBg" target="_blank">--%>

                <%--</a>--%>
                <a href="#" id ="game_play" class="btn1">Game Play</a>
                <hr>
                <%--<a id="past_result" class="intro-banner-vdo-play-btn pinkBg" target="_blank">--%>
                <a href="#" id ="past_result" class="btn2">Past Game Result</a>
                <%--</a>--%>
            </div>
            <% } else { %>
            <div id="main_menu1">
                <%--<a id="game_play" class="intro-banner-vdo-play-btn pinkBg" target="_blank">--%>

                <%--</a>--%>
                <a href="#" id ="game_play" class="btn1">Game Play</a>
                <hr>
                <%--<a id="past_result" class="intro-banner-vdo-play-btn pinkBg" target="_blank">--%>
                <a href="#" id ="past_result" class="btn2">Past Game Result</a>
                <%--</a>--%>
            </div>
            <% } %>



            <div>

            </div>


        </div>
        <%-- User First Input--%>
        <div style="background-color:green" class="even">
            <div id="user_first_input_box">
                <h1 id="welcome">Welcome to Jotto Game</h1>
                <div class="webflow-style-input">
                    <input  id = "ai_answer"type="email" placeholder="5 letter Input" maxlength="5" size="3" size="5";>
                    <button type="button" id = "first_input_btn" class="yh_btn" style="color:beige;">Enter</button>
                </div>
                <div id ="ai_answer_inadquate">
                </div>
            </div>
        </div>
        <div style="background-color:purple" class="odd">
            <div id="instruction">
                <br>
                <p class="instruction_p">Choose a one 5 letter word. It should have no repeating letters.</p>
                <p class="instruction_p">The computer will also choose one 5 letter word with no repeating letters.</p>
                <p class="instruction_p">Each round, you guess the computer's created word. Then we will show the number of matching letters in your guessed word and the computer's word.</p>
                <p class="instruction_p">You can color the alphabet to mark if it is in the computer's word.</p>
                <p class="instruction_p">If you figure out what the computer's word is before the computer does, you win.</p>
                <br>
                <p class="instruction_p">Good luck!</p>
            </div>
        </div>

        <%-- Game Play --%>
        <div class="even">
            <div>
                <div class="demo" id="ai_plate">
                    <div class="container">
                        <div class="row">
                            <div id="main_page_recall">
                                <button id="main_page_recall_btn"><img src="/image/home.svg" height="25" width="25"></button>
                            </div>
                            <div class="col-md-3 col-sm-6" id="ai_screen">
                                <div class="pricingTable">
                                    <div class="pricingTable-header" id="winner_color_change_user">
                                        <div id="who_is_winner_player"></div>
                                        <span class="price-icon"></span>
                                        <span class="price-value">Player<span class="month"></span></span>
                                        <h3 class="heading" id="user_name"></h3>
                                    </div>
                                    <div class="pricingContent">
                                        <table id="player_table">
                                            <thead>
                                                <td>Round</td><td>Guess</td><td>Count</td>
                                            </thead>
                                            <tbody>
                                            </tbody>
                                        </table>
                                    </div><!-- /  CONTENT BOX-->
                                </div><!-- BUTTON BOX-->
                                <div id="div-left">
                                    <div class="webflow-style-input">
                                        <input id="userGuess" type="email" placeholder="5 letter Input" size="10" maxlength="5";>
                                        <button type="button" id = "user_input" size="10" class="yh_btn" style="color:beige;">Enter</button>

                                    </div>
                                </div>
                                <div id="div-right">
                                    <span id="invalid_word_check" style="color:red"></span>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>


                <div id="alphabet_buttons_top">
                    <button type="button" class="raise ">A</button>
                    <button type="button" class="raise  ">B</button>
                    <button type="button" class="raise  ">C</button>
                    <button type="button" class="raise  ">D</button>
                    <button type="button" class="raise  ">E</button>
                    <button type="button" class="raise  ">F</button>
                    <button type="button" class="raise  ">G</button>
                    <button type="button" class="raise  ">H</button>
                    <button type="button" class="raise  ">I</button>
                    <button type="button" class="raise  ">J</button>
                    <button type="button" class="raise  ">K</button>
                    <button type="button" class="raise  ">L</button>
                    <button type="button" class="raise  ">M</button>
                </div>
                <div id="alphabet_buttons_bottom">
                    <button type="button" class="raise  ">N</button>
                    <button type="button" class="raise  ">O</button>
                    <button type="button" class="raise  ">P</button>
                    <button type="button" class="raise  ">Q</button>
                    <button type="button" class="raise  ">R</button>
                    <button type="button" class="raise  ">S</button>
                    <button type="button" class="raise  ">T</button>
                    <button type="button" class="raise  ">U</button>
                    <button type="button" class="raise  ">V</button>
                    <button type="button" class="raise  ">W</button>
                    <button type="button" class="raise  ">X</button>
                    <button type="button" class="raise  ">Y</button>
                    <button type="button" class="raise  ">Z</button>
                </div>
            </div>
        </div>
        <div style="background-color:yellow" class="odd">
            <div class="demo" id="player_plate">
                <div class="container">
                    <div class="row">
                        <div class="col-md-3 col-sm-6 player_screen" id="">
                            <div class="pricingTable">
                                <div class="pricingTable-header" id="winner_color_change_ai">
                                    <div id="who_is_winner_ai"></div>
                                    <span class="price-icon"></span>
                                    <span class="price-value" class="price-value-ai">AI<span class="month"></span></span>
                                    <h3 class="heading" id="ai_name">AI</h3>
                                </div>
                                <div class="pricingContent">
                                    <table id ="ai_table">
                                        <thead>
                                            <td>Round</td><td>Guess</td><td>Count</td>
                                        </thead>
                                        <tbody>
                                        </tbody>
                                    </table>
                                </div><!-- /  CONTENT BOX-->
                            </div><!-- BUTTON BOX-->
                        </div>
                    </div>
                </div>


            </div>
        </div>
        <div style="background-color:green"class="even">
            <div id="pastGameResult1" class="pastGameResult">
                <ul>
                </ul>

            </div>
        </div>

        <div style="background-color:purple" class="odd">
            <div id="pastGameResult2" class="pastGameResult">
                <ul>
                </ul>

            </div>
        </div>
        <div style="background-color:gray"class="even">
            <div class="container">
                <div class="row">
                    <div class="col-md-3 col-sm-6 player_screen"  >
                        <div class="pricingTable">
                            <div class="pricingTable-header" id="winner_color_change_player2">
                                <div id="who_is_winner_player1"></div>
                                <span class="price-icon" id="player_pastgameresult_logo"></span>
                                <span class="price-value"><span class="month">Player</span></span>
                                <h3 class="heading" id="user_name_result">User</h3>
                            </div>

                            <div class="pricingContent">
                                <table id ="player_result_table">
                                    <thead>
                                        <td>Round</td><td>Guess</td><td>Count</td>
                                    </thead>
                                    <tbody>

                                    </tbody>
                                </table>

                            </div><!-- /  CONTENT BOX-->
                        </div><!-- BUTTON BOX-->
                    </div>
                </div>
            </div>
        </div>
        <div class="odd">
            <div class="container">
                <div class="row">
                    <div class="col-md-3 col-sm-6 player_screen"  >
                        <div class="pricingTable">
                            <div class="pricingTable-header"  id="winner_color_change_ai2">
                                <div id="who_is_winner_ai1"></div>
                                <span class="price-icon" id="AI_pastgameresult_logo"></span>
                                <span class="price-value"><span class="month">Computer</span></span>
                                <h3 class="heading"  id="ai_name_result">AI</h3>
                            </div>

                            <div class="pricingContent">
                                <table id ="ai_result_table">
                                    <thead>
                                        <td>Round</td><td>Guess</td><td>Count</td>
                                    </thead>
                                    <tbody>
                                    </tbody>
                                </table>
                            </div><!-- /  CONTENT BOX-->
                        </div><!-- BUTTON BOX-->
                    </div>
                </div>
            </div>
        </div>

        <div class="hard"></div>
        <div class="hard"></div>
    </div>
</div>

<%--signup form--%>
<form action ="/" method="POST" >
    <div class="modal fade" id="darkModalForm" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog form-dark" role="document">
            <div class="modal-content card card-image" >
                <div class="text-white rgba-stylish-strong py-5 px-5 z-depth-4">
                    <div class="modal-header text-center pb-4">
                        <h3 class="modal-title w-100 white-text font-weight-bold" id="myModalLabel">
                            <strong class="green-text font-weight-bold">SIGN UP</strong>
                        </h3>
                        <button type="button" class="close white-text" data-dismiss="modal" aria-label="Close">
                        </button>
                    </div>
                    <!--Body-->
                    <div class="modal-body">
                        <div class="md-form mb-5">
                            <label data-error="wrong" data-success="right" for="signup_id">ID</label>
                            <input type="text" id="signup_id" name="signup_id" class="form-control validate white-text" required><label id="signup_id_warning" style="font-family: 'Lato', Calibri, Arial, sans-serif; color:red; size: 16px; margin-left: 13px;"></label>
                        </div>
                        <div class="md-form pb-3">
                            <label data-error="wrong" data-success="right" for="signup_pw">PASSWORD</label>
                            <input type="password" id="signup_pw" name="signup_pw" class="form-control validate white-text"
                                   pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters" required>
                            <label data-error="wrong" data-success="right" for="signup_pw2">CHECK PASSWORD</label>
                            <input type="password" id="signup_pw2" name="signup_pw2" class="form-control validate white-text" required>
                        </div>

                        <div class="row d-flex align-items-center mb-4">
                            <div class="text-center mb-3 col-md-12">
                                <button type="submit" id="signup_btn" class="btn btn-success btn-block btn-rounded z-depth-1" onsubmit="return validateForm()">Sign up</button>
                            </div>
                        </div>
                        <div class="row"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</form>


</body>
<script>
    $("#flipbook").turn({
        width: 400,
        height: 300,
        duration:1300,
        autoCenter: false,
        gradients:false
    });
    $("#flipbook").turn("disable", true);
    // $(".turn-page-wrapper").click(function(){
    //   console.log("Ha")
    // })
    $("#flipbook").turn("size", 1200, 700);
    // $("#flipbook").turn("center");


</script>

</html>