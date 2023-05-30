/* Bulgarisk patiens written in javascript using functional style programming */


function reduce(cardStacks) {
    return cardStacks.map(val => val - 1);
}

function pushSize(cardStacks) {
    return cardStacks.concat([cardStacks.length]);
}

/* Invariant assumes cardStacks is already sorted */
function pushSizeSorted(cardStacks) {
    let index = cardStacks.findIndex(val => val > cardStacks.length);
    if (index == -1) return pushSize(cardStacks);
    return cardStacks.slice(0, index).concat(cardStacks.length).concat(cardStacks.slice(index));
}

function removeEmpty(cardStacks) {
    return cardStacks.filter(val => val != 0);
}

// A minor move is a single step of a major move (one major move is one move in bulgarisk patient).
// Minors moves are used in the animations to make it more flued and less confusing for the user.
function minorMove(cardStacks, major, minor) {
    switch (minor) {
    case 0: return [ reduce(cardStacks), major, 1 ];
    case 1: return [ pushSizeSorted(cardStacks), major, 2 ];
    case 2: return [ removeEmpty(cardStacks), major + 1, 0 ];
    }
}

function *minorMoveGenerator(cardStacks) {
    let result = [cardStacks, 0, 0];
    for (;;) {
        yield { cardStacks: result[0], major: result[1], minor: result[2] };
        result = minorMove(...result);
    }
}

function *majorMoveGenerator(initialCardStacks) {
    for (const result of minorMoveGenerator(initialCardStacks)){
        if (result.minor === 0) yield { cardStacks: result.cardStacks, major: result.major };
    }
}

// Generator which will return all the moves
// The last move returned is the result
function *gameMoveGenerator(cardStacks) {
    cardStacks = cardStacks.slice().sort((a,b) => a - b);
    const moveSeenLookup = {};
    for (let move of majorMoveGenerator(cardStacks)) {
        yield { move: move.cardStacks, done: false };
        const cardStacksStr = JSON.stringify(move.cardStacks);
        if (cardStacksStr in moveSeenLookup) {
            yield { iterations: move.major, cycle: move.major - moveSeenLookup[cardStacksStr], done: true };
            break;
        }
        moveSeenLookup[cardStacksStr] = move.major;
    }
}

// Runs the game and returns a object with a list of all the moves and the result */
export const runGame = (cardStacks) => {
    const moves = []
    let count = 1;
    for (const move of gameMoveGenerator(cardStacks)) {
        if (move.done) {
            return [ moves, { cycle: move.cycle, iterations: count } ];
        }
        moves.push(move.move);
        ++count;
    }
}