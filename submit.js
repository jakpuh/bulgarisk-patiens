import gameManager from "./game-manager.js";
/* Takes the values from the input and starts the gameManager */

function submit(){
    let input = document.getElementById("submit").value
    const re = /\d+/g;

    /* Uses a simple regex to extract the numbers
       We do this because it leaves a larger margin of error for the user */
    const inputArr = input.match(re);
    if (inputArr === null) return;

    const filterdInputArr = inputArr.filter((num) => {
        return num.match(/^0+$/) === null;
    }).map((num) => {
        return parseInt(num);
    });

    if (filterdInputArr.length === 0) return;
    gameManager.init(filterdInputArr);
    gameManager.run();
    
}

document.getElementById("button").addEventListener("click", submit);
document.addEventListener("keydown", (evt) => {
    if (evt.key === 'Enter') {
        submit();
    }
});