import input from "../../read-input.ts";

let result = 0;
let instructionsEnabled = true;

const regex = /(mul\([0-9]+,[0-9]+\))|(do\(\))|(don't\(\))/g;
const instructions = [...input.matchAll(regex)].map((match) => match[0]);

for (const instruction of instructions) {
  if (instruction.startsWith("m") && instructionsEnabled) {
    const numbers = getNumbers(instruction);
    result += numbers[0] * numbers[1];
    continue;
  }

  instructionsEnabled = !!instruction.includes("do()");
}

console.log("Result: " + result);

function getNumbers(text: string) {
  const regexN = /[0-9]+/g;
  const numbers = [...text.matchAll(regexN)].map((match) => Number(match[0]));

  return numbers;
}
