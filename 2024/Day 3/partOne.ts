import input from "../../read-input.ts";

let result = 0;

const regex = /mul\([0-9]+,[0-9]+\)/g;
const instructions = [...input.matchAll(regex)].map((match) => match[0]);

for (const instruction of instructions) {
  const regexN = /[0-9]+/g;
  const numbers = [...instruction.matchAll(regexN)].map((match) => Number(match[0]));
  result += numbers[0] * numbers[1];
}

console.log("Result: " + result);
