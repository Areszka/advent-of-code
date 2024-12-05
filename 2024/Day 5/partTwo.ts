import input from "../../read-input.ts";

const lines = input.split("\n\n").map((s) => s.split("\n"));
const rules = lines[0];
const updates = lines[1].map((update) => update.split(","));

const correctedIncorrectUpdates: string[][] = [];

for (let i = 0; i < updates.length; i++) {
  let pagesAreInCorrectOrder = true;
  const pages = [...updates[i]];
  const regex = new RegExp(`(${pages.join("|")})` + "\\|" + `(${pages.join("|")})`);
  const currentPagesRules = rules.filter((rule) => rule.match(regex));

  for (let j = 0; j < currentPagesRules.length; j++) {
    const firstNumber = currentPagesRules[j].split("|")[0];
    const secondNumber = currentPagesRules[j].split("|")[1];

    const firstNumberIndex = pages.indexOf(firstNumber);
    const secondNumberIndex = pages.indexOf(secondNumber);

    if (firstNumberIndex > secondNumberIndex) {
      pages[firstNumberIndex] = secondNumber;
      pages[secondNumberIndex] = firstNumber;
      pagesAreInCorrectOrder = false;
      j = -1;
    }
  }

  if (pagesAreInCorrectOrder) continue;

  correctedIncorrectUpdates.push(pages);
}

let sumOfMiddleNumbers = 0;

correctedIncorrectUpdates.forEach((pages) => {
  const middleNumber = Number(pages[Math.floor(pages.length / 2)]);
  sumOfMiddleNumbers += middleNumber;
});

console.log("Sum of the middle page numbers: " + sumOfMiddleNumbers);
