import input from "../../read-input.ts";

const lines = input.split("\n");
const masRegex = /MAS|SAM/g;

let allXMAS = 0;

for (let i = 1; i < lines.length - 1; i++) {
  for (let j = 1; j < lines[0].length - 1; j++) {
    const letter = lines[i][j];
    if (letter === "A") {
      const wordOne = lines[i - 1][j - 1] + letter + lines[i + 1][j + 1];
      const wordTwo = lines[i - 1][j + 1] + letter + lines[i + 1][j - 1];

      if (wordOne.match(masRegex) && wordTwo.match(masRegex)) {
        allXMAS++;
      }
    }
  }
}

console.log("All X-MAS: " + allXMAS);
