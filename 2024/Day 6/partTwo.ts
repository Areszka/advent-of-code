import input from "../../read-input.ts";

const DIRECTION = {
  up: [-1, 0],
  right: [0, 1],
  down: [1, 0],
  left: [0, -1],
};

type Direction = "up" | "right" | "down" | "left";
type Point = { X: number; Y: number };

const map = input.split("\n").map((row) => row.split(""));

const guard = { X: 0, Y: 0 };
guard.X = map.findIndex((row) => row.find((e) => e === "^"));
guard.Y = map[guard.X].findIndex((e) => e === "^");

const possibleObstacles = getPossibleObstacles();
let successObstacles = 0;

possibleObstacles.forEach((obstacle) => {
  const fakeMap = structuredClone(map);
  fakeMap[obstacle.X][obstacle.Y] = "#";

  const succesLoop = runSimulation(fakeMap);
  if (succesLoop) successObstacles++;
});

console.log("Number of positions where an obstacle would cause a loop " + successObstacles);

function getPossibleObstacles() {
  let currentDirection: Direction = "up";
  const possiblePoints: Point[] = [];
  const fakeGuard = { ...guard };

  while (true) {
    const nextGuard = getNextLocation(fakeGuard, currentDirection);

    let nextPositionValue = map[nextGuard.X]?.[nextGuard.Y];

    if (nextPositionValue === undefined) break;

    if (nextPositionValue === "#") {
      currentDirection = getNextDirection(currentDirection);
    }

    if (nextPositionValue === "." || nextPositionValue === "^") {
      fakeGuard.X = nextGuard.X;
      fakeGuard.Y = nextGuard.Y;
    }

    if (nextPositionValue === ".") {
      const pointAlreadyExists = possiblePoints.find(
        (p) => p.X === fakeGuard.X && p.Y === fakeGuard.Y
      );
      if (!pointAlreadyExists) {
        possiblePoints.push({ ...fakeGuard });
      }
    }
  }

  return possiblePoints;
}

function runSimulation(fakeMap: string[][]) {
  const turns: (Point & { direction: Direction })[] = [];
  const fakeGuard: Point = { ...guard };
  let startDirection: Direction = "up";

  while (true) {
    const loopExists = turns
      .slice(0, -1)
      .find((t) => JSON.stringify(t) === JSON.stringify(turns.at(-1)));

    if (loopExists) return true;

    const nextGuard = getNextLocation(fakeGuard, startDirection);

    let nextPositionValue = fakeMap[nextGuard.X]?.[nextGuard.Y];

    if (nextPositionValue === undefined) return false;

    if (nextPositionValue === "#") {
      startDirection = getNextDirection(startDirection);
      turns.push({ ...fakeGuard, direction: startDirection });
    }

    if (nextPositionValue === "." || nextPositionValue === "^") {
      fakeGuard.X = nextGuard.X;
      fakeGuard.Y = nextGuard.Y;
    }
  }
}

function getNextDirection(currentDirection: Direction): Direction {
  if (currentDirection === "up") return "right";
  if (currentDirection === "right") return "down";
  if (currentDirection === "down") return "left";
  if (currentDirection === "left") return "up";
}

function getNextLocation(point: Point, direction: Direction): Point {
  const nextCoordinates = {
    X: point.X + DIRECTION[direction][0],
    Y: point.Y + DIRECTION[direction][1],
  };

  return nextCoordinates;
}
