import input from "../../read-input.ts";

const reports = input.split("\n");

let safeReports = 0;

reports.forEach((report) => {
  let reportIsSafe = true;

  const levels = report.split(" ").map((l) => Number(l));

  const leadingSign = Math.sign(levels[0] - levels[1]);

  for (let i = 0; i < levels.length - 1; i++) {
    const difference = levels[i] - levels[i + 1];
    const distance = Math.abs(difference);

    if (Math.sign(difference) !== leadingSign || distance < 1 || distance > 3) {
      reportIsSafe = false;
      return;
    }
  }

  if (reportIsSafe) safeReports++;
});

console.log("Safe reports: " + safeReports);
