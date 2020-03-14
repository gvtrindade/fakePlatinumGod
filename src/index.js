let item01 = document.getElementById("item01")

item01.onmouseover = function() {
    document.getElementById("item01Desc").style.display = "block";
}

item01.onmouseout = function() {
    document.getElementById("item01Desc").style.display = "none";
}