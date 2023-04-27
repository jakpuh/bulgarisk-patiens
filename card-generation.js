/*const stacks = [2,3,4,5,6];


function 
for (i of stacks){

}
document.getElementById
*/

var root = document.querySelector(":root");
let containerWidth = `${100/document.querySelectorAll(".flex-column-container").length}%`;
root.style.setProperty("--item-width", containerWidth);

let textOffset = `${document.getElementById("text").innerHTML.length * -12}px`
console.log(textOffset)
root.style.setProperty("--text-size", textOffset)

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