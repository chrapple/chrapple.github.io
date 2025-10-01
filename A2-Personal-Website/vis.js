// js for making visualizations and their interactions
console.log("vis.js loaded");

const svg = document.getElementById('chartArea'); 
const svg2 = document.getElementById('chiikawaDrawing'); 

// bar chart visualization
const musicGenres = ["K-Pop", "Video Game Music", "RNB", "Rock", "Visual Kei"];
// randomized width, for drawing the bars
for(let i=0; i<musicGenres.length; i++){

    const bar = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    const cw = i*Math.random()*90 + 150;
    const cy = i*65 + 50;
    bar.setAttribute("x", 0);
    bar.setAttribute("y", cy); 
    bar.setAttribute("width", cw);
    bar.setAttribute("height", 50);
    bar.setAttribute("fill", "steelblue");

    svg.appendChild(bar);

    const texts = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    const textContent = musicGenres[i]; 
    const textNode = document.createTextNode(textContent);
    texts.appendChild(textNode);

    texts.setAttribute("y", cy + 25); 
    texts.setAttribute("x", cw + 15); 
    texts.setAttribute("font-size", "16px");
    texts.setAttribute("fill", "black");

    svg.appendChild(texts);  
};

// hint popup for the bars in visualizations
let Bars = document.querySelectorAll("rect");
Bars.forEach(rect => {
    rect.addEventListener("click", function() {
    alert("HINT: refresh this page and see how my music preferences change!");
    })
});

// drawing chiikawa
// create the head
const head = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    head.setAttribute("cx", 200);
    head.setAttribute("cy", 150); 
    head.setAttribute("r", 100);
    head.setAttribute("fill", "white");
    head.setAttribute("stroke", "black");

// create ears
for(let i=0; i<2; i++) {
    const ear = document.createElementNS('http://www.w3.org/2000/svg', 'ellipse');
        const earX = 140+(i*120);
        ear.setAttribute("cx", earX);
        ear.setAttribute("cy", 60); 
        ear.setAttribute("rx", 15);
        ear.setAttribute("ry", 20);
        ear.setAttribute("fill", "white");
        ear.setAttribute("stroke", "black");
    svg2.appendChild(ear);
}

// appended here to make the head show in svg above the ears
svg2.appendChild(head);

// create facial features (the eyes, shine in eyes, eyebrows, blush)
// features that appear two or more times
for(let i=0; i<2; i++) {
    // eyes
    const eye = document.createElementNS('http://www.w3.org/2000/svg', 'ellipse');
        const eyeX = 160+(i*80);
        eye.setAttribute("cx", eyeX);
        eye.setAttribute("cy", 135); 
        eye.setAttribute("rx", 15);
        eye.setAttribute("ry", 18);
        eye.setAttribute("fill", "black");
    svg2.appendChild(eye);
    // eyebrows
    const brows = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        brows.setAttribute("x1", eyeX - 10);
        brows.setAttribute("y1", 110); 
        brows.setAttribute("x2", eyeX + 10);
        brows.setAttribute("y2", 110);
        brows.setAttribute("stroke", "black");
        brows.setAttribute('stroke-width', 3);
    svg2.appendChild(brows);
    // blush
    const blush = document.createElementNS('http://www.w3.org/2000/svg', 'ellipse');
        const blushX = 130+(i*140);
        blush.setAttribute("cx", blushX);
        blush.setAttribute("cy", 160); 
        blush.setAttribute("rx", 15);
        blush.setAttribute("ry", 10);
        blush.setAttribute("fill", "pink");
    svg2.appendChild(blush);
    // the shine in eyes
    for(let i=0; i<2; i++){
        const eyeShine = document.createElementNS('http://www.w3.org/2000/svg', 'ellipse');
            const shineY = 130+(i*15);
            const shineH = 5-(i*2);
            eyeShine.setAttribute("cx", eyeX);
            eyeShine.setAttribute("cy", shineY); 
            eyeShine.setAttribute("rx", 6);
            eyeShine.setAttribute("ry", shineH);
            eyeShine.setAttribute("fill", "white");
        svg2.appendChild(eyeShine);
    }  
}
// mouth
 const mouth = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        mouth.setAttribute("x", 180);
        mouth.setAttribute("y", 160); 
        mouth.setAttribute("width", 42);
        mouth.setAttribute("height", 43);
        mouth.setAttribute("fill", "white");
        mouth.setAttribute("stroke", "black");
        mouth.setAttribute("id", "chiikawaMouth")
    svg2.appendChild(mouth);

// chin
const chin = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        chin.setAttribute("x1", 195);
        chin.setAttribute("y1", 210); 
        chin.setAttribute("x2", 205);
        chin.setAttribute("y2", 210);
        chin.setAttribute("stroke", "black");
        chin.setAttribute('stroke-width', 2);
    svg2.appendChild(chin);

// change colour of chiikawa's mouth in visualizations
let colouring = document.querySelector("#chiikawaMouth");
colouring.addEventListener("click", () => {
    let randomColor = Math.floor(Math.random() * 777)
        colouring.setAttribute("fill", `#${randomColor}`);
});
