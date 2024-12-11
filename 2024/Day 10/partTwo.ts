import input from "../../read-input.ts";

const map = input.split("\n").map((e) => e.split("").map((el) => Number(el)));

const trailheads = [];

for (let i = 0; i < map.length; i++) {
  for (let j = 0; j < map[i].length; j++) {
    if (map[i][j] === 0) {
      trailheads.push([i, j]);
    }
  }
}

let sumOfScores = 0;

trailheads.forEach((trailhead) => {
  const score = checkTrails(trailhead, 0, []).length;
  sumOfScores += score;
});

console.log("Sum of scores: " + sumOfScores);

function checkTrails(
  currentLocation: [number, number],
  currentHeight: number,
  trails: string[]
): string[] {
  if (currentHeight === 9) {
    return [...trails, JSON.stringify(currentLocation)];
  }

  const nextHeight = currentHeight + 1;

  const locationDown: [number, number] = [currentLocation[0] + 1, currentLocation[1]];
  const locationUp: [number, number] = [currentLocation[0] - 1, currentLocation[1]];
  const locationRight: [number, number] = [currentLocation[0], currentLocation[1] + 1];
  const locationLeft: [number, number] = [currentLocation[0], currentLocation[1] - 1];

  const trailDown = checkNextLocation(locationDown, nextHeight, trails);
  const trailUp = checkNextLocation(locationUp, nextHeight, trails);
  const trailRight = checkNextLocation(locationRight, nextHeight, trails);
  const trailLeft = checkNextLocation(locationLeft, nextHeight, trails);

  return [...trails, ...trailDown, ...trailUp, ...trailLeft, ...trailRight];
}

function checkNextLocation(location: [number, number], desiredHeight: number, trails: string[]) {
  const height = map[location[0]]?.[location[1]];
  if (height === desiredHeight) {
    return checkTrails(location, height, trails);
  }

  return trails;
}
