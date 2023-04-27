function reduce(kort) {
    return kort.map(val => val - 1);
}

function pushSize(kort) {
    return kort.concat([kort.length]);
}

/* Invariant assumes kort is already sorted */
function pushSizeSorted(kort) {
    let index = kort.findIndex(val => val > kort.length);
    if (index == -1) return pushSize(kort);
    return kort.slice(0, index).concat(kort.length).concat(kort.slice(index));
}

function removeEmpty(kort) {
    return kort.filter(val => val != 0);
}

function drag(kort) {
    return removeEmpty(pushSizeSorted(reduce(kort)));
}

export const nextDrag = function *(korten) {
    const stacksSeen = {}
    for (let i = 0;; ++i) {
        korten = reduce(korten);
        yield korten;
        korten = pushSizeSorted(korten);
        yield korten;
        korten = removeEmpty(korten);
        yield korten;
        const kortenStr = JSON.stringify(korten);
        if (kortenStr in stacksSeen) {
            if (stacksSeen[kortenStr] === i - 1) {
                return { 
                    won: false, 
                    iterations: i, 
                    cykel: i - stacksSeen[kortenStr] 
                };
            } else {
                return { 
                    won: true, 
                    iterations: i, 
                    cykel: i - stacksSeen[kortenStr] 
                };
            }
        }
        stacksSeen[kortenStr] = i;
    }
}

function run(korten) {
    korten.sort((a,b) => a - b);
    const stacksSeen = {}
    for (let i = 1;; ++i) {
        korten = drag(korten);
        console.log(korten);
        const kortenStr = JSON.stringify(korten);
        if (kortenStr in stacksSeen) {
            if (stacksSeen[kortenStr] === i - 1) {
                return { 
                    won: false, 
                    iterations: i, 
                    cykel: i - stacksSeen[kortenStr] 
                };
            } else {
                return { 
                    won: true, 
                    iterations: i, 
                    cykel: i - stacksSeen[kortenStr] 
                };
            }
        }
        stacksSeen[kortenStr] = i;
    }
}

function takeTime(callback) {
    const start = Date.now();
    const ret = callback();
    const end = Date.now();
    return [ ret, end - start ];
}

// const korten = [3,2,2,54,5,43,42,5,2,6,6,2,8,4321,4,636,4839,2,32,43,424,3,231,372,5434,463,3232,56543]
const korten = [4,3];
const [res, time] = takeTime(() => { return run(korten) });

if (res.won)
    console.log(`Patiensen går inte ut :) med en cykel på ${res.cykel}`)
else
    console.log("Patiensen har gått ut :(");
console.log(`${res.iterations} iterations took ${time} ms`);
console.log(`Average time per iteration: ${time / res.iterations * 1000} ns`);

for (state of nextDrag(korten)) {
    console.log(state);
}