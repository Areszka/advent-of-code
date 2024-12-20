import input from "../../read-input.ts";

const ROTATION_COST = 1000;
const MOVE_COST = 1;

const map = input.split("\n").map((r: string) => r.split(""));
const reindeer: [number, number] = [map.length - 2, 1];

type Direction = "up" | "down" | "left" | "right";
let reindeerDirection: Direction = "right";

let lowestScore: number = -1;

const lowestScoreForPoints: Record<string, number> = {};

moveReindeer(0, {}, reindeerDirection, reindeer);

function moveReindeer(
  score: number,
  reindeerTrail: Record<string, boolean>,
  direction: Direction,
  simulatedReindeer: [number, number]
) {
  if (map[simulatedReindeer[0]][simulatedReindeer[1]] === "E") {
    if (lowestScore === -1 || score < lowestScore) {
      lowestScore = score;
    }
    return;
  }

  if (score > lowestScore && lowestScore !== -1) {
    return;
  }

  const numForThisPosition =
    lowestScoreForPoints[simulatedReindeer[0] + "-" + simulatedReindeer[1]];

  if (numForThisPosition <= score) {
    return;
  }

  lowestScoreForPoints[simulatedReindeer[0] + "-" + simulatedReindeer[1]] = score;

  const topTile = map[simulatedReindeer[0] - 1][simulatedReindeer[1]];
  const topTileIsVisited = reindeerTrail[simulatedReindeer[0] - 1 + "-" + simulatedReindeer[1]];
  const bottomTile = map[simulatedReindeer[0] + 1][simulatedReindeer[1]];
  const bottomTileIsVisited = reindeerTrail[simulatedReindeer[0] + 1 + "-" + simulatedReindeer[1]];
  const leftTile = map[simulatedReindeer[0]][simulatedReindeer[1] - 1];
  const leftTileIsVisited = reindeerTrail[simulatedReindeer[0] + "-" + (simulatedReindeer[1] - 1)];
  const rightTile = map[simulatedReindeer[0]][simulatedReindeer[1] + 1];
  const rightTileIsVisited = reindeerTrail[simulatedReindeer[0] + "-" + (simulatedReindeer[1] + 1)];

  if ((rightTile === "." || rightTile === "E") && !rightTileIsVisited) {
    const nextReindeer: [number, number] = [simulatedReindeer[0], simulatedReindeer[1] + 1];
    const nextReindeerTrail = { ...reindeerTrail };
    nextReindeerTrail[simulatedReindeer[0] + "-" + simulatedReindeer[1]] = true;
    moveReindeer(
      score + (direction === "right" ? MOVE_COST : ROTATION_COST + MOVE_COST),
      nextReindeerTrail,
      "right",
      nextReindeer
    );
  }

  if ((topTile === "." || topTile === "E") && !topTileIsVisited) {
    const nextReindeerTrail = { ...reindeerTrail };
    nextReindeerTrail[simulatedReindeer[0] + "-" + simulatedReindeer[1]] = true;
    const nextReindeer: [number, number] = [simulatedReindeer[0] - 1, simulatedReindeer[1]];
    moveReindeer(
      score + (direction === "up" ? MOVE_COST : ROTATION_COST + MOVE_COST),
      nextReindeerTrail,
      "up",
      nextReindeer
    );
  }

  if (bottomTile === "." && !bottomTileIsVisited) {
    const nextReindeer: [number, number] = [simulatedReindeer[0] + 1, simulatedReindeer[1]];
    const nextReindeerTrail = { ...reindeerTrail };
    nextReindeerTrail[simulatedReindeer[0] + "-" + simulatedReindeer[1]] = true;
    moveReindeer(
      score + (direction === "down" ? MOVE_COST : ROTATION_COST + MOVE_COST),
      nextReindeerTrail,
      "down",
      nextReindeer
    );
  }

  if (leftTile === "." && !leftTileIsVisited) {
    const nextReindeer: [number, number] = [simulatedReindeer[0], simulatedReindeer[1] - 1];
    const nextReindeerTrail = { ...reindeerTrail };
    nextReindeerTrail[simulatedReindeer[0] + "-" + simulatedReindeer[1]] = true;
    moveReindeer(
      score + (direction === "left" ? MOVE_COST : ROTATION_COST + MOVE_COST),
      nextReindeerTrail,
      "left",
      nextReindeer
    );
  }
}
