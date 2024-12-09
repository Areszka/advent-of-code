import input from "../../read-input.ts";

let blocksWithSpaces = [];
let k = 0;

for (let i = 0; i < input.length; i++) {
  const value = input[i];

  for (let j = 0; j < Number(value); j++) {
    if (i % 2 === 0) {
      blocksWithSpaces.push(k);
      k++;
    } else {
      blocksWithSpaces.push(".");
    }
  }
}

const blocks = [...blocksWithSpaces];

let lastNumberIndex: number = blocks.findLastIndex((b) => String(b).match(/[0-9]+/g));
let firtDotIndex: number = blocks.findIndex((b) => b === ".");

while (firtDotIndex < lastNumberIndex) {
  blocks[firtDotIndex] = blocks[lastNumberIndex];
  blocks[lastNumberIndex] = ".";

  lastNumberIndex = blocks.findLastIndex((b) => String(b).match(/[0-9]/g));
  firtDotIndex = blocks.findIndex((b) => b === ".");
}

const newBlocks = blocks.slice(0, firtDotIndex);
let checksum = 0;
newBlocks.forEach((b, i) => {
  checksum += Number(b) * i;
});

console.log(checksum);
