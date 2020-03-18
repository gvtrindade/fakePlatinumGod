const d3 = require("d3");
const shell = require("electron").shell;
const items = document.getElementById("items");
const remote = require("electron").remote


//Sort lines in items.csv and creates one element for each item
d3.csv("../assets/items.csv").then(function(data) {

    for (let i = 0; i < data.length; i++) {

        //Creates individual div for the item
        let itemDiv = document.createElement("div");
        itemDiv.id = data[i].ID;
        itemDiv.classList.add("itemDiv")
        items.appendChild(itemDiv);

        //Creates image for the item, with id and click event to open link on browser
        let itemImage = document.createElement("img")
        itemImage.src = data[i].Image
        itemImage.classList.add("itemImage")
        itemImage.id = data[i].ID
        itemImage.addEventListener("click", function() {
            shell.openExternal(data[i].Link)
        })
        itemImage.addEventListener("mouseover", function(this) {
            console.log(document.getElementById(`${id}_Info`))

        })
        itemDiv.appendChild(itemImage);

        //Creates div with the information about the item
        let itemInfo = document.createElement("div");
        itemInfo.classList.add("itemInfo");
        itemInfo.id = data[i].ID + "_Info"
        itemDiv.appendChild(itemInfo);
        let nameObj = { variable: "itemName", ref: data[i].Name };
        let subnameObj = { variable: "itemSubname", ref: data[i].Subname };
        let descObj = { variable: "itemDescription", ref: data[i].Description };
        let refArray = [nameObj, subnameObj, descObj];

        for (let obj in refArray) {

            let variable = refArray[obj].variable
            let reference = refArray[obj].ref

            if (obj == 2) {
                let hr = document.createElement("hr");
                itemInfo.appendChild(hr)
            };

            variable = document.createElement("div");
            variable.classList.add(refArray[obj].variable);
            variable.id = reference;
            itemInfo.appendChild(variable);

        };
    };
});


//Filter function
function filter() {

    //Scrolls to the start of the list
    element.scrollTo(0, 0);

    //Declare variables
    let input, filter, items, itemInfo, itemDiv, j, k, span, txtValue;
    input = document.getElementById("searchBar");
    filter = input.value.toUpperCase();
    items = document.getElementById("items");
    itemInfo = items.getElementsByClassName("itemInfo")
    itemDiv = document.getElementsByClassName("itemDiv")

    //Loop through all items and hide those who don't match the search
    for (j = 0; j < itemInfo.length; j++) {

        for (k = 0; k < 3; k++) {
            span = itemInfo[j].getElementsByTagName("span")[k];
            txtValue = span.textContent || span.innerText;
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