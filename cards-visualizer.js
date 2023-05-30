import gameManager from "./game-manager.js";
/* Displays the cards on the screen depending on the state of the game */

const root = document.querySelector(":root");
const containerRow = document.querySelector(".flex-row-container")

function createRedCard(column) {
    const newCard = document.createElement('img');
    newCard.classList.add('img');
    column.appendChild(newCard);
    newCard.src = "baksida-kort.png";
    newCard.alt = "kort";
}

function displayCardStacks(cardStacks) {
    containerRow.replaceChildren();
    for (const stack of cardStacks) {
        const newColumn = document.createElement('div');
        newColumn.classList.add("flex-column-container");
        for (let i = 0; i < Math.min(stack, 52); ++i) {
            createRedCard(newColumn);
        }
        containerRow.appendChild(newColumn);
    }
    
    displayNumber(cardStacks);
}

// We use svg to display the number because normal numbers can't scale */
function displayNumber(cardStacks) {
    for (let columnContainer of document.querySelectorAll(".flex-column-container")){
        let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg")
        svg.style.aspectRatio = "1/1"
        svg.setAttributeNS(null, "id", "svg")
        svg.setAttributeNS(null, "viewBox", "0 0 100 100")
        svg.setAttributeNS(null, "class", "svg")
        columnContainer.appendChild(svg)
        
    }

    for (let svg of document.getElementsByClassName("svg")){
        var text = document.createElementNS("http://www.w3.org/2000/svg", "text");
        text.textContent = "";
        text.setAttributeNS(null, 'x', 40);
        text.setAttributeNS(null, 'y', 80);
        text.setAttributeNS(null, "class", "text");
        svg.appendChild(text);
    }

    let count = 0;
    for (let element of document.getElementsByClassName("text")){
        element.textContent = cardStacks[count++];

        element.style.transform = `translateX(${-15 * (element.innerHTML.length-1)}px)`;
    }
}

const displayCards = (evt) => {
    displayCardStacks(evt.detail.gameState[evt.detail.currentMajor]);
}

document.addEventListener("GameManager", displayCards);