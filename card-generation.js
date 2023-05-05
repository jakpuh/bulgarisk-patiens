/*const stacks = [2,3,4,5,6];


function 
for (i of stacks){

}
document.getElementById
*/

var root = document.querySelector(":root");
let containerWidth = `${100/document.querySelectorAll(".flex-column-container").length}wv`;
root.style.setProperty("--item-width", containerWidth);

let stacks = [];
let count = 0

for (let columnContainer of document.querySelectorAll(".flex-column-container")){
    stacks.push(columnContainer.childElementCount-1)
    let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg")
    svg.style.aspectRatio = "1/1"
    svg.setAttributeNS(null, "id", "svg")
    svg.setAttributeNS(null, "viewBox", "0 0 100 100")
    svg.setAttributeNS(null, "class", "svg")
    columnContainer.appendChild(svg)
    
}

for (let svg of document.getElementsByClassName("svg")){
    var text = document.createElementNS("http://www.w3.org/2000/svg", "text");
    text.textContent = "tom";
    text.setAttributeNS(null, 'x', 40);
    text.setAttributeNS(null, 'y', 80);
    text.setAttributeNS(null, "class", "text")
    svg.appendChild(text)
}


for (let element of document.getElementsByClassName("text")){
    element.innerHTML = stacks[count] + 1
    count++

    element.style.transform = `translateX(${-15 * (element.innerHTML.length-1)}px)`
    
}
