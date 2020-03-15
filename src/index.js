const d3 = require("d3");
const electron = require("electron");
let i;
const items = document.getElementById("items");
let externalData;
const BrowserWindow = electron.remote.BrowserWindow;
let win = new BrowserWindow({ frame: false, alwaysontop: true, width: 100, height: 50 })

//Sort lines in items.csv and creates one element for each item
d3.csv("../assets/items.csv").then(function(data) {

    for (i = 0; i < 10; i++) {

        externalData = data
        let itemImage = document.createElement("IMG")
        itemImage.src = data[i].Image
        itemImage.classList.add("itemImage")
        itemImage.id = data[i].ID
        items.appendChild(itemImage);



        itemImage.addEventListener("mouseover", function(e) {
                var targ, targID;
                if (!e) var e = window.event;
                if (e.target) targ = e.target;
                else if (e.srcElement) targ = e.srcElement;
                targID = targ.id - 1;

                let x = e.clientX;
                let y = e.clientY;

                win.setPosition(x, y);
                win.show();
            }

        );

        items.addEventListener("mouseout", function() {

            win.hide();

        })
    };

});


//Create box when mouse hovers over the item

/*items.addEventListener("mouseover", function(e) {

    
    let e = window.event;
    let x = e.clientX;
    let y = e.clientY;

    item1.style.top = y + "px";
    item1.style.left = x + "px";
    item1.style.transition = "2s";
    
})*/

/*
items.addEventListener("mouseout", function() {

    item1.style.top = "15px";
    item1.style.left = "15px";

})
*/

//Filter function

function filter() {

    let input, items, itemImage, j, a, txtValue;
    input = document.getElementById("itemDescription");
    items = document.getElementById("items");
    itemImage = items.getElementsByClassName("itemsImage")

    //Loop through items and hide those who don't match
    for (j = 0; j < items.lenght; j++) {
        console.log(externalData[j].Name)
    }
}