/*const stacks = [2,3,4,5,6];


function 
for (i of stacks){

}
document.getElementById
*/

// var root = document.querySelector(":root");
// let containerWidth = `${100/document.querySelectorAll(".flex-column-container").length}%`;
// root.style.setProperty("--item-width", containerWidth);

// let textOffset = `${document.getElementById("text").innerHTML.length * -12}px`
// console.log(textOffset)
// root.style.setProperty("--text-size", textOffset)

// let imgMargin = 0;

// for (let i of document.getElementsByClassName("flex-column-container")){
//     if (i.childElementCount > imgMargin){
//         imgMargin = i.childElementCount
//         console.log(imgMargin)
//     }
// }

// console.log(imgMargin)
// //imgMargin = `${-(550/imgMargin + 10)}%`
// imgMargin = `${imgMargin * (-119.226/imgMargin + 0.306372)}%`
// console.log(imgMargin)

// root.style.setProperty("--img-margin", imgMargin);




/*const stacks = [2,3,4,5,6];


function 
for (i of stacks){

}
document.getElementById
*/

const root = document.querySelector(":root");
const containerRow = document.querySelector(".flex-row-container")

function setWidth(cardStackCount) {
    const container = document.querySelector(".flex-column-container");
    let containerWidth = `${100/cardStackCount}%`;
    root.style.setProperty("--item-width", containerWidth);
}

function addCard(column) {
    newCard = document.createElement('img');
    newCard.classList.add('img');
    column.appendChild(newCard);
    newCard.src = "baksida-kort.png";
    newCard.alt = "kort";
}

function displayCardStacks(cardStacks) {
    for (stackHeight of cardStacks) {
        const newColumn = document.createElement('div');
        newColumn.classList.add("flex-column-container");
        for (let i = 0; i < stackHeight; ++i) {
            addCard(newColumn);
        }
        containerRow.appendChild(newColumn);
    }
    setWidth(cardStacks.length);
}

displayCardStacks([1,2,3,4]);


// for (let i of document.getElementsByClassName("flex-column-container")){
//     if (i.childElementCount > imgMargin){
//         imgMargin = i.childElementCount
//         console.log(imgMargin)
//     }
// }

// console.log(imgMargin)
// //imgMargin = `${-(550/imgMargin + 10)}%`
// imgMargin = `${imgMargin * (-119.226/imgMargin + 0.306372)}%`
// console.log(imgMargin)

// root.style.setProperty("--img-margin", imgMargin);