import { nextDrag } from "./script.js";

const root = document.querySelector(":root");
const containerRow = document.querySelector(".flex-row-container")

class StackRed {
    constructor(count) {
        this.count = count;
    }
};

class StackBlue {
    constructor(interval) {
        this.interval = interval;
    }
};

function setWidth(cardStackCount) {
    const container = document.querySelector(".flex-column-container");
    let containerWidth = `${100/cardStackCount}%`;
    root.style.setProperty("--item-width", containerWidth);
}

function createRedCard(column) {
    const newCard = document.createElement('img');
    newCard.classList.add('img');
    column.appendChild(newCard);
    newCard.src = "baksida-kort.png";
    newCard.alt = "kort";
}

function createBlueCard(column, interval) {
    const newCard = document.createElement('input');
    newCard.type = "image";
    newCard.src = "baksida-kort-blue.png";
    newCard.alt = "kort";
    newCard.setAttribute("interval_start", interval[0]);
    newCard.setAttribute("interval_end", interval[1]);
    newCard.classList.add("img");
    newCard.addEventListener('click', (event) => {
        console.log("tag clicked with interval: ", event.target.getAttribute("interval_start"), "-", event.target.getAttribute("interval_end"));
    });
    column.appendChild(newCard);
}

function displayCardStacks(cardStacks) {
    containerRow.replaceChildren();
    for (const stack of cardStacks) {
        const newColumn = document.createElement('div');
        newColumn.classList.add("flex-column-container");
        if (stack instanceof StackRed) {
            for (let i = 0; i < stack.count; ++i) {
                createRedCard(newColumn);
            }
        } else {
            createBlueCard(newColumn, stack.interval);
        }
        containerRow.appendChild(newColumn);
    }
    // TODO: check this out
    // Doesn't work for some reason 
    // setWidth(cardStacks.length);
}


// interval should be an array of 2 indices, the start index and the end index [start, end); both indices should be 0 based
function getStacksToDisplay(cardStacks, interval) {
    if (interval[0] >= cardStacks.length || interval[0] > interval[1]) return [];

    const len = Math.min(cardStacks.length, interval[1]) - interval[0];
    const restrictedLen = Math.min(len, 20);

    const avg = Math.floor(len / restrictedLen);
    const rest = len % restrictedLen;

    const avgArray = Array(restrictedLen).fill(avg);
    const tmpResult = avgArray.slice(0, rest)
                           .map(val => val + 1)
                           .concat(avgArray.slice(rest));

    let result = [];
    let currentStack = interval[0];
    for (let i = 0; i < restrictedLen; ++i) {
        if (tmpResult[i] > 1) {
            result.push(new StackBlue([currentStack, currentStack + tmpResult[i]]));
        } else {
            result.push(new StackRed(cardStacks[i]));
        }
        currentStack += tmpResult[i];
    }

    return result;
}

let arr = [];
for (let i = 0; i < 121; ++i) {
    arr.push(i);
}
const res = (getStacksToDisplay(arr, [1, 25]));
res.forEach((elem) => {
    console.log(elem.interval);
})
console.log(res);
displayCardStacks(res);

// (async() => {
//     console.log("Running");
//     let start = [];
//     for (let i = 1; i < 123; ++i) {
//         start.push(4);
//     }
//     // Make nextDrag return a object of a class instead
//     for (const [kort, iteration, subiteration] of nextDrag(start)) {
//         displayCardStacks(getStacksToDisplay(kort, [0, kort.length]));
//         console.log(kort, iteration, subiteration);
//         if(subiteration == 0) {
//             await new Promise(r => setTimeout(r, 100));
//         } else {
//             await new Promise(r => setTimeout(r, 100));
//         }
//     }
// })();