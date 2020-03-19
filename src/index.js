const d3 = require("d3");
const shell = require("electron").shell;
const items = document.getElementById("items");
const trinkets = document.getElementById("trinkets")
const remote = require("electron").remote


//Sort lines in items.csv and creates one element for each item
d3.csv("../assets/items.tsv").then(function(data) {

    console.log(data[3].Link)

    //     for (let i = 0; i < data.length; i++) {

    //         let category

    //         if (data[i].Category == "I") { category = items } else { category = trinkets }

    //         //Creates individual div for the item
    //         let Div = document.createElement("div");
    //         Div.id = data[i].ID;
    //         Div.classList.add("Div")
    //         category.appendChild(Div);

    //         //Creates image for the item, with id and click event to open link on browser
    //         let Image = document.createElement("img")
    //         Image.src = data[i].Image
    //         Image.classList.add("Image")
    //         Image.id = data[i].ID
    //         Image.addEventListener("click", function() {
    //             shell.openExternal(data[i].Link)
    //         })
    //         Image.onmouseover = showInfo;
    //         Image.onmouseout = hideInfo;
    //         Div.appendChild(Image);

    //         //Creates div with the information about the item
    //         let Info = document.createElement("div");
    //         Info.classList.add("Info");
    //         Info.id = data[i].ID + "_Info"
    //         Info.style = "display: none"
    //         Div.appendChild(Info);
    //         let nameObj = { variable: "Name", ref: data[i].Name };
    //         let subnameObj = { variable: "Subname", ref: data[i].Subname };
    //         let descObj = { variable: "Description", ref: data[i].Description };
    //         let refArray = [nameObj, subnameObj, descObj];

    //         for (let object in refArray) {

    //             let variable = refArray[object].variable
    //             let reference = refArray[object].ref

    //             if (object == 2) {
    //                 let hr = document.createElement("hr");
    //                 Info.appendChild(hr)
    //             };

    //             variable = document.createElement("div");
    //             variable.classList.add("Data");
    //             variable.id = refArray[object].variable
    //             variable.innerText = reference;
    //             Info.appendChild(variable);

    //         };
    //     };
});

//Select input on app focus
const input = document.getElementById("searchBar");

function selectSearchBar() {
    input.select();
}


//Show/Hide info
const descriptions = document.getElementById("descriptions")

function showInfo(event) {
    const itemId = event.target.id
    const itemInfoId = `${itemId}_Info`
    const itemInfo = document.getElementById(itemInfoId)
    let clone = itemInfo.cloneNode(true);

    clone.id = itemId + "_clone";
    descriptions.style = "display: block"
    clone.style = "display: block"

    descriptions.appendChild(clone)

}

function hideInfo(event) {
    const itemId = event.target.id
    const itemInfoId = `${itemId}_Info`
    const itemInfo = document.getElementById(itemInfoId)
    let clone = document.getElementById(itemId + "_clone")

    descriptions.style = "display: none"
    clone.style = "display: none"

    clone.remove();

}


//Filter function
function filter() {

    //Scrolls to the start of the list
    element.scrollTo(0, 0);

    //Declare variables
    let input, filter, items, itemInfo, itemDiv, j, k, itemClass, txtValue;
    input = document.getElementById("searchBar");
    filter = input.value.toUpperCase();
    items = document.getElementById("items");
    itemInfo = items.getElementsByClassName("Info")
    itemDiv = document.getElementsByClassName("Div")

    //Loop through all items and hide those who don't match the search
    for (j = 0; j < itemInfo.length; j++) {

        for (k = 0; k < 3; k++) {
            itemClass = itemInfo[j].getElementsByClassName("Data")[k];
            txtValue = itemClass.textContent || itemClass.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                itemDiv[j].style.display = "";
                break
            } else {
                itemDiv[j].style.display = "none";
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

//Roll window by clicking buttons
const element = document.getElementById("content")

function scrollToRight() {
    element.scrollBy({ left: 288, behavior: "smooth" });
}

function scrollToLeft() {
    element.scrollBy({ left: -288, behavior: "smooth" });
}