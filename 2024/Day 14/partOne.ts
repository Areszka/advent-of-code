import input from "../../read-input.ts";

const robots = input.split("\n");
const bathroomSize = [101, 103];
const second = 100;
const horizontalLine = Math.floor(bathroomSize[1] / 2);
const verticalLine = Math.floor(bathroomSize[0] / 2);
const quadrants = [0, 0, 0, 0];

robots.forEach((robot) => {
  const start = robot
    .split(/=| /g)[1]
    .split(",")
    .map((n) => Number(n));
  const velocity = robot
    .split(/=| /g)[3]
    .split(",")
    .map((n) => Number(n));

  const endLocation = [
    (start[0] + second * velocity[0]) % bathroomSize[0],
    (start[1] + second * velocity[1]) % bathroomSize[1],
  ];

  if (endLocation[0] < 0) {
    endLocation[0] = bathroomSize[0] + endLocation[0];
  }

  if (endLocation[1] < 0) {
    endLocation[1] = bathroomSize[1] + endLocation[1];
  }

  if (endLocation[0] < verticalLine && endLocation[1] < horizontalLine) {
    quadrants[0]++;
  }

  if (endLocation[0] > verticalLine && endLocation[1] < horizontalLine) {
    quadrants[1]++;
  }

  if (endLocation[0] < verticalLine && endLocation[1] > horizontalLine) {
    quadrants[2]++;
  }

  if (endLocation[0] > verticalLine && endLocation[1] > horizontalLine) {
    quadrants[3]++;
  }
});

const safetyFactor = quadrants.reduce((acc, cur) => acc * cur);

console.log(safetyFactor);
