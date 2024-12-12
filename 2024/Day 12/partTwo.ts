// ALMOST working

import input from "../../read-input.ts";

const gardens = input.split("\n").map((row) => row.split(""));

const alocatedGardens: Record<string, string> = {};

let totalPrice = 0;

for (let i = 0; i < gardens.length; i++) {
  for (let j = 0; j < gardens.length; j++) {
    if (alocatedGardens[i + "-" + j]) continue;

    const currentLetter = gardens[i][j];
    const [area, perimeter] = checkGardens([i, j], currentLetter, 0, {});

    totalPrice += area * Object.keys(perimeter).length;
  }
}

console.log(totalPrice);

function checkGardens(
  point: [number, number],
  letter: string,
  area: number,
  corners: Record<string, boolean>
): [number, Record<string, boolean>] {
  if (alocatedGardens[point[0] + "-" + point[1]] === letter) {
    return [area, corners];
  }

  if (gardens[point[0]]?.[point[1]] !== letter) {
    return [area, corners];
  }

  alocatedGardens[point[0] + "-" + point[1]] = letter;

  const nextPointRight: [number, number] = [point[0], point[1] + 1];
  const nextPointDown: [number, number] = [point[0] + 1, point[1]];
  const nextPointLeft: [number, number] = [point[0], point[1] - 1];
  const nextPointUp: [number, number] = [point[0] - 1, point[1]];

  const top = gardens[nextPointUp[0]]?.[nextPointUp[1]];
  const right = gardens[nextPointRight[0]]?.[nextPointRight[1]];
  const bottom = gardens[nextPointDown[0]]?.[nextPointDown[1]];
  const left = gardens[nextPointLeft[0]]?.[nextPointLeft[1]];
  const topLeft = gardens[point[0] - 1]?.[point[1] - 1];
  const topRight = gardens[point[0] - 1]?.[point[1] + 1];
  const bottomLeft = gardens[point[0] + 1]?.[point[1] - 1];
  const bottomRight = gardens[point[0] + 1]?.[point[1] + 1];

  const [nextAreaRight, nextCornersRight] = checkGardens(nextPointRight, letter, area, corners);
  const [nextAreaDown, nextCornersDown] = checkGardens(nextPointDown, letter, area, corners);
  const [nextAreaLeft, nextCornersLeft] = checkGardens(nextPointLeft, letter, area, corners);
  const [nextAreaUp, nextCornersUp] = checkGardens(nextPointUp, letter, area, corners);

  let tempCorners = { ...corners };

  if (equals(top, letter) && equals(topRight, letter) && !equals(right, letter)) {
    tempCorners[point[0] + "-" + (point[1] + 1)] = true;
  } else if (equals(top, letter) && !equals(topRight, letter) && equals(right, letter)) {
    tempCorners[point[0] + "-" + (point[1] + 1)] = true;
  } else if (!equals(top, letter) && equals(topRight, letter) && equals(right, letter)) {
    tempCorners[point[0] + "-" + (point[1] + 1)] = true;
  } else if (!equals(top, letter) && equals(topRight, letter) && !equals(right, letter)) {
    tempCorners[point[0] + "-" + (point[1] + 1)] = true;
  } else if (!equals(top, letter) && !equals(topRight, letter) && !equals(right, letter)) {
    tempCorners[point[0] + "-" + (point[1] + 1)] = true;
  }

  if (equals(top, letter) && equals(topLeft, letter) && !equals(left, letter)) {
    tempCorners[point[0] + "-" + point[1]] = true;
  } else if (equals(top, letter) && !equals(topLeft, letter) && equals(left, letter)) {
    tempCorners[point[0] + "-" + point[1]] = true;
  } else if (!equals(top, letter) && equals(topLeft, letter) && equals(left, letter)) {
    tempCorners[point[0] + "-" + point[1]] = true;
  } else if (!equals(top, letter) && equals(topLeft, letter) && !equals(left, letter)) {
    tempCorners[point[0] + "-" + point[1]] = true;
  } else if (!equals(top, letter) && !equals(topLeft, letter) && !equals(left, letter)) {
    tempCorners[point[0] + "-" + point[1]] = true;
  }

  if (equals(bottom, letter) && equals(bottomLeft, letter) && !equals(left, letter)) {
    tempCorners[point[0] + 1 + "-" + point[1]] = true;
  } else if (equals(bottom, letter) && !equals(bottomLeft, letter) && equals(left, letter)) {
    tempCorners[point[0] + 1 + "-" + point[1]] = true;
  } else if (!equals(bottom, letter) && equals(bottomLeft, letter) && equals(left, letter)) {
    tempCorners[point[0] + 1 + "-" + point[1]] = true;
  } else if (!equals(bottom, letter) && equals(bottomLeft, letter) && !equals(left, letter)) {
    tempCorners[point[0] + 1 + "-" + point[1]] = true;
  } else if (!equals(bottom, letter) && !equals(bottomLeft, letter) && !equals(left, letter)) {
    tempCorners[point[0] + 1 + "-" + point[1]] = true;
  }

  if (equals(bottom, letter) && equals(bottomRight, letter) && !equals(right, letter)) {
    tempCorners[point[0] + 1 + "-" + (point[1] + 1)] = true;
  } else if (equals(bottom, letter) && !equals(bottomRight, letter) && equals(right, letter)) {
    tempCorners[point[0] + 1 + "-" + (point[1] + 1)] = true;
  } else if (!equals(bottom, letter) && equals(bottomRight, letter) && equals(right, letter)) {
    tempCorners[point[0] + 1 + "-" + (point[1] + 1)] = true;
  } else if (!equals(bottom, letter) && equals(bottomRight, letter) && !equals(right, letter)) {
    tempCorners[point[0] + 1 + "-" + (point[1] + 1)] = true;
  } else if (!equals(bottom, letter) && !equals(bottomRight, letter) && !equals(right, letter)) {
    tempCorners[point[0] + 1 + "-" + (point[1] + 1)] = true;
  }

  let nextArea = area + 1 + nextAreaRight + nextAreaDown + nextAreaLeft + nextAreaUp;
  let nextCorners = {
    ...tempCorners,
    ...nextCornersRight,
    ...nextCornersDown,
    ...nextCornersLeft,
    ...nextCornersUp,
  };

  return [nextArea, nextCorners];
}

function equals(a: string, b: string) {
  return a === b;
}
