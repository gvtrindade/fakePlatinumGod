const d3 = require("d3");
const shell = require("electron").shell;
const items = document.getElementById("items");

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
        itemDiv.appendChild(itemImage);

        //Creates li with the information about the item
        let itemInfo = document.createElement("li");
        itemInfo.classList.add("itemInfo");
        itemDiv.appendChild(itemInfo);
        let nameObj = { variable: "itemName", ref: data[i].Name };
        let subnameObj = { variable: "itemSubname", ref: data[i].Subname };
        let descObj = { variable: "itemDescription", ref: data[i].Description };
        let refArray = [nameObj, subnameObj, descObj];

        for (let obj in refArray) {

            let variable = refArray[obj].variable
            let reference = refArray[obj].ref

            variable = document.createElement("span");
            variable.classList.add(refArray[obj].variable);
            variable.innerText = reference;
            itemInfo.appendChild(variable);

        };
    };
});


//Filter function
function filter() {

    //Declare variables
    let input, filter, items, itemInfo, itemDiv, j, k, span, txtValue;
    input = document.getElementById("itemDescription");
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