// js for interactions
console.log("main.js loaded");

// bunny pic in index
let bunnyPic = document.querySelector("#bunnyPic");
bunnyPic.addEventListener("click", function() {
    alert("ouch!");
});

// hint popup for the bars in visualizations
let Bars = document.querySelectorAll("rect");
Bars.forEach(rect => {
    rect.addEventListener("click", function() {
    alert("HINT: refresh this page and see how my music preferences change!");
    })
});

// change colour of chiikawa's mouth in visualizations
let colouring = document.querySelector("#chiikawaMouth");
colouring.addEventListener("click", () => {
    let randomColor = Math.floor(Math.random() * 777)
        colouring.setAttribute("fill", `#${randomColor}`);
});


