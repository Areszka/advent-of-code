import input from "../../read-input.ts";

const stones = input.split(" ").map((stone) => Number(stone));
const numOfBlinks = 75;
let numOfStones = 0;
let stoneResults: Record<number, Record<number, number>> = {};

stones.forEach((stone) => {
  numOfStones += getNumber(stone, numOfBlinks);
});

console.log(numOfStones);

function getNumber(number: number, count: number, counter: number = 0): number {
  if (count === 0) return counter + 1;

  const previousResult = stoneResults[number]?.[count];
  if (previousResult !== undefined) {
    return counter + previousResult;
  }

  const digits = String(number).toString().length;

  let nextCounter: number;

  if (number === 0) {
    nextCounter = getNumber(1, count - 1, counter);
  } else if (digits % 2 === 0) {
    const stoneOne = number.toString().slice(0, digits / 2);
    const stoneTwo = number.toString().slice(digits / 2);

    const stoneOneResult = getNumber(Number(stoneOne), count - 1, counter);
    const stoneTwoResult = getNumber(Number(stoneTwo), count - 1, counter);
    nextCounter = stoneOneResult + stoneTwoResult;
  } else {
    nextCounter = getNumber(Number(number * 2024), count - 1, counter);
  }

  if (stoneResults[number]) {
    stoneResults[number][count] = nextCounter;
  } else {
    stoneResults[number] = { [count]: nextCounter };
  }

  return nextCounter;
}
