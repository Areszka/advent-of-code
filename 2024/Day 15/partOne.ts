import input from "../../read-input.ts";

const map = input
  .split("\n\n")[0]
  .split("\n")
  .map((r) => r.split(""));
const instructions = input.split("\n\n")[1].split("\n").join("");

const y = map.findIndex((row) => row.includes("@"));
const x = map[y].indexOf("@");
const robot = [y, x];

for (let i = 0; i < instructions.length; i++) {
  map[robot[0]][robot[1]] = ".";
  const direction = instructions[i];
  const nextX = direction === "<" ? robot[1] - 1 : direction === ">" ? robot[1] + 1 : robot[1];
  const nextY = direction === "^" ? robot[0] - 1 : direction === "v" ? robot[0] + 1 : robot[0];

  const nextLocationValue = map[nextY][nextX];

  if (nextLocationValue === ".") {
    robot[0] = nextY;
    robot[1] = nextX;
  }

  if (nextLocationValue === "O") {
    if (direction === ">") {
      moveBoxesRight();
    }
    if (direction === "<") {
      moveBoxesLeft();
    }
    if (direction === "v") {
      const verticalLine = getVerticalLine();
      moveBoxesDown(verticalLine);
    }

    if (direction === "^") {
      const verticalLine = getVerticalLine();
      moveBoxesUp(verticalLine);
    }
  }

  map[robot[0]][robot[1]] = "@";
}

let sum = 0;

for (let i = 1; i < map.length - 1; i++) {
  for (let j = 1; j < map[i].length - 1; j++) {
    if (map[i][j] !== "O") continue;

    sum += 100 * i + j;
  }
}

console.log(sum);

function moveBoxesLeft() {
  let firstWallIndex = map[robot[0]].findLastIndex(
    (value, index) => value === "#" && index < robot[1]
  );
  let firstDotIndex = map[robot[0]].findLastIndex(
    (value, index) => value === "." && index > firstWallIndex && index < robot[1]
  );

  if (firstDotIndex !== -1) {
    map[robot[0]][firstDotIndex] = "O";
    robot[1] -= 1;
  }
}

function moveBoxesRight() {
  let firstWallIndex = map[robot[0]].findIndex((value, index) => value === "#" && index > robot[1]);
  let firstDotIndex = map[robot[0]].findIndex(
    (value, index) => value === "." && index < firstWallIndex && index > robot[1]
  );

  if (firstDotIndex !== -1) {
    map[robot[0]][firstDotIndex] = "O";
    robot[1] += 1;
  }
}

function getVerticalLine() {
  let lineToCheck: string[] = [];
  map.forEach((row) => lineToCheck.push(row[robot[1]]));
  return lineToCheck;
}

function moveBoxesDown(verticalLine: string[]) {
  let firstWallIndex = verticalLine.findIndex((value, index) => value === "#" && index > robot[0]);
  let firstDotIndex = verticalLine.findIndex(
    (value, index) => value === "." && index < firstWallIndex && index > robot[0]
  );

  if (firstDotIndex !== -1) {
    map[firstDotIndex][robot[1]] = "O";
    robot[0] += 1;
  }
}

function moveBoxesUp(verticalLine: string[]) {
  let firstWallIndex = verticalLine.findLastIndex(
    (value, index) => value === "#" && index < robot[0]
  );
  let firstDotIndex = verticalLine.findLastIndex(
    (value, index) => value === "." && index > firstWallIndex && index < robot[0]
  );

  if (firstDotIndex !== -1) {
    map[firstDotIndex][robot[1]] = "O";
    robot[0] -= 1;
  }
}
