import { appendFileSync } from "fs";
import input from "../../read-input.ts";

const robots = input.split("\n");
const bathroomSize = [101, 103];
const start = 7687;
const second = 0;

let row = Array(bathroomSize[0]).fill(".");
let paper = Array(bathroomSize[1]).fill("");
paper = paper.map(() => [...row]);

for (let i = start; i <= start + second; i++) {
  robots.forEach((robot) => {
    const newLocation = getLocation(robot, i);
    paper[newLocation[1]][newLocation[0]] = "O";
  });

  const drawing = paper.map((p) => p.join("")).join("\n");

  console.log("Numbers of seconds: " + i);
  console.log(drawing);

  appendFileSync("christmasTree.txt", `\nNumbers of seconds: ${i}\n`);
  appendFileSync("christmasTree.txt", drawing);

  paper = paper.map((_) => [...row]);
}

function getLocation(robot: string, i: number) {
  const start = robot
    .split(/=| /g)[1]
    .split(",")
    .map((n) => Number(n));
  const velocity = robot
    .split(/=| /g)[3]
    .split(",")
    .map((n) => Number(n));

  const endLocation = [
    (start[0] + i * velocity[0]) % bathroomSize[0],
    (start[1] + i * velocity[1]) % bathroomSize[1],
  ];

  if (endLocation[0] < 0) {
    endLocation[0] = bathroomSize[0] + endLocation[0];
  }

  if (endLocation[1] < 0) {
    endLocation[1] = bathroomSize[1] + endLocation[1];
  }

  return endLocation;
}
