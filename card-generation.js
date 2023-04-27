/*const stacks = [2,3,4,5,6];


function 
for (i of stacks){

}
document.getElementById
*/

var root = document.querySelector(":root");
let containerWidth = `${100/document.querySelectorAll(".flex-column-container").length}%`;
root.style.setProperty("--item-width", containerWidth);

let stacks = [];
let count = 0

for (let svg of document.querySelectorAll("svg")){
    svg.innerHTML = '<text x="50" y="80" class="text"></text>'
}

for (let columnContainer of document.querySelectorAll(".flex-column-container")){
    stacks.push(columnContainer.childElementCount-1)
}


for (let element of document.getElementsByClassName("text")){

    element.innerHTML = stacks[count]

    switch (element.innerHTML.length) {
        case 0:
            break;
        case 1:
            element.style.transform = "translateX(-12px)"
            break;
        case 2:
            element.style.transform = "translateX(-24px)"
            break;
        case 3:
            element.style.transform = "translateX(-36px)"
            break;
        case 4:
            element.style.transform = "translateX(-48px)"
            break;
        default:
            break;
    }

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