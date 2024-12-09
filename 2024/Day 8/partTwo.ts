import input from "../../read-input.ts";

const map = input.split("\n").map((row) => row.split(""));
const antinodes: Record<string, boolean> = {};

const antennasByType: Record<string, [number, number][]> = {};

for (let i = 0; i < map.length; i++) {
  for (let j = 0; j < map[i].length; j++) {
    const value = map[i][j];
    if (value === ".") continue;

    const antenna = antennasByType[value] ?? [];
    antennasByType[value] = [...antenna, [i, j]];
  }
}

for (const type in antennasByType) {
  const positions = antennasByType[type];
  for (let i = 0; i < positions.length; i++) {
    for (let j = i + 1; j < positions.length; j++) {
      const pointA = positions[i];
      const pointB = positions[j];
      const vectorAB = [pointB[0] - pointA[0], pointB[1] - pointA[1]];

      antinodes[`${pointA[0]}-${pointA[1]}`] = true;

      let k = 0;
      let antinodeOne: [number, number] = [
        pointA[0] - vectorAB[0] * k,
        pointA[1] - vectorAB[1] * k,
      ];

      while (antinodeIsValid(antinodeOne)) {
        antinodes[`${antinodeOne[0]}-${antinodeOne[1]}`] = true;
        k++;
        antinodeOne = [pointA[0] - vectorAB[0] * k, pointA[1] - vectorAB[1] * k];
      }

      let g = 0;
      let antinodeTwo: [number, number] = [
        pointB[0] + vectorAB[0] * g,
        pointB[1] + vectorAB[1] * g,
      ];

      while (antinodeIsValid(antinodeTwo)) {
        antinodes[`${antinodeTwo[0]}-${antinodeTwo[1]}`] = true;

        g++;
        antinodeTwo = [pointB[0] + vectorAB[0] * g, pointB[1] + vectorAB[1] * g];
      }
    }
  }
}

console.log(Object.keys(antinodes).length);

function antinodeIsValid(antinode: [number, number]) {
  return (
    antinode[0] >= 0 && antinode[0] < map.length && antinode[1] >= 0 && antinode[1] < map[0].length
  );
}
