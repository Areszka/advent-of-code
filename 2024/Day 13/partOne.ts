import input from "../../read-input.ts";

const machines = input.split("\n\n");

const num = /[0-9]+/g;
let totalTokens = 0;

machines.forEach((machine) => {
  const arr = machine.match(num).map((n) => Number(n));
  const buttonA = { x: arr[0], y: arr[1] };
  const buttonB = { x: arr[2], y: arr[3] };
  const prize = { x: arr[4], y: arr[5] };

  let tokens = 0;
  let countA = prize.x / buttonA.x;
  let countB = 0;

  while (buttonB.x * countB <= prize.x && countA > 0) {
    if (Number.isInteger(countA)) {
      const prizeYWorks = countA * buttonA.y + countB * buttonB.y === prize.y;
      if (prizeYWorks) {
        let nextTokens = countA * 3 + countB;
        if (nextTokens < tokens || tokens === 0) {
          tokens = nextTokens;
        }
      }
    }

    countB++;
    countA = (prize.x - countB * buttonB.x) / buttonA.x;
  }

  totalTokens += tokens;
});

console.log(totalTokens);
