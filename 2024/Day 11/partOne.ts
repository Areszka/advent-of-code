import input from "../../read-input.ts";

const stones = input.split(" ").map((stone) => Number(stone));

let s = [];
const numOfBlinks = 25;

stones.forEach((stone) => {
  let tempStones: number[] = [stone];
  for (let i = 0; i < numOfBlinks; i++) {
    let temptempStones: number[] = [];
    tempStones.forEach((tempStone) => {
      const digits = tempStone.toString().length;
      if (tempStone === 0) {
        temptempStones.push(1);
      } else if (digits % 2 === 0) {
        const stoneOne = tempStone.toString().slice(0, digits / 2);
        const stoneTwo = tempStone.toString().slice(digits / 2);
        temptempStones.push(Number(stoneOne));
        temptempStones.push(Number(stoneTwo));
      } else {
        temptempStones.push(tempStone * 2024);
      }
    });

    tempStones = temptempStones;
  }
  s = [...s, ...tempStones];
});

console.log(s.length);
