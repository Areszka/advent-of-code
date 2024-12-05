import input from "../../read-input.ts";

const lines = input.split("\n");

const leftList: number[] = [];
const rightList: number[] = [];

for (const line of lines) {
  const elements = line.split("   ").map((e) => Number(e));
  leftList.push(elements[0]);
  rightList.push(elements[1]);
}

const rightListSorted = {};

rightList.forEach((element) => {
  if (rightListSorted[element]) {
    rightListSorted[element] += 1;
  } else {
    rightListSorted[element] = 1;
  }
});

let similarityScore = 0;

leftList.forEach((element) => {
  if (rightListSorted[element]) {
    similarityScore += element * rightListSorted[element];
  }
});

console.log(similarityScore);
