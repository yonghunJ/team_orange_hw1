<!DOCTYPE html>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<html lang="en" dir="ltr">
<head>
    <meta charset="utf-8">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/css/bootstrap.min.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/js/bootstrap.min.js"></script>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="/css/login.css">
    <link rel="stylesheet" href="/css/sign_up.css">
    <script type="text/javascript" src="/javascript/login.js" ></script>
    <title>Jotto</title>
</head>
<body class="bg">
<div class="container">
    <div class="row">
        <div id="login_box" class="col-lg-12 col-ml-12 col-xs-12">
            <form action="./gamePlay.jsp" method="get" >
                <div class="form-group">
                    <input type="text" name="name" placeholder="User Name" class="input_login" required=""/>
                    <input type="password"  name="password" class="input_login" placeholder="Password" required=""/>
                    <button type="submit" class="yh_btn">Log In</button>
                    <button type="button" class="btn btn-link" data-toggle="modal" data-target="#darkModalForm" >SignUp</button>
                </div>
            </form>
        </div>
    </div>
</div>

<form action ="./sample1.html" method="get" >
    <div class="modal fade" id="darkModalForm" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog form-dark" role="document">
            <div class="modal-content card card-image" style="background-image: url('/image/sign_up.jpg');">
                <div class="text-white rgba-stylish-strong py-5 px-5 z-depth-4">
                    <div class="modal-header text-center pb-4">
                        <h3 class="modal-title w-100 white-text font-weight-bold" id="myModalLabel">
                            <strong>JOTTO GAME</strong><a class="green-text font-weight-bold"><strong>SIGN UP</strong></a>
                        </h3>
                        <button type="button" class="close white-text" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <!--Body-->
                    <div class="modal-body">
                        <div class="md-form mb-5">
                            <label data-error="wrong" data-success="right" for="signup_id">ID</label>
                            <input type="text" id="signup_id" class="form-control validate white-text" required>
                        </div>
                        <div class="md-form mb-5">
                            <label data-error="wrong" data-success="right" for="signup_name">NAME</label>
                            <input type="text" id="signup_name" class="form-control validate white-text" required>
                        </div>
                        <div class="md-form pb-3">
                            <label data-error="wrong" data-success="right" for="signup_pw">PASSWORD</label>
                            <input type="password" id="signup_pw" class="form-control validate white-text"
                                   pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters" required>
                            <label data-error="wrong" data-success="right" for="signup_pw2">CHECK PASSWORD</label>
                            <input type="password" id="signup_pw2" class="form-control validate white-text" required>
                            <div class="form-group mt-4">
                                <input class="form-check-input" type="checkbox" id="checkbox624">
                                <label for="checkbox624" class="white-text form-check-label">
                                    Accept the<a href="#" class="green-text font-weight-bold">Terms and Conditions</a>
                                </label>
                            </div>
                        </div>

                        <div class="row d-flex align-items-center mb-4">
                            <div class="text-center mb-3 col-md-12">
                                <button type="submit" class="btn btn-success btn-block btn-rounded z-depth-1">Sign up</button>
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
</html>