const d3 = require("d3");
let i;
const items = document.getElementById("items")

d3.csv("../assets/items.csv").then(function(data) {

    for (i = 0; i < 10; i++) {
        let itemImage = document.createElement("IMG")
        itemImage.src = data[i].Image
        itemImage.classList.add("itemImage")
        items.appendChild(itemImage);
    }

})