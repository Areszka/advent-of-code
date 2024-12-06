import input from "../../read-input.ts";

type Direction = "up" | "right" | "down" | "left";

function* directionGenerator(): Generator<Direction, Direction, Direction> {
  while (true) {
    yield "up";
    yield "right";
    yield "down";
    yield "left";
  }
}

const direction = directionGenerator();
let currentDirection = direction.next().value;

const map = input.split("\n").map((row) => row.split(""));

const guard = { X: 0, Y: 0 };
guard.X = map.findIndex((row) => row.find((e) => e === "^"));
guard.Y = map[guard.X].findIndex((e) => e === "^");

map[guard.X][guard.Y] = "X";

while (true) {
  const nextGuard = { ...guard };
  if (currentDirection === "up") nextGuard.X -= 1;
  if (currentDirection === "right") nextGuard.Y += 1;
  if (currentDirection === "down") nextGuard.X += 1;
  if (currentDirection === "left") nextGuard.Y -= 1;

  let nextPositionValue = map[nextGuard.X]?.[nextGuard.Y];

  if (nextPositionValue === undefined) break;

  if (nextPositionValue === "#") {
    currentDirection = direction.next().value;
  }

  if (nextPositionValue === "." || nextPositionValue === "X") {
    guard.X = nextGuard.X;
    guard.Y = nextGuard.Y;
    map[guard.X][guard.Y] = "X";
  }
}

const visitedPositions = map.join().match(/X/g).length;

console.log("Visited positions: " + visitedPositions);
