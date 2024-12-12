import input from "../../read-input.ts";

const gardens = input.split("\n").map((row) => row.split(""));

const alocatedGardens: Record<string, string> = {};

let totalPrice = 0;

for (let i = 0; i < gardens.length; i++) {
  for (let j = 0; j < gardens.length; j++) {
    if (alocatedGardens[i + "-" + j]) continue;

    const currentLetter = gardens[i][j];
    const [area, perimeter] = checkGardens([i, j], currentLetter, 0, 0);

    totalPrice += area * perimeter;
  }
}

console.log(totalPrice);

function checkGardens(
  point: [number, number],
  letter: string,
  area: number,
  perimeter: number
): [number, number] {
  if (alocatedGardens[point[0] + "-" + point[1]] === letter) {
    return [area, perimeter];
  }

  if (gardens[point[0]]?.[point[1]] !== letter) {
    return [area, perimeter + 1];
  }

  alocatedGardens[point[0] + "-" + point[1]] = letter;

  const nextPointRight: [number, number] = [point[0], point[1] + 1];
  const nextPointDown: [number, number] = [point[0] + 1, point[1]];
  const nextPointLeft: [number, number] = [point[0], point[1] - 1];
  const nextPointUp: [number, number] = [point[0] - 1, point[1]];

  const [nextAreaRight, nextPerimeterRight] = checkGardens(nextPointRight, letter, area, perimeter);
  const [nextAreaDown, nextPerimeterDown] = checkGardens(nextPointDown, letter, area, perimeter);
  const [nextAreaLeft, nextPerimeterLeft] = checkGardens(nextPointLeft, letter, area, perimeter);
  const [nextAreaUp, nextPerimeterUp] = checkGardens(nextPointUp, letter, area, perimeter);

  let nextArea = area + 1 + nextAreaRight + nextAreaDown + nextAreaLeft + nextAreaUp;
  let nextPerimeter =
    perimeter + nextPerimeterRight + nextPerimeterDown + nextPerimeterLeft + nextPerimeterUp;

  return [nextArea, nextPerimeter];
}
