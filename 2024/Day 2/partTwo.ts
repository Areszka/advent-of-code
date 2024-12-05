import input from "../../read-input.ts";

const reports = input.split("\n");

let safeReports = 0;

reports.forEach((report) => {
  const levels = report.split(" ").map((l) => Number(l));
  const unsafeLevelIndex = getUnsafeLevelIndex(levels);

  if (unsafeLevelIndex === undefined) {
    safeReports++;
  } else {
    const levelsV2 = levels.toSpliced(unsafeLevelIndex, 1);
    const unsafeLevelIndexV2 = getUnsafeLevelIndex(levelsV2);

    const levelsV3 = levels.toSpliced(unsafeLevelIndex + 1, 1);
    const unsafeLevelIndexV3 = getUnsafeLevelIndex(levelsV3);

    const levelsV4 = levels.toSpliced(unsafeLevelIndex - 1, 1);
    const unsafeLevelIndexV4 = getUnsafeLevelIndex(levelsV4);

    if (
      unsafeLevelIndexV2 === undefined ||
      unsafeLevelIndexV3 === undefined ||
      unsafeLevelIndexV4 === undefined
    ) {
      safeReports++;
    }
  }
});

console.log("Safe reports: " + safeReports);

function getUnsafeLevelIndex(levels: number[]) {
  const leadingSign = Math.sign(levels[0] - levels[1]);

  for (let i = 0; i < levels.length - 1; i++) {
    const difference = levels[i] - levels[i + 1];
    const distance = Math.abs(difference);

    if (Math.sign(difference) !== leadingSign || distance < 1 || distance > 3) {
      return i;
    }
  }
}
