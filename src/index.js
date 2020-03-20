const d3 = require("d3");
const shell = require("electron").shell;
const items = document.getElementById("items");
const trinkets = document.getElementById("trinkets")
const remote = require("electron").remote


//Sort lines in items.csv and creates one element for each item
d3.tsv("../assets/items.tsv").then(function(data) {


    for (let i = 0; i < data.length; i++) {

        const element = data[i]
        let category

        if (element.Category == "I") { category = items } else { category = trinkets }

        //Creates individual div for the item
        let Div = document.createElement("div");
        Div.classList.add("Div")
        Div.id = element.ID + "_" + element.Category + "_Div";
        category.appendChild(Div);

        //Creates image for the item, with id and click event to open link on browser
        let Image = document.createElement("img")
        Image.src = element.Image
        Image.classList.add("Image")
        Image.id = element.ID + element.Category;
        Image.addEventListener("click", function() {
            shell.openExternal(element.Link)
        })
        Image.onmouseover = showInfo;
        Image.onmouseout = hideInfo;
        Div.appendChild(Image);

        //Creates div with the information about the item
        let Info = document.createElement("div");
        Info.classList.add("Info");
        Info.id = element.ID + element.Category + "_Info"
        Info.style = "display: none"
        Div.appendChild(Info);
        let nameObj = { variable: "Name", ref: element.Name };
        let subnameObj = { variable: "Subname", ref: element.Subname };
        let descObj = { variable: "Description", ref: element.Description };
        let refArray = [nameObj, subnameObj, descObj];

        for (let object in refArray) {

            let variable = refArray[object].variable
            let reference = refArray[object].ref

            if (object == 2) {
                let hr = document.createElement("hr");
                Info.appendChild(hr)
            };

            variable = document.createElement("div");
            variable.classList.add("Data");
            variable.id = refArray[object].variable
            variable.innerText = reference;
            Info.appendChild(variable);

        };
    };
});

//Select input on app focus
const input = document.getElementById("searchBar");

function selectSearchBar() {
    input.select();
}


// //Show/Hide info
const descriptions = document.getElementById("descriptions")

function showInfo(event) {
    // debugger
    const Id = event.target.id
    const InfoId = `${Id}_Info`
    const Info = document.getElementById(InfoId)
    let clone = Info.cloneNode(true);

    clone.id = Id + "_clone";
    descriptions.style = "display: block"
    clone.style = "display: block"

    descriptions.appendChild(clone)

}

function hideInfo(event) {
    const Id = event.target.id
    const InfoId = `${Id}_Info`
    const Info = document.getElementById(InfoId)
    let clone = document.getElementById(Id + "_clone")

    descriptions.style = "display: none"
    clone.style = "display: none"

    clone.remove();

}


//Filter function
function filter() {

    //Scrolls to the start of the list
    element.scrollTo(0, 0);

    //Declare variables
    let input, filter, content, Info, Div, j, k, Class, txtValue;
    input = document.getElementById("searchBar");
    filter = input.value.toUpperCase();
    content = document.getElementById("content");
    Info = content.getElementsByClassName("Info")
    Div = document.getElementsByClassName("Div")

    //Loop through all items and hide those who don't match the search
    for (j = 0; j < Info.length; j++) {

        for (k = 0; k < 3; k++) {
            Class = Info[j].getElementsByClassName("Data")[k];
            txtValue = Class.textContent || Class.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                Div[j].style.display = "";
                break
            } else {
                Div[j].style.display = "none";
            };
        }
    };
};

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

//Show/hide items and trinkets
let itemActivated = true;
let trinketActivated = true;

function showItemsTrinkets(element) {
    const itemsButton = document.getElementById("itemsButton")
    const trinketsButton = document.getElementById("trinketsButton")
    const items = document.getElementById("items")
    const trinkets = document.getElementById("trinkets")

    if (element.id == "itemsButton") {
        if (itemActivated == true && trinketActivated == true) {
            itemsButton.style = "background-color: #929292"
            items.style = "display: none"
            itemActivated = false
        } else {
            itemsButton.style = "background-color: blue"
            items.style = "display: block"
            itemActivated = true
            content.scrollTo(0, 0);
        }
    } else {
        if (trinketActivated == true && itemActivated == true) {
            trinketsButton.style = "background-color: #929292"
            trinkets.style = "display: none"
            trinketActivated = false
        } else {
            trinketsButton.style = "background-color: green"
            trinkets.style = "display: block"
            trinketActivated = true
            content.scrollTo(0, 0);
        }
    }

}


//Roll window by clicking buttons
const element = document.getElementById("content")

function scrollToRight() {
    element.scrollBy({ left: (element.clientWidth * 0.75), behavior: "smooth" });
}

function scrollToLeft() {
    element.scrollBy({ left: -(element.clientWidth * 0.75), behavior: "smooth" });
}