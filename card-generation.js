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
    let svgText = document.createElement("svg")
    svgText.style.aspectRatio = "1/1"
    columnContainer.appendChild(svgText)
    
}

for (let svg of document.querySelectorAll("svg")){
    svg.setAttribute("viewBox", "0 0 100 100")
    svg.innerHTML = '<text x="50" y="80" class="text"></text>'
}



for (let element of document.getElementsByClassName("text")){
    element.innerHTML = stacks[count] + 1
    count++
}

let imgMargin = 0;

for (let i of document.getElementsByClassName("flex-column-container")){
    if (i.childElementCount > imgMargin){
        imgMargin = i.childElementCount
        console.log(imgMargin)
    }
}

console.log(imgMargin)
//imgMargin = `${-(550/imgMargin + 10)}%`
imgMargin = `${imgMargin * (-119.226/imgMargin + 0.306372)}%`
console.log(imgMargin)

root.style.setProperty("--img-margin", imgMargin);