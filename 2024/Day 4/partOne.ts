import input from "../../read-input.ts";

const lines = input.split("\n");
const verticalLines = getVerticalLines(lines);
const diagonalLines = getDiagonalLines(lines);

const horizontalXMAS = countXMAS(lines);
const verticalXMAS = countXMAS(verticalLines);
const diagonalXMAS = countXMAS(diagonalLines);

const allXMAS = horizontalXMAS + verticalXMAS + diagonalXMAS;

console.log("All XMAS: " + allXMAS);

function countXMAS(lines: string[]) {
  const xmasReg = /XMAS/g;
  const samxReg = /SAMX/g;
  let matches = 0;

  for (const line of lines) {
    const xmas = line.match(xmasReg)?.length ?? 0;
    const samx = line.match(samxReg)?.length ?? 0;
    matches += xmas + samx;
  }

  return matches;
}

function getVerticalLines(lines: string[]) {
  const verticalLines = [];

  for (let i = 0; i < lines[0].length; i++) {
    let word = "";
    for (let j = 0; j < lines.length; j++) {
      word += lines[j][i];
    }
    verticalLines.push(word);
  }

  return verticalLines;
}

function getDiagonalLines(lines: string[]) {
  const diagonalLines = [];

  for (let i = 0; i < lines[0].length - 3; i++) {
    let word = "";
    let temI = i;
    for (let j = 0; j < lines.length; j++) {
      if (lines[j][temI] === undefined) break;
      word += lines[j][temI];
      temI++;
    }

    diagonalLines.push(word);
  }

  for (let i = lines[0].length - 1; i > 2; i--) {
    let word = "";
    let temI = i;
    for (let j = 0; j < lines.length; j++) {
      if (lines[j][temI] === undefined) break;
      word += lines[j][temI];
      temI--;
    }

    diagonalLines.push(word);
  }

  for (let i = 1; i < lines.length - 3; i++) {
    let word = "";
    let temI = i;
    for (let j = 0; j < lines[0].length; j++) {
      if (temI > lines.length - 1) break;
      word += lines[temI][j];
      temI++;
    }

    diagonalLines.push(word);

    word = "";
    temI = i;
    for (let j = lines[0].length - 1; j < lines[0].length; j--) {
      if (temI > lines.length - 1) break;
      word += lines[temI][j];
      temI++;
    }

    diagonalLines.push(word);
  }

  return diagonalLines;
}
