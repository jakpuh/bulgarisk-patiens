// const stacks = [3, 5, 2];
// const container = document.querySelector(".container");

// for (let i = 0; i < stacks.length; i++) {
//   const stack = document.createElement("div");
//   stack.classList.add("stack");
//   for (let j = 0; j < stacks[i]; j++) {
//     const card = document.createElement("div");
//     card.classList.add("card");
//     stack.appendChild(card);
//   }
//   container.appendChild(stack);
// }
const container = document.querySelector(".container");
const stack = document.createElement("div");
stack.classList.add("stack");
const maxHeight = container.clientHeight - stack.offsetTop - 20; // subtract margin/padding
console.log(maxHeight);
console.log(container.clientHeight);

const stacks = [3, 5, 2];

for (let i = 0; i < stacks.length; i++) {
  const stack = document.createElement("div");
  stack.classList.add("stack");
  let height = 0;
  for (let j = 0; j < stacks[i]; j++) {
    const card = document.createElement("div");
    card.classList.add("card");
    stack.appendChild(card);
    height += card.clientHeight;
    if (height >= maxHeight) {
      const remaining = stacks[i] - j - 1;
      const label = document.createElement("div");
      label.classList.add("label");
      label.innerText = `+${remaining} more`;
      stack.appendChild(label);
      break;
    }
  }
  container.appendChild(stack);
}
