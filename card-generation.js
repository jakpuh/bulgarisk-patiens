import { nextDrag } from "./script.js";

const root = document.querySelector(":root");
const containerRow = document.querySelector(".flex-row-container")

function setWidth(cardStackCount) {
    const container = document.querySelector(".flex-column-container");
    let containerWidth = `${100/cardStackCount}%`;
    root.style.setProperty("--item-width", containerWidth);
}

function addCard(column) {
    const newCard = document.createElement('img');
    newCard.classList.add('img');
    column.appendChild(newCard);
    newCard.src = "baksida-kort.png";
    newCard.alt = "kort";
}

function displayCardStacks(cardStacks) {
    containerRow.replaceChildren();
    for (const stackHeight of cardStacks) {
        const newColumn = document.createElement('div');
        newColumn.classList.add("flex-column-container");
        for (let i = 0; i < stackHeight; ++i) {
            addCard(newColumn);
        }
        containerRow.appendChild(newColumn);
    }
    setWidth(cardStacks.length);
}

(async() => {
    console.log("Running");
    // displayCardStacks([4,3]);
    for (const [kort, iteration, subiteration] of nextDrag([4,3])) {
        await new Promise(r => setTimeout(r, 1000));
        console.log(kort, iteration, subiteration);
    }
})();