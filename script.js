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

function drag(kort) {
    return removeEmpty(pushSizeSorted(reduce(kort)));
}

function removeEmpty(kort) {
    return kort.filter(val => val != 0);
}

korten = [3,2,2,54,5,43,42,5,2,6,6,2,8,4321,4,636,4839,2,32,43,424,3,231,372,5434,463,3232,56543]
// korten = [4, 3];
dp = {}

let start = Date.now();
for (var i = 0;; ++i) {
    // console.log(korten)
    korten = drag(korten);
    const kortenStr = JSON.stringify(korten);
    if (kortenStr in dp) {
        if (dp[kortenStr] === i - 1) {
            console.log("patiensen har gått ut :(");
        } else {
            console.log(`patiensen går inte ut :) med än cykel på ${i - dp[kortenStr]} drag`);
        }
        break;
    }
    dp[kortenStr] = i;
}
let end = Date.now();
let time = end - start;

console.log(`${i} iterations took ${time} ms`);
console.log(`Average time per iteration: ${time / i * 1000} ns`);