
import * as cardGen from "./card-generation.js";

function submit(){
    let input = document.getElementById("submit").value
    const re = /\d+/g;

    const inputArr = input.match(re);
    if (inputArr === null) return;

    const filterdInputArr = inputArr.filter((num) => {
        return num.match(/^0+$/) === null;
    }).map((num) => {
        return parseInt(num);
    });

    if (filterdInputArr.length === 0) return;
    cardGen.start(filterdInputArr);
}

document.getElementById("button").addEventListener("click", submit)
document.addEventListener("keydown", (evt) => {
    if (evt.key === 'Enter') {
        submit();
    }
})