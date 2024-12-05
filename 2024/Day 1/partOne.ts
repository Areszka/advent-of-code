import input from "../../read-input.ts";

const lines = input.split("\n");

const leftList: number[] = [];
const rightList: number[] = [];

for (const line of lines) {
  const elements = line.split("   ").map((e) => Number(e));
  leftList.push(elements[0]);
  rightList.push(elements[1]);
}

leftList.sort((a, b) => a - b);
rightList.sort((a, b) => a - b);

let totalDistance = 0;

leftList.forEach((element, index) => {
  totalDistance += Math.abs(rightList[index] - element);
});

console.log(totalDistance);
