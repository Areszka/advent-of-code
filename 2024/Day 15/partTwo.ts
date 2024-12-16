import input from "../../read-input.ts";

let map = input
  .split("\n\n")[0]
  .split("\n")
  .map((r) => r.split(""));
const instructions = input.split("\n\n")[1].split("\n").join("");

const nextMap: string[][] = Array(map.length).fill([]);

for (let i = 0; i < map.length; i++) {
  for (let j = 0; j < map[i].length; j++) {
    if (map[i][j] === "#") {
      nextMap[i] = [...nextMap[i], "#", "#"];
    } else if (map[i][j] === "O") {
      nextMap[i] = [...nextMap[i], "[", "]"];
    } else if (map[i][j] === ".") {
      nextMap[i] = [...nextMap[i], ".", "."];
    } else {
      nextMap[i] = [...nextMap[i], "@", "."];
    }
  }
}

map = nextMap;
console.log(map.map((r) => r.join("")).join("\n"));

const y = map.findIndex((row) => row.includes("@"));
const x = map[y].indexOf("@");
const robot: [number, number] = [y, x];

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

  if (nextLocationValue === "]" || nextLocationValue === "[") {
    if (direction === ">") {
      moveBoxesRight();
    }
    if (direction === "<") {
      moveBoxesLeft();
    }
    if (direction === "v") {
      const canGoDown = canBePushedDown(robot);
      if (canGoDown) {
        pushBoxDown(robot);
        robot[0] += 1;
      }
    }
    if (direction === "^") {
      const canGoUp = canBePushedUp(robot);
      if (canGoUp) {
        pushBoxUp(robot);
        robot[0] -= 1;
      }
    }
  }

  map[robot[0]][robot[1]] = "@";
}

function pushBoxDown(point: [number, number]) {
  let nextValue = map[point[0] + 1][point[1]];

  if (nextValue === "]") {
    pushBoxDown([point[0] + 1, point[1]]);
    pushBoxDown([point[0] + 1, point[1] - 1]);
  }

  if (nextValue === "[") {
    pushBoxDown([point[0] + 1, point[1]]);
    pushBoxDown([point[0] + 1, point[1] + 1]);
  }

  const pointValue = map[point[0]][point[1]];
  nextValue = map[point[0] + 1][point[1]];

  if (nextValue === ".") {
    map[point[0] + 1][point[1]] = pointValue;
    map[point[0]][point[1]] = nextValue;
  }
}

function pushBoxUp(point: [number, number]) {
  let nextValue = map[point[0] - 1][point[1]];

  if (nextValue === "]") {
    pushBoxUp([point[0] - 1, point[1]]);
    pushBoxUp([point[0] - 1, point[1] - 1]);
  }

  if (nextValue === "[") {
    pushBoxUp([point[0] - 1, point[1]]);
    pushBoxUp([point[0] - 1, point[1] + 1]);
  }

  const pointValue = map[point[0]][point[1]];
  nextValue = map[point[0] - 1][point[1]];

  if (nextValue === ".") {
    map[point[0] - 1][point[1]] = pointValue;
    map[point[0]][point[1]] = nextValue;
  }
}

function canBePushedDown(point: [number, number]): boolean {
  if (map[point[0] + 1][point[1]] === "#") {
    return false;
  }

  if (map[point[0] + 1][point[1]] === "[") {
    const one = canBePushedDown([point[0] + 1, point[1]]);
    const two = canBePushedDown([point[0] + 1, point[1] + 1]);

    return one && two;
  }

  if (map[point[0] + 1][point[1]] === "]") {
    const one = canBePushedDown([point[0] + 1, point[1]]);
    const two = canBePushedDown([point[0] + 1, point[1] - 1]);

    return one && two;
  }

  return true;
}

function canBePushedUp(point: [number, number]): boolean {
  if (map[point[0] - 1][point[1]] === "#") {
    return false;
  }

  if (map[point[0] - 1][point[1]] === "[") {
    const one = canBePushedUp([point[0] - 1, point[1]]);
    const two = canBePushedUp([point[0] - 1, point[1] + 1]);

    return one && two;
  }

  if (map[point[0] - 1][point[1]] === "]") {
    const one = canBePushedUp([point[0] - 1, point[1]]);
    const two = canBePushedUp([point[0] - 1, point[1] - 1]);

    return one && two;
  }

  return true;
}

function moveBoxesLeft() {
  let firstWallIndex = map[robot[0]].findLastIndex(
    (value, index) => value === "#" && index < robot[1]
  );
  let firstDotIndex = map[robot[0]].findLastIndex(
    (value, index) => value === "." && index > firstWallIndex && index < robot[1]
  );
  if (firstDotIndex !== -1) {
    for (let i = firstDotIndex; i < robot[1]; i++) {
      map[robot[0]][i] = map[robot[0]][i] === "." ? "[" : map[robot[0]][i] === "[" ? "]" : "[";
    }
    robot[1] -= 1;
  }
}

function moveBoxesRight() {
  let firstWallIndex = map[robot[0]].findIndex((value, index) => value === "#" && index > robot[1]);
  let firstDotIndex = map[robot[0]].findIndex(
    (value, index) => value === "." && index < firstWallIndex && index > robot[1]
  );

  if (firstDotIndex !== -1) {
    for (let i = firstDotIndex; i > robot[1]; i--) {
      map[robot[0]][i] = map[robot[0]][i] === "." ? "]" : map[robot[0]][i] === "[" ? "]" : "[";
    }
    robot[1] += 1;
  }
}

let sum = 0;

for (let i = 1; i < map.length - 1; i++) {
  for (let j = 1; j < map[i].length - 1; j++) {
    if (map[i][j] !== "[") continue;

    sum += 100 * i + j;
  }
}

console.log(map.map((r) => r.join("")).join("\n"));
console.log(sum);
