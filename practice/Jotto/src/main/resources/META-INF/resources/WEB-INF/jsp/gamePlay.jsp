<!DOCTYPE html>
<html lang="en" dir="ltr">
<head>
    <meta charset="utf-8">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/css/bootstrap.min.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/js/bootstrap.min.js"></script>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="/css/gamePlay.css">
    <link rel="stylesheet" href="/css/sign_up.css">
    <script src="/javascript/gamePlay.js"></script>
    <title>Jotto</title>
</head>
<body class="bg">
<nav class="navbar navbar-inverse">
    <div class="container-fluid">
        <!-- <div class="navbar-header">
          <a class="navbar-brand" href="#">WebSiteName</a>
        </div> -->
        <ul class="nav navbar-nav" >
            <li class="active" ><a href="#">Home</a></li>
            <li><a href="#">Page 1</a></li>

        </ul>
    </div>
</nav>
<div id="mySidenav" class="sidenav">
    <a href="javascript:void(0)" class="closebtn" onclick="closeNav()">&times;</a>
    <button class="raise">A</button>
    <button class="raise">B</button>
    <button class="raise">C</button>
    <button class="raise">D</button>
    <button class="raise">E</button>
    <button class="raise">F</button>
    <button class="raise">G</button>
    <button class="raise">H</button>
    <button class="raise">I</button>
    <button class="raise">J</button>
    <button class="raise">K</button>
    <button class="raise">L</button>
    <button class="raise">M</button>
    <button class="raise">N</button>
    <button class="raise">O</button>
    <button class="raise">P</button>
    <button class="raise">Q</button>
    <button class="raise">R</button>
    <button class="raise">S</button>
    <button class="raise">T</button>
    <button class="raise">U</button>
    <button class="raise">V</button>
    <button class="raise">W</button>
    <button class="raise">X</button>
    <button class="raise">Y</button>
    <button class="raise">Z</button>
</div>

<span style="font-size:30px;cursor:pointer" onclick="openNav()">&#9776; open</span>

<script>
    function openNav() {
        document.getElementById("mySidenav").style.width = "200px";
    }

    function closeNav() {
        document.getElementById("mySidenav").style.width = "0";
    }
</script>
<!-- </form> -->
</body>
</html>
