const remote = require("electron").remote;
const shell = require("electron").shell;

const wiki = document.getElementById("wiki")
const github = document.getElementById("github")

wiki.addEventListener("click", function() {
    shell.openExternal("http://bindingofisaacrebirth.gamepedia.com/Binding_of_Isaac:_Rebirth_Wiki")
});

github.addEventListener("click", function() {
    shell.openExternal("http://github.com/gvtrindade/fakePlatinumGod")
});


//Close and minimize functions
let closebutton = document.getElementById("closeButton")

closebutton.addEventListener("click", function() {
    let window = remote.getCurrentWindow();
    window.close();
});

function minimize() {
    let window = remote.getCurrentWindow();
    window.minimize();
}