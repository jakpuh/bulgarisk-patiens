const stacks = [
    10,23,3,1
];

const container = document.getElementById("card-container");

for (let i = 0; i < stacks.length; i++) {
	const stack = stacks[i];
	const stackDiv = document.createElement("div");
	stackDiv.className = "card-stack";
	for (let j = 0; j < stacks[i]; j++) {
		const card = document.createElement("div");
		card.className = "card";
		card.style.marginBottom = (-20 * j) + "px";
		stackDiv.appendChild(card);
	}
	container.appendChild(stackDiv);
}
