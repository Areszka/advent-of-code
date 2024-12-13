import input from "../../read-input.ts";

const machines = input.split("\n\n");

const num = /[0-9]+/g;
let totalTokens = 0;

machines.forEach((machine) => {
  const arr = machine.match(num).map((n) => Number(n));
  const buttonA = { x: arr[0], y: arr[1] };
  const buttonB = { x: arr[2], y: arr[3] };
  const prize = { x: arr[4] + 10000000000000, y: arr[5] + 10000000000000 };

  let countB =
    (prize.y * buttonA.x - prize.x * buttonA.y) / (buttonB.y * buttonA.x - buttonB.x * buttonA.y);
  let countA = (prize.x - countB * buttonB.x) / buttonA.x;

  if (Number.isInteger(countA) && Number.isInteger(countB)) {
    let tokens = countA * 3 + countB;
    totalTokens += tokens;
  }
});

console.log(totalTokens);
