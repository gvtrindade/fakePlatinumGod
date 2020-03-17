const remote = require("electron").remote;

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